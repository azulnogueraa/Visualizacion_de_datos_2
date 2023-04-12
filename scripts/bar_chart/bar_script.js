// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';', 'seguridad_2021.csv', d3.autoType).then(data => {
  console.log(data.length)
  let chart = Plot.plot({
    x: {
      // Ver formatos https://github.com/d3/d3-time-format
      tickFormat: d => d3.timeFormat('%a %d')(d).toUpperCase(),
    },
    y: {
      grid: true,
      label: 'Cantidad de reclamos',
      tickFormat: 'd',
    },
    marks: [
      Plot.rectY(
        data,
        Plot.binX( //dato temporal lo tratamos como cuantitativo
          {
            y: 'count',
            title: d => JSON.stringify(d),
          },
          {
            // https://github.com/d3/d3-time-format
            // Convierte a un date JS
            x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), //modifico la fecha de ingreso para que difiera que es una fecha, en el svg es un string
            // https://github.com/d3/d3-time#timeDay
            // Agrupamos en intervalo de dias
            thresholds: d3.timeDay,
            //filter: d => d.domicilio_barrio == 'Flores',
          },
        ),
      ),
    ],
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
