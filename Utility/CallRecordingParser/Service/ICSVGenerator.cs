namespace CallRecordingParser.Service
{
    internal interface ICSVGenerator
    {
        Task Generate<T>(IEnumerable<T> list, string pathToOutputFolder);
    }
}