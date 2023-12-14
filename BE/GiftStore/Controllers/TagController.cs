using Autofac;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Tag;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TagController : ControllerBase
{
    ILifetimeScope _scope;
    ITagService _tagService;

    public TagController(ILifetimeScope scope)
    {
        _scope = scope;
        _tagService = _scope.Resolve<ITagService>();
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var result = await _tagService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetailAsync(string id)
    {
        var result = await _tagService.GetDetailAsync(id);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] TagCreateRequestDto dto)
    {
        var result = await _tagService.AddAsync(dto);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] TagUpdateRequestDto dto)
    {
        var result = await _tagService.UpdateAsync(dto);
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        var result = await _tagService.DeleteAsync(id);
        return Ok(result);
    }
}
