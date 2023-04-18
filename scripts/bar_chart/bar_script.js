// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

// Promise.all([
//     d3.dsv(';', 'dataset_2020.csv', d3.autoType),
//     d3.dsv(';', 'dataset_2021.csv', d3.autoType),
//     d3.dsv(';', 'dataset_2022.csv', d3.autoType),
//     ]).then(([data2020, data2021, data2022]) => {

// const data = [...data2020, ...data2021, ...data2022];
  
// let chart = Plot.plot({  
//     marks: [
//     Plot.rectY(
//         data,
//         Plot.binX(
//             {
//                 y: 'count',
//                 title: d => JSON.stringify(d),
//             },
//             {
//                 x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
//                 thresholds: d3.timeYear,
//                 fillOpacity: 0.1,
//             },
//         ),
//     ),
//     Plot.rectY(
//         data,
//         Plot.binX(
//             {
//                 y: 'count',
//                 title: d => JSON.stringify(d),
//             },
//             {
//                 x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
//                 thresholds: d3.timeMonth,
//                 fill: 'lightblue',
//                 rx: 10,
                
//             },
//         ),
//     ),
//     ],
//     y: {
//     grid: true,
//     label: 'Cantidad de reclamos',
//     tickFormat: 'd',
//     },
//     })
//     // Agregamos chart al div#chart de index.html
//     d3.select('#chart').append(() => chart)
//     })

d3.dsv(';', 'dataset_2020.csv', d3.autoType).then(data => {   
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
                fill: 'lightblue',
                rx: 10,
            },
        ),
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

d3.dsv(';', 'dataset_2021.csv', d3.autoType).then(data => {   
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
                fill: 'lightblue',
                rx: 10,
            },
        ),
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

// Cargar ambos archivos CSV
Promise.all([
    d3.dsv(';', 'dataset_2020.csv', d3.autoType),
    d3.dsv(';', 'dataset_2021.csv', d3.autoType),
]).then(([data2020, data2021]) => {
    // Agrupar los datos por mes y año
    const data2020Grouped = d3.rollup(data2020, v => v.length, d => d3.timeFormat('%Y-%m')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)));
    const data2021Grouped = d3.rollup(data2021, v => v.length, d => d3.timeFormat('%Y-%m')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)));

    // Crear un conjunto de datos nuevo con la cantidad de reclamos por mes y año
    const data = [];
    const months = Array.from(new Set([...data2020Grouped.keys(), ...data2021Grouped.keys()]));
    for (const month of months) {
        const [year, monthNum] = month.split('-');
        data.push({
            month: d3.timeParse('%m')(monthNum),
            year: parseInt(year),
            count2020: data2020Grouped.get(month) || 0,
            count2021: data2021Grouped.get(month) || 0,
        });
    }

    // Crear el gráfico de barras con dos barras por mes
    const chart = Plot.plot({
        marks: [
            Plot.barY(
                data,
                { x: 'month', y: 'count2020', fill: 'lightblue', title: '2020' },
                { x: 'year' }
            ),
            Plot.barY(
                data,
                { x: 'month', y: 'count2021', fill: 'lightgreen', title: '2021' },
                { x: 'year' }
            ),
        ],
        x: {
            label: 'Mes',
            tickFormat: d3.timeFormat('%B'),
        },
        y: {
            grid: true,
            label: 'Cantidad de reclamos',
            tickFormat: 'd',
        },
    });

    // Agregar el gráfico al div#chart de index.html
    d3.select('#chart').append(() => chart);
});



// d3.dsv(';', '../../data/dataset_seguridad_2020.csv', d3.autoType).then(data => {   
// let chart = Plot.plot({ 
//     marks: [
//     Plot.rectY(
//         data,
//         Plot.binX(
//             {
//                 y: 'count',
//                 title: d => JSON.stringify(d),
//             },
//             {
//                 x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
//                 thresholds: d3.timeMonth,
//                 fill: 'lightblue',
//                 rx: 10,
//             },
//         ),
//     ),
//     ],
//     y: {
//     grid: true,
//     label: 'Cantidad de reclamos',
//     tickFormat: 'd',
//     },
//     })
//     // Agregamos chart al div#chart de index.html
//     d3.select('#chart').append(() => chart)
//     })


// Promise.all([
//     d3.csv('../../data/dataset_seguridad_2020.csv', d3.autoType),
//     d3.csv('../../data/dataset_seguridad_2021.csv', d3.autoType),
//     d3.csv('../../data/dataset_seguridad_2022.csv', d3.autoType),
// ]).then(([data2020, data2021, data2022]) => {

//     const dataByYear = [        
//         { year: 2020, data: data2020 },                
//         { year: 2021, data: data2021 },               
//         { year: 2022, data: data2022 }        
//     ];

//     const values = dataByYear.map(({ year, data }) => ({
//         year: year,
//         values: d3.rollup(data, v => v.length, d => d3.timeDay(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)))
//     }));

//     let chart = Plot.plot({
//         width: 800,
//         height: 500,
//         marks: dataByYear.map(({ year, data }) =>
//             Plot.line(
//                 {
//                     x: d3.scaleTime().domain(d3.extent(data, d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))),
//                     y: d3.scaleLinear().domain([0, d3.max(data, d => d.values.length)]),
//                     //stroke: `#${year}4444`,
//                     curve: 'linear',
//                 },
//                 Plot.groupby(data, d => d3.timeMonth(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))),
//                 d => d.key,
//                 d => d.values.length,
//             )
//         ),
//         xAxis: {
//             title: 'Fecha',
//             tickFormat: '%d/%m/%Y',
//         },
//         yAxis: {
//             title: 'Cantidad de consultas',
//             tickFormat: 'd',
//         },
//         title: 'Comportamiento de consultas por año',
//     });

//     // Agregamos chart al div#chart de index.html
//     d3.select('#chart').datum(chart).call(chart);
// });
