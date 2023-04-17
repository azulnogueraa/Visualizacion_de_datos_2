const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'dataset_seguridad_2020.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* Agrupamos reclamos de inseguridad x barrio */
  const inseguridadPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('inseguridadPorBarrio', inseguridadPorBarrio)
  
  
  let chartMap = Plot.plot({
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

      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = inseguridadPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },
        stroke: 'grey',
        strokeOpacity: 5,

        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        // title: d => `trapito`,
      }),
      
    ],
  })


  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart1').append(() => chartMap)
})
