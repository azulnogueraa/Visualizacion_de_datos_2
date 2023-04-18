const mapaFetch_p3 = d3.json('../../data/palermo-caba.geojson')
const dataFetch_p3 = d3.dsv(';', '../../data/dataset_seguridad_2022.csv', d3.autoType)

Promise.all([mapaFetch_p3, dataFetch_p3]).then(([barrios, data]) => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: 'black',
        fill: '#3a6fb0',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        
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
        src: './material/police-car-light-svgrepo-com.svg'
      })
      
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_p3').append(() => chartMap)
})
