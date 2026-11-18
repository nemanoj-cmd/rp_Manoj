// Code for generating a Chart.js line chart
/*
    The script file will show how to make a scatter plot
    Data from: NASA
    Temperature data is in differences from the mean of 14 degrees C
    Mean from: NASA (include the link)
*/

async function getData() {
    const response = await fetch('../data/data.csv');  // remember .. means to move up a file
    const data = await response.text();
    //console.log(data);

    const xGroup = [];      // x-axis labels = years
    const yNum = [];         // y-axis labels = global temperature
    const yTime = [];    // y-axis = Northern Hempishphere temps

    // \n - new line character
    // split('\n') - will separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index 'start' up to but not including index 'end'

    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(',');     // split each row into columns using commas
        
        const group = parseFloat(columns[0]);            //assigning year year
        xGroup.push(group);                      // push year value into array xYears

        const num = parseFloat(columns[1]);   // convert global value from a string to a float
        yNum.push(num);                  // Add 14 to convert the difference to a temperature value in degrees C
       
        const time = parseFloat(columns[2]);   // convert global value from a string to a float
        yTime.push(time);                  // Add 14 to convert the difference to a temperature value in degrees C


        console.log(group, num, time);

    });

    return {xGroup, yNum, yTime};        // Use {} to return multiple values of the object
};

async function createChart() {
    const data = await getData();       // wait until getData processes the Data
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
    const degreeSymbol = String.fromCharCode(176);  // Display the temperature degree symbol

    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'bar',
        data: {                         // Define data
            labels: data.xGroup,        // x-axis labels 
            datasets: [                  
                {
                    label:    `Combined Global Land-Surface Air and Sea-Surface Water Temperature in ${degreeSymbol}C`,     // Dataset label for legend
                    data:     data.yNum,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Combined N. H. Land-Surface Air and Sea-Surface Water Temperature in ${degreeSymbol}C`,     // Dataset label for legend
                    data:     data.yTime,     // Reference to array of y-values
                    fill:     '-1',           // Will fill o the previous data set
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                    tension: 0.4            // Allows us to control the smoothness of the line. 0 = straight line connector
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Year',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        font: {
                            size: 12

                        },
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Global Mean Temperatures ('${degreeSymbol}C)`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {               
                        maxTicksLimit: data.yTime.length/10,        // Limit the number of tick marks
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Planarian Travel Speeds vs. Group',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }       
    });
    

}

    createChart();



