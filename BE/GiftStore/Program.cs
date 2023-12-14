using Autofac;
using Autofac.Extensions.DependencyInjection;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.Core.Implementations;
using GiftStore.DAL.Implementations;
using System.Reflection;
using AutoMapper;
using GiftStore.DAL.Model.Mapping;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add automapper
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

// Ignore loop when include
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Register autofac
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(builder =>
    {
        builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(ApplicationDbContext))!)
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        builder.RegisterGeneric(typeof(Repository<>))
               .As(typeof(IRepository<>))
               .InstancePerLifetimeScope();

        builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(UnitOfWork))!)
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

        builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(ProductService))!)
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

    });

var app = builder.Build();

// Execute DbUp
DatabaseHelper.InitConfiguration(app.Configuration);
DatabaseHelper.ExecuteDbUp(Assembly.GetExecutingAssembly().GetName().Name!);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
