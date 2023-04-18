// // config. fecha español
// d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
//   d3.timeFormatDefaultLocale(locale)
// })

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
//                 fill: 'blue',
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

Promise.all([
    d3.dsv(';', 'dataset_2020.csv', d3.autoType),
    d3.dsv(';', 'dataset_2021.csv', d3.autoType),
    d3.dsv(';', 'dataset_2022.csv', d3.autoType),
]).then(([data2020, data2021, data2022]) => {

    const dataByYear = [
        { year: 2020, data: data2020 },        
        { year: 2021, data: data2021 },       
        { year: 2022, data: data2022 }    
    ];

    let chart = Plot.plot({
        marks: dataByYear.map(({ year, data }) =>
            Plot.line(
                {
                    x: d3.scaleTime().domain(d3.extent(data, d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))),
                    y: d3.scaleLinear().domain([0, d3.max(data, d => d.values.length)]),
                    //color: `#${year}4444`,
                    curve: 'linear',
                },
                Plot.groupby(data, d => d3.timeMonth(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))),
                d => d.key,
                d => d.values.length,
            )
        ),
        x: {
            label: 'Fecha',
            tickFormat: '%d/%m/%Y',
        },
        y: {
            grid: true,
            label: 'Cantidad de consultas',
            tickFormat: 'd',
        },
        title: 'Comportamiento de consultas por año',
    });

    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart);
});

