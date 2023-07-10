using System.Reflection;

namespace CallRecordingParser.Service
{
    internal class CSVGenerator : ICSVGenerator
    {
        private async Task CreateHeader<T>(IEnumerable<T> list, StreamWriter sw)
        {
            var properties = typeof(T).GetProperties();
            for (int i = 0; i < properties.Length - 1; i++)
            {
                sw.Write(properties[i].Name + ",");
            }
            var lastProp = properties[properties.Length - 1].Name;
            sw.Write(lastProp + sw.NewLine);

            await Task.CompletedTask;
        }

        private async Task CreateRows<T>(IEnumerable<T> list, StreamWriter sw)
        {
            foreach (var item in list)
            {
                var properties = typeof(T).GetProperties();
                for (int i = 0; i < properties.Length - 1; i++)
                {
                    var prop = properties[i];
                    sw.Write(await GetValueParsed(item, prop) + ",");
                }
                var lastProp = properties[properties.Length - 1];

                sw.Write(await GetValueParsed(item, lastProp) + sw.NewLine);
            }
            await Task.CompletedTask;
        }

        private async Task<object?> GetValueParsed<T>(T? item, PropertyInfo prop)
        {
            if (prop.PropertyType == typeof(DateTime))
            {
                var inputDateTime = prop.GetValue(item);
                var parsedDateTime = DateTime.ParseExact(inputDateTime.ToString(), "dd-MM-yyyy HH:mm:ss", null);
                var convertedDateTime = parsedDateTime.ToString("dd/MM/yy hh:mm:ss tt").ToUpper();

                return await Task.FromResult($"\"{convertedDateTime.Replace("-", "/")}\"");
            }
            return await Task.FromResult($"\"{prop.GetValue(item)}\"");
        }

        public async Task Generate<T>(IEnumerable<T> list, string pathToOutputFolder)
        {
            var filePath = pathToOutputFolder + @"\output.csv";

            using (StreamWriter sw = new StreamWriter(filePath))
            {
                await CreateHeader(list, sw);
                await CreateRows(list, sw);
            }
            Console.WriteLine("CSV written to file: " + filePath);

            await Task.CompletedTask;
        }

    }
}
