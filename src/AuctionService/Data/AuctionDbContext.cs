using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

/// <summary>
/// Represents the database context for the Auction service.
/// </summary>
public class AuctionDbContext : DbContext
{
    public AuctionDbContext(DbContextOptions options) : base(options)
    {
    }
}
