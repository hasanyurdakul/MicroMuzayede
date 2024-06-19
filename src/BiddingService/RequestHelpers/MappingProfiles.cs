using AutoMapper;

namespace BiddingService;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Bid, BidDto>();
    }
}
