FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# COPY ALL .CSPROJ FILES AND RESTORE AS DISTINCT LAYERS. USE OF THE SAME COPY COMMAND FOR EVERY DOCKERFILE IN THE PROJECT TO TAKE ADVANTAGE OF THE DOCKER CACHING.
COPY MicroMuzayede.sln MicroMuzayede.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

# RESTORE PACKAGE DEPENCECIES
RUN dotnet restore MicroMuzayede.sln

#COPY THE REST OF THE FILES
COPY src/IdentityService src/IdentityService
WORKDIR /app/src/IdentityService 
RUN dotnet publish -c Release -o /app/src/out

# BUILD THE RUNTIME IMAGE
FROM mcr.microsoft.com/dotnet/aspnet:8.0 
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "IdentityService.dll"]