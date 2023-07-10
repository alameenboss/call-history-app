using CallRecordingParser.Model;
using NAudio.Wave;
using System.Collections.Concurrent;

namespace CallRecordingParser.Service
{
    public class CallParser : ICallParser
    {
        public async Task<IEnumerable<Call>> GetCallList(string pathToOutputFolder)
        {
            var filePaths = Directory.GetFiles(pathToOutputFolder, "*.mp3");

            var sortedFileNames = filePaths
                .Select(filePath => new FileInfo(filePath))
                .OrderBy(fileInfo => fileInfo.LastWriteTime)
                .Select(fileInfo => fileInfo.Name)
                .ToArray();

            Console.WriteLine("Found file: " + sortedFileNames.Length);


            var callList = new List<Call>();

            foreach (string fileName in sortedFileNames)
            {
                TimeSpan duration = new TimeSpan();
                try
                {
                    using (var reader = new Mp3FileReader(Path.Combine(pathToOutputFolder, fileName)))
                    {
                        duration = reader.TotalTime;
                    }
                }
                catch (Exception e)
                {
                }

                var nameStartIndex = fileName.IndexOf("@") + 1;
                var nameEndIndex = fileName.IndexOf("(");
                var title = fileName.Substring(nameStartIndex, nameEndIndex - nameStartIndex);

                // Extract country code
                var countryCodeStartIndex = fileName.IndexOf("(") + 1;
                var countryCodeEndIndex = fileName.IndexOf(")");
                var phone = fileName.Substring(countryCodeStartIndex, countryCodeEndIndex - countryCodeStartIndex);
                if (phone.Length > 10 && phone.StartsWith("0091"))
                {
                    phone = phone.Replace("0091", "");
                }

                // Extract date with time
                var dateTimeString = fileName.Substring(fileName.IndexOf("_") + 1);

                // Extract year, month, day, hour, minute, and second from the dateTimeString
                var year = int.Parse(dateTimeString.Substring(0, 4));
                var month = int.Parse(dateTimeString.Substring(4, 2));
                var day = int.Parse(dateTimeString.Substring(6, 2));
                var hour = int.Parse(dateTimeString.Substring(8, 2));
                var minute = int.Parse(dateTimeString.Substring(10, 2));
                var second = int.Parse(dateTimeString.Substring(12, 2));

                var dateTime = new DateTime(year, month, day, hour, minute, second);

                callList.Add(new Call
                {
                    Name = title,
                    Phone = phone,
                    Date = dateTime,
                    Duration_timespan = duration,
                    Duration_Sec = (int)duration.TotalSeconds
                });
            }

            Console.WriteLine("Total Calls: " + callList.Count);

            return await Task.FromResult(callList);
        }

    }
}
