Promise.all([
    d3.dsv(';', 'dataset_seguridad_2020.csv', d3.autoType),
    d3.dsv(';', 'dataset_seguridad_2021.csv', d3.autoType),
    d3.dsv(';', 'dataset_seguridad_2022.csv', d3.autoType),
    ]).then(([data2020, data2021, data2022]) => {
    
    // Unir los datos en una única estructura de datos
    const data = [
        ...data2020.map((d) => ({ ...d, year: "2020" })),
        ...data2021.map((d) => ({ ...d, year: "2021" })),
        ...data2022.map((d) => ({ ...d, year: "2022" })),
      ];

    // Trazar el gráfico de barras
    let chart = Plot.plot({
        marks: [
        Plot.barY(data.filter((d) => d.year == "2020"), {
            x: 'fecha_ingreso',
            y: () => 1,
        }),
        Plot.barY(data.filter((d) => d.year == "2021"), {
            x: 'fecha_ingreso',
            y: () => 1,
        }),
        Plot.barY(data.filter((d) => d.year == "2022"), {
            x: 'fecha_ingreso',
            y: () => 1,
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