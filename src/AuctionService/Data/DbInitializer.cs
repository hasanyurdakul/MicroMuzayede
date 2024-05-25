using AuctionService.Entities;
using AuctionService.Data.SeedData;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        SeedData(scope.ServiceProvider.GetRequiredService<AuctionDbContext>());
    }

    private static void SeedData(AuctionDbContext context)
    {
        context.Database.Migrate();

        if (context.Auctions.Any())
        {
            Console.WriteLine("Database already seeded");
            return;
        }
        List<Auction> auctionSeedData = AuctionSeedData.GetAuctionSeedData();

        context.AddRange(auctionSeedData);
        context.SaveChanges();
    }
}
