Promise.all([
    d3.dsv(';', 'seguridad_2020.csv', d3.autoType),
    d3.dsv(';', 'seguridad_2021.csv', d3.autoType),
    d3.dsv(';', 'seguridad_2022.csv', d3.autoType),
    ]).then(([data2020, data2021, data2022]) => {
    
    // Unir los datos en una única estructura de datos
    const data = [...data2020, ...data2021, ...data2022];
    
    // Trazar el gráfico de barras
    let chart = Plot.plot({
        marks: [
        Plot.barY(data, {
            x: 'categoria',
            y: () => 1, //completar con cantidad por anio
        }),
        ],
        marginLeft: 200,
        x: {
        grid: true,
        tickFormat: d3.format(',.0f'),
        },
        y: {
        label: '',
        },
    })
    
    // Agregar el gráfico al div#chart en index.html
    d3.select('#chart').append(() => chart)
    })