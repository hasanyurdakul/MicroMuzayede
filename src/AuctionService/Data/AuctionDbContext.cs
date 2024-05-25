using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

/// <summary>
/// Represents the database context for the Auction service.
/// </summary>
public class AuctionDbContext : DbContext
{
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<Item> Items { get; set; }

    public AuctionDbContext(DbContextOptions options) : base(options)
    {
    }
}
