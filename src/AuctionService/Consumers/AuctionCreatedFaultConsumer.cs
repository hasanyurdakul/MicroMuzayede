using Contracts;
using MassTransit;

namespace AuctionService;
//AUCTIONCREATED EVENTI, SEARCHSERVICE ICINDE BIR HATA FIRLATTIGINDA, BU HATA RABBITMQ'DAKI FAULT QUEUE'YA GONDERILIR. BU CONSUMER, BU QUEUE'DAN GELEN HATALARI YAKALAR VE HATALARI KONTROL EDER. EGER HATA TURU ARGUMENTEXCEPTION ISE, MODEL DEGERINI "BAR" OLARAK DEGISTIRIR VE YENIDEN PUBLISH EDER. EGER HATA TURU ARGUMENTEXCEPTION DEGILSE, IGNORELANIR
public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        var exception = context.Message.Exceptions.First();
        Console.WriteLine("#### Consuming Faulty Creation ####\n" + exception.Message);
        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model = "Bar";
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an ArgumentException, ignoring...");
        }
    }
}
