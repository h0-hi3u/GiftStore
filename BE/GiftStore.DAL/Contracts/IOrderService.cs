﻿using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Order;

namespace GiftStore.DAL.Contracts;

public interface IOrderService
{
    Task<AppActionResult> GetOrdersOfUser(string email);
    Task<AppActionResult> CreateOrderForUser(OrderCreateRequestDto orderCreateRequestDto, string email);
    Task<AppActionResult> CreateOrderForGuest(OrderCreateRequestDto orderCreateRequestDto);
    Task<AppActionResult> GetDetailAsync(string id);
}
