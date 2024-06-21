using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public AuctionCreatedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("### AUCTION CREATED MESSAGE RECEIVED ###");
        await _hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
    }
}
