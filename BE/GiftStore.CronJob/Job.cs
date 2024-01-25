using Autofac;
using GiftStore.DAL.Contracts;

namespace GiftStore.CronJob
{
    public static class Job
    {
        private static IBestSellerService _bestSellerService;
        private static ILifetimeScope _scope;
        public static void Init(ILifetimeScope scope)
        {
            _scope = scope;
            _bestSellerService = scope.Resolve<IBestSellerService>();
        }
        public static void UpdateBestSeller()
        {
            _bestSellerService.UpdateBestSeller();
        }
    }
}
