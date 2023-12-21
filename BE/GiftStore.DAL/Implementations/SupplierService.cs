using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Supplier;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System;

namespace GiftStore.DAL.Implementations;

internal class SupplierService : GenericService, ISupplierService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Supplier> _supplierRepo;
    private readonly IMapper _mapper;
    public SupplierService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _supplierRepo = _unitOfWork.Repository<Supplier>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        IEnumerable<Supplier> list = await _supplierRepo.Entities().Where(s => s.IsDeleted == false).ToListAsync();
        IEnumerable<SupplierShowResponseDto> result = _mapper.Map<IEnumerable<SupplierShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if (!Guid.TryParse(id, out Guid supplierId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var tag = await _supplierRepo.GetAsync(supplierId);
        if(tag == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        var result = _mapper.Map<SupplierShowResponseDto>(tag);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> AddAsync(SupplierCreateRequestDto supplierDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            Supplier supplier = _mapper.Map<Supplier>(supplierDto);
            supplier.IsDeleted = false;
            await _supplierRepo.AddAsync(supplier);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> UpdateAsync(SupplierUpdateRequestDto supllierUpdateDto)
    {
        var actionResult = new AppActionResult();
        var supplier = await _supplierRepo.GetAsync(supllierUpdateDto.Id);
        if(supplier == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            supplier.Id = supllierUpdateDto.Id;
            supplier.Name = supllierUpdateDto.Name;
            supplier.Address = supllierUpdateDto.Address;
            supplier.Telephone = supllierUpdateDto.Telephone;
            supplier.Email = supllierUpdateDto.Email;
            _supplierRepo.Update(supplier);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_UPDATE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }
    }

    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid supplierId)) {
            return actionResult.BuildResult(MessageConstants.ERR_INVALID_GUID);
        }
        var supplier = await _supplierRepo.GetAsync(supplierId);
        if(supplier == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            supplier.IsDeleted = true;
            _supplierRepo.Update(supplier);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_DELETE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }
}
