using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
    {
        var query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();
        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await _context.Auctions.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
        if (auction == null) return NotFound();
        return _mapper.Map<AuctionDto>(auction);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = _mapper.Map<Auction>(createAuctionDto);
        //TODO: ADD CURRENT USER AS SELLER
        auction.Seller = User.Identity.Name;
        _context.Auctions.Add(auction);
        var newAuctionDto = _mapper.Map<AuctionDto>(auction);
        //EĞER KAYIT BAŞARILI OLURSA PUBLISH METODU ILE EVENTI YAYINLAR. MASSTRANSIT PROGRAM.CS'TE REGISTER EDILDIGINDE OUTBOX CONFIGURE EDILDIYSE, TRANSACTIONAL OLARAK KAYIT YAPAR VE BU SAYEDE FAIL OLURSA OUTBOX'A KAYIT EDER. BURADA PUBLISH EDILEN AUCTIONCREATED EVENTI, SEARCHSERVICE ICINDEKI AUCTIONCREATEDCONSUMER TARAFINDAN DINLENIR VE GEREKLI ISLEMLER YAPILIR. AUCTIONCREATED, HEM SEARCHSERVICE HEM DE AUCTIONSERVICE TARAFINDA AYNI OLMASI GEREKTIGI ICIN CONTRACTS PROJESINDE TANIMLANMISTIR.BUNUN SEBEBI MASSTRANSIT'IN CALISIRKEN CONTRACTLARIN BIND EDILEBILMESI ICIN AYNI NAMESPACE'TE OLMASI GEREKTIGIDIR.
        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuctionDto));
        //SAVE CHANGES BAŞARI ILE KAYIT ETTIGI KAYITLARIN SAYISINI INT OLARAK DONER
        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save changes to the database");
        return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, newAuctionDto);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await _context.Auctions.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);
        if (auction == null) return NotFound();
        if (auction.Seller != User.Identity.Name) return Forbid();
        auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
        auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
        auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
        auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
        _context.Update(auction);
        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok();
        }
        else
        {
            return BadRequest("Problem while saving changes!");
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAuction(Guid id)
    {
        var auction = await _context.Auctions.FindAsync(id);
        if (auction == null) return NotFound();
        if (auction.Seller != User.Identity.Name) return Forbid();
        await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

        _context.Remove(auction);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();
        return BadRequest("Error while deleting auction");
    }
}
