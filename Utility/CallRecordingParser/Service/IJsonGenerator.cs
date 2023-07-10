namespace CallRecordingParser.Service
{
    public interface IJsonGenerator
    {
        Task Generate<T>(IEnumerable<T> list, string pathToOutputFolder);
    }
}