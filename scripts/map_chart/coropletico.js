// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

const coropletico = d3.json('../../data/barrios-caba.geojson')

Promise.all([
    coropletico,
    d3.dsv(';', '../../data/dataset_2020.csv', d3.autoType),
    d3.dsv(';', '../../data/dataset_2021.csv', d3.autoType),
]).then(([barrios, datos2020, datos2021]) => {

    const inseguridadPorBarrio2020 = d3.group(datos2020, d => d.domicilio_barrio)
    const inseguridadPorBarrio2021 = d3.group(datos2021, d => d.domicilio_barrio)

    const data2020 = datos2020.map(d => ({...d, year: 2020}))
    const data2021 = datos2021.map(d => ({...d, year: 2021}))

    const data = data2020.concat(data2021)

    /* Mapa Coroplético */
    let chartMap = Plot.plot({
        // https://github.com/observablehq/plot#projection-options
        projection: {
            type: 'mercator',
            domain: barrios, // Objeto GeoJson a encuadrar
        },
        color: {
            // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
            type: 'quantize',
            n: 9,
            scheme: 'blues',
            label: 'grado de inseguridad',
            legend: true,
        },
        marks: [
            Plot.density(data, {x: 'lon', y: 'lat', fill: 'density', bandwidth: 2, thresholds: 30}),
            Plot.geo(barrios, {
                fill: d => {
                    let nombreBarrio = d.properties.BARRIO
                    let cantReclamos = inseguridadPorBarrio2020.get(nombreBarrio)?.length || 0
                    return cantReclamos
                },
                stroke: 'gray',
                title: d => `${d.properties.BARRIO}\n${inseguridadPorBarrio2020.get(d.properties.BARRIO)?.length || 0} denuncias - 2020`,
            }),
            Plot.geo(barrios, {
                fill: d => {
                    let nombreBarrio = d.properties.BARRIO
                    let cantReclamos = inseguridadPorBarrio2021.get(nombreBarrio)?.length || 0
                    return cantReclamos
                },
                stroke: 'gray',
                title: d => `${d.properties.BARRIO}\n${inseguridadPorBarrio2021.get(d.properties.BARRIO)?.length || 0} denuncias - 2021`,
            }),
        ],
        facet: {
            data: data,
            x: d => d3.timeFormat("%Y")(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
        },
        fx: {
            domain: ['2020', '2021']
        },
        width: 1000
    })

    /* Agregamos al DOM la visualización chartMap */
    d3.select('#chart_coropletico').append(() => chartMap)
})