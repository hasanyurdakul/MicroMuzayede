using System.CodeDom.Compiler;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace SearchService;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    //PARAMETRE OLARAK, SEARCHPARAMS SINIFINDAN SEARCHPARAMS TIPINDE BIR OBJECT OLUSTURULDU VE BU NESNENIN QUERY STRINGDEN PARSE EDILECEGI [FROMQUERY] ILE BELIRTILDI.
    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItem([FromQuery] SearchParams searchParams)
    {
        //PAGED SEARCH, QUERY ICIN SWITCH YAPISI KULLANILIRKEN IMPLICIT CONVERT HATASI VERDIGINDEN DOLAYI PAGED SEARCH METODUNA ITEM IKI KEZ PARAMETRE OLARAK GONDERILDI. ILK ITEM = TYPE, IKICI ITEM=PROJECTION OLMAK UZERE.
        var query = DB.PagedSearch<Item, Item>();

        //SEARCHTERM BOS DEGILSE SEARCH FULL YAPISI KULLANILARAK ARAMA YAPILDI VE SONUCA GORE SIRALAMA YAPILDI.
        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        //QUERY => SIRALAMA ICIN BIR SWITCH CASE YAPISI KULLANILDI. EGER ORDERBY MAKE ISE MAKE UZERINDEN SIRALAMA YAPILACAK, NEW ISE CREATEDAT UZERINDEN SIRALAMA YAPILACAK, DEFAULT DURUMDA AUCTIONEND UZERINDEN SIRALAMA YAPILACAK.
        query = searchParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(a => a.Make)),
            "new" => query.Sort(x => x.Descending(a => a.CreatedAt)),
            _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        };

        //QUERY => FILTER ICIN BIR SWITCH CASE YAPISI KULLANILDI. EGER FILTERBY FINISHED ISE AUCTIONEND < NOW, ENDINGSOON ISE AUCTIONEND < NOW + 6 SAAT KOSULU EKLENDI.
        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6)),
            _ => query
        };


        //QUERY ICIN PAGE NUMBER VE PAGE SIZE SET EDILDI.
        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);


        //QUERY EXECUTE EDILDI.
        var result = await query.ExecuteAsync();


        //SONUC OLARAK BULUNAN ITEM SAYISI, SAYFA SAYISI VE TOPLAM ITEM SAYISI CLIENTA ANONYMOUS OBJECT OLARAK GONDERILDI.
        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount

        });
    }


}
