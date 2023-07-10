using Newtonsoft.Json;

namespace CallRecordingParser.Service
{
    public class JsonGenerator : IJsonGenerator
    {
        public async Task Generate<T>(IEnumerable<T> list, string pathToOutputFolder)
        {
            var json = JsonConvert.SerializeObject(list, Formatting.Indented);


            var filePath = pathToOutputFolder + @"\output.json";
            using (var file = File.CreateText(filePath))
            {
               await  file.WriteAsync(json);
            }

            Console.WriteLine("JSON written to file: " + filePath);
        }

    }
}
