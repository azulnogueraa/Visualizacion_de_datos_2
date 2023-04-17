// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

Promise.all([
    //d3.dsv(';', 'dataset_2019.csv', d3.autoType),
    d3.dsv(';', 'dataset_2020.csv', d3.autoType),
    d3.dsv(';', 'dataset_2021.csv', d3.autoType),
    d3.dsv(';', 'dataset_2022.csv', d3.autoType),
    ]).then(([data2020, data2021, data2022]) => {

const data = [...data2020, ...data2021, ...data2022];
  
let chart = Plot.plot({  
    marks: [
    Plot.rectY(
        data,
        Plot.binX(
        {
            y: 'count',
            title: d => JSON.stringify(d),
        },
        {
            x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
            thresholds: d3.timeMonth,
        },
    ),
    ),
    Plot.rectY(
        data,
        Plot.binX(
        {
            y: 'count',
            title: d => JSON.stringify(d),
        },
        {
            x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
            thresholds: d3.timeYear,
        },
        
    ),
    { 
        opacity: 0.2,
        fill: 'magenta',
    }
    ),
    ],
    y: {
    grid: true,
    label: 'Cantidad de reclamos',
    tickFormat: 'd',
    },
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
    })
