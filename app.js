const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Read JSON file
const jsonFilePath = 'data.json'; // Replace with your JSON file path
const csvFilePath = 'output.csv'; // Output CSV file path

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const jsonArray = JSON.parse(data);

        // Prepare data for CSV
        const records = jsonArray.map(item => ({
            word: item.word,
            translated: item.translated,
            short_code_from: item.short_code_from,
            short_code_to: item.short_code_to,
            samples: JSON.stringify(item.samples) // Convert samples array to JSON string
        }));

        // Create CSV writer
        const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'word', title: 'word' },
                { id: 'translated', title: 'translated' },
                { id: 'short_code_from', title: 'short_code_from' },
                { id: 'short_code_to', title: 'short_code_to' },
                { id: 'samples', title: 'samples' }
            ],
            fieldDelimiter: ';' // Use semicolon as delimiter
        });

        // Write data to CSV
        csvWriter.writeRecords(records)
            .then(() => console.log('CSV file has been written successfully'))
            .catch(err => console.error('Error writing CSV file:', err));

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
