﻿using DbUp;
using GiftStore.Core.Contrants;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace GiftStore.Core.Common
{
    public static class DatabaseHelper
    {
        private static string _connectionString;
        private static IConfiguration _config; 

        public static void InitConfiguration(IConfiguration config)
        {
            _config = config;
        }

        public static string GetConnectionString()
        {
            return _config.GetConnectionString(CoreConstants.DEFAULT_CONNECTION);
        }

        public static void ExecuteDbUp(string assemblyName)
        {
            var connection = _connectionString == null ? GetConnectionString() : _connectionString;

            EnsureDatabase.For.SqlDatabase(connection);

            var upgrader = DeployChanges.To.SqlDatabase(connection)
                            .WithScriptsEmbeddedInAssembly(Assembly.Load(assemblyName))
                            .LogToConsole()
                            .Build();

            var result = upgrader.GetScriptsToExecute();
            if(result.Any())
            {
                var success = upgrader.PerformUpgrade();
                if(!success.Successful)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine(success.Error);
                    Console.ResetColor();
                }
            } else
            {
                Console.WriteLine("No scripts found!");
            }
        }
    }
}
