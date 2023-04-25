const mapaFetch_p2 = d3.json('../../data/palermo-caba.geojson')
const dataFetch_p2 = d3.dsv(';', '../../data/dataset_2021.csv', d3.autoType)

Promise.all([mapaFetch_p2, dataFetch_p2]).then(([barrios, data]) => {

  const inseguridadPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map

  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: 'black',
        fill: '#074594',
        title: d => `${d.properties.BARRIO}\n${inseguridadPorBarrio.get(d.properties.BARRIO)?.length || 0} reportes`,        
      }),

      Plot.dot(data.filter(d => d.categoria === 'SEGURIDAD' && d.domicilio_barrio === 'PALERMO'), { // Filtramos los datos solo para el barrio "Belgrano"
        x: 'lon',
        y: 'lat',
        r: 2,
        stroke: 'none',
        fill: 'black',
      }),
      Plot.image(data.filter(d => d.categoria === 'SEGURIDAD' && d.domicilio_barrio === 'PALERMO'), {
        x: 'lon',
        y: 'lat',
        src: '../../material/police-car-light-svgrepo-com.svg'
      })
      
    ],
    height: 550,
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_p2').append(() => chartMap)
})
