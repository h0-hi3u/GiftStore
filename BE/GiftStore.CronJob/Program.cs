using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.Core.Implementations;
using GiftStore.CronJob;
using GiftStore.DAL.Implementations;
using GiftStore.DAL.Model.Mapping;
using Hangfire;
using Hangfire.SqlServer;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Register hangfire to CronJob.
builder.Services.AddHangfire(configuration => configuration
       .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
       .UseSimpleAssemblyNameTypeSerializer()
       .UseRecommendedSerializerSettings()
       .UseSqlServerStorage(builder.Configuration.GetConnectionString("HangfireConnection"), new SqlServerStorageOptions
       {
           CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
           SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
           QueuePollInterval = TimeSpan.Zero,
           UseRecommendedIsolationLevel = true,
           DisableGlobalLocks = true
       }));
builder.Services.AddHangfireServer();

// Add automapper
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

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

var iLifeTimeScope = app.Services.GetService<ILifetimeScope>();
Job.Init(iLifeTimeScope);

app.UseHttpsRedirection();
app.UseHangfireDashboard();
app.MapGet("/api/add-job", () =>
{
    RecurringJob.AddOrUpdate("UpdateBestSeller", () => Job.UpdateBestSeller(), Cron.Daily());
});
app.Run();
