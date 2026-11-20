// Code for generating a Chart.js bar chart
/*
    The script file will show how to make a bar chart
    Data from: NASA
    Temperature data is in differences from the mean of 14 degrees C
    Mean from: NASA (https://climate.nasa.gov/)
*/

async function getData() {
    const response = await fetch('../data/data.csv');  // remember .. means to move up a file
    const data = await response.text();

    const xGroup = [];       // x-axis labels = years
    const yNum = [];         // y-axis labels = global temperature
    const yTime = [];        // y-axis = Northern Hemisphere temps

    const table = data.split('\n').slice(1).filter(row => row.trim() !== '');

    table.forEach(row => {
        const columns = row.split(',');     // split each row into columns using commas
        
        const group = parseFloat(columns[0]);            // assigning year
        xGroup.push(group);                             // push year value into array

        const num = parseFloat(columns[1]);   // convert global value to float
        yNum.push(num);                        
       
        const time = parseFloat(columns[2]);   // convert Northern Hemisphere value to float
        yTime.push(time);                        

        console.log(group, num, time);
    });

    return { xGroup, yNum, yTime };        
};

async function createChart() {
    const data = await getData();       // wait until getData processes the data
    const lineChart = document.getElementById('lineChart');    
    const degreeSymbol = String.fromCharCode(176);  // Display the temperature degree symbol

    const myChart = new Chart(lineChart, {      
        type: 'bar', // Changed from 'line' to 'bar'
        data: {                        
            labels: data.xGroup,        // x-axis labels 
            datasets: [                 
                {
                    label: `Different Planaria Groups Considered for Average Travel Time (in seconds)`,    
                    data: data.yTime,    
                    backgroundColor: 'rgba(155, 70, 207, 0.5)',    
                    borderColor: 'rgb(178, 112, 219)',      
                    borderWidth: 3   
                },
            ]
        },
        options: {                        
            responsive: true,            
            maintainAspectRatio: false,
            scales: {                   
                x: {                      
                    title: {
                        display: true,  
                        text: 'Group Number',    
                        font: {             
                            size: 14
                        },
                    },
                    ticks: {                      
                        font: {
                            size: 12        
                        }
                    },
                    grid: {                      
                        color: '#6c767e'
                    }
                },
                y: {                            
                    title: {
                        display: true,                        
                        text: `Average Travel Time (seconds)`,    
                        font: {
                            size: 14
                        },
                    },
                    ticks: {                   
                        font: {
                            size: 12
                        }
                    },
                    grid: {                      
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  
                title: {
                    display: true,
                    text: 'Average Travel Time of Different Planaria Groups',
                    font: {
                        size: 24,
                    },
                    color: 'black', 
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: false,
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