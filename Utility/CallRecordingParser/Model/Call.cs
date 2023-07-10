namespace CallRecordingParser.Model
{
    public class Call
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration_timespan { get; set; }
        public double Duration_Sec { get; set; }
    }
}