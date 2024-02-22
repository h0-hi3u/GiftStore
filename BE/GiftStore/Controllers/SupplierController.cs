using Autofac;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Supplier;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        ILifetimeScope _scope;
        ISupplierService _supplierService;

        public SupplierController(ILifetimeScope scope)
        {
            _scope = scope;
            _supplierService = _scope.Resolve<ISupplierService>();
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _supplierService.GetAllAsync();
            return Ok(result);
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDatailAsync(string id)
        {
            var result = await _supplierService.GetDetailAsync(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] SupplierCreateRequestDto dto)
        {
            var result = await _supplierService.AddAsync(dto);
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] SupplierUpdateRequestDto dto)
        {
            var result = await _supplierService.UpdateAsync(dto);
            return Ok(result);
        }
    }
}
