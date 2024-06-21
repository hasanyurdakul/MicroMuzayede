using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public BidPlacedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("### BID PLACED MESSAGE RECEIVED ###");

        await _hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}
