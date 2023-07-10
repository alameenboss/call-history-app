using CallRecordingParser.Model;

namespace CallRecordingParser.Service
{
    public interface ICallParser
    {
        Task<IEnumerable<Call>> GetCallList(string pathToOutputFolder);
    }
}