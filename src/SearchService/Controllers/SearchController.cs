using System.CodeDom.Compiler;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace SearchService;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItem([FromQuery] SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item>();
        query.Sort(x => x.Ascending(a => a.Make));
        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }
        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);
        var result = await query.ExecuteAsync();
        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount

        });
    }


}
