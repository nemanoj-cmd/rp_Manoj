/*
    This script file demonstrates how to split and slice the CSV data
    Data from:
    Values are 
    Mean from: 
*/
async function getData() {
    const response = await fetch('../data/data.csv');   // .. moves you up one folder level
    const data = await response.text()                  // CSV in TEXT format
    console.log(data);

    // \n - new line character
    // split('\n') - will separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at the index "start" up to "end"
    const table = data.split('\n').slice(1);  // Split by line and remove the first row
    console.log(table)

    table.forEach(row => {
        const columns = row.split(','); // Split each row into columns at each comma
        const group = columns[0];        // Assign the year to the first column (zeroth index)
        const num = columns[1];        // global temp deviation (string)
        const time = columns[2];      // Northern Hemi. Temp Deviation (string)

        console.log(group, num, time);
        // Will parseFloat() all string values to work with them numerically
    })
}

getData()