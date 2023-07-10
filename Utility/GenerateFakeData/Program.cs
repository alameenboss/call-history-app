using System;
using System.Collections.Generic;
using System.IO;
using Bogus;

public class SampleDataGenerator
{
    public static void Main(string[] args)
    {
        var pathToOutputFolder = "";
        if (args.Length <= 0)
        {
            Console.WriteLine("Please enter the folder path as an arugument");
            Console.ReadKey();
            return;
        }

        pathToOutputFolder = args[0];
        if (!Directory.Exists(pathToOutputFolder))
        {
            Console.WriteLine("Folder path not exists or valid");
            Console.ReadKey();
            return;
        }

        string csvFilePath = Path.Combine(pathToOutputFolder + "sample_data.csv"); // Path to save the CSV file

        // Generate unique person names and phone numbers
        var personData = GenerateUniquePersonData(100);

        using (StreamWriter writer = new StreamWriter(csvFilePath))
        {
            // Write header
            writer.WriteLine("Name,Phone,Date,Duration_timespan,Duration_Sec");

            // Generate 10,000 sample data records
            Random random = new Random();
            for (int i = 1; i <= 10000; i++)
            {
                var person = personData[random.Next(personData.Count)];
                string name = person.Name;
                string phone = person.Phone;
                string date = GenerateRandomDate().Replace("-","/");
                TimeSpan duration = GenerateRandomDuration();

                // Write data record to the CSV file
                writer.WriteLine($"\"{name}\",\"{phone}\",\"{date}\",\"{duration.ToString(@"hh\:mm\:ss")}\",\"{duration.Seconds}\"");
            }
        }

        Console.WriteLine("Sample data generation complete!");
    }

    private static List<PersonData> GenerateUniquePersonData(int count)
    {
        List<PersonData> personData = new List<PersonData>();
        HashSet<string> uniquePhoneNumbers = new HashSet<string>();

        // Use the Faker library to generate random names and phone numbers
        var faker = new Faker();
        while (personData.Count < count)
        {
            string name = faker.Name.FullName();
            string phone = GenerateRandomPhone();

            // Ensure unique phone number
            if (!uniquePhoneNumbers.Contains(phone))
            {
                personData.Add(new PersonData { Name = name, Phone = phone });
                uniquePhoneNumbers.Add(phone);
            }
        }

        return personData;
    }

    private static string GenerateRandomPhone()
    {
        Random random = new Random();
        string phone = string.Format("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}",
            random.Next(6, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9),
            random.Next(0, 9));

        return phone;
    }

    private static string GenerateRandomDate()
    {
        Random random = new Random();
        DateTime startDate = new DateTime(2021, 1, 1);
        int range = (DateTime.Today - startDate).Days;
        DateTime randomDate = startDate.AddDays(random.Next(range));

        // Generate random time
        TimeSpan randomTime = new TimeSpan(0, random.Next(0, 24), random.Next(0, 60), random.Next(0, 60));

        randomDate = randomDate.Date + randomTime;

        return randomDate.ToString("dd/MM/yy hh:mm:ss tt");
    }

    private static TimeSpan GenerateRandomDuration()
    {
        Random random = new Random();
        TimeSpan timeSpan = TimeSpan.FromSeconds(random.Next(1, 3600));
        return timeSpan;
    }

    private class PersonData
    {
        public string Name { get; set; }
        public string Phone { get; set; }
    }
}
