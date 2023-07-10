using CallRecordingParser.Model;
using CallRecordingParser.Service;
using Microsoft.Extensions.DependencyInjection;

namespace CallRecordingParser
{
    internal class Program
    {
        public async static Task Main(string[] args)
        {
            var pathToOutputFolder = args.AsQueryable().FirstOrDefault();
            if (pathToOutputFolder == null)
            {
                Console.WriteLine("Please enter the folder:");
                pathToOutputFolder = Console.ReadLine()!.Trim();

            }

            if (pathToOutputFolder.Length <= 0)
            {
                return;
            }

            if (!Directory.Exists(pathToOutputFolder))
            {
                Console.WriteLine("Folder path not exists or valid");
                Console.ReadKey();
                return;
            }

            Console.WriteLine("Started processing the folder: "+ pathToOutputFolder);

            var serviceProvider = new ServiceCollection()
            .AddSingleton<ICallParser, CallParser>()
            .AddSingleton<ICSVGenerator, CSVGenerator>()
            .AddSingleton<IJsonGenerator, JsonGenerator>()
            .BuildServiceProvider();

            var callParser = serviceProvider.GetService<ICallParser>();
            var callList = await callParser.GetCallList(pathToOutputFolder);

            var cSVGenerator = serviceProvider.GetService<ICSVGenerator>();
            var jsonGenerator = serviceProvider.GetService<IJsonGenerator>();

            await cSVGenerator.Generate<Call>(callList, pathToOutputFolder);
            await jsonGenerator.Generate<Call>(callList, pathToOutputFolder);
        }

    }
}