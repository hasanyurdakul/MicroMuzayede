using System.Net;
using MassTransit;
using MongoDB.Driver;
using MongoDB.Entities;
using Polly;
using Polly.Extensions.Http;
using SearchService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.ConfigureEndpoints(context);
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async () =>
{
    try
    {
        await DbInitializer.InitDb(app);
    }
    catch (Exception ex)
    {

        Console.WriteLine(ex); ;
    }
});

app.Run();

//BIR HTTP ISTEMCISININ (HTTPCLIENT) KARŞILAŞABILECEĞI GEÇICI HATALARLA (TRANSIENT ERRORS) BAŞA ÇIKMAK IÇIN BIR POLITIKA TANIMLAR. BU TÜR HATALAR GENELLIKLE KISA SÜRELI AĞ SORUNLARI, SUNUCU AŞIRI YÜKLENMESI VEYA BENZERI DURUMLARDAN KAYNAKLANABILIR. KOD, POLITENIN (POLLY) HTTP ISTEMCISI IÇIN GENIŞLETMELERI (EXTENSIONS) KULLANILARAK BU HATALARI YÖNETIR
static IAsyncPolicy<HttpResponseMessage> GetPolicy() => HttpPolicyExtensions
.HandleTransientHttpError()
.OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
.WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));