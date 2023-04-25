const mapaFetch2 = d3.json('../../data/barrios-caba.geojson')
const dataFetch2 = d3.dsv(';', '../../data/dataset_2021.csv', d3.autoType)

Promise.all([mapaFetch2, dataFetch2]).then(([barrios, data]) => {

  /* Agrupamos reclamos de inseguridad x barrio */
  const inseguridadPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map

  let chartMap2 = Plot.plot({
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 7,
      scheme: 'blues',
      label: 'grado de inseguridad',
      // legend: true,
    },

    marks: [

      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = inseguridadPorBarrio.get(nombreBarrio)?.length || 0
          return cantReclamos
        },
        stroke: 'grey',
        strokeOpacity: 5,

        title: d => `${d.properties.BARRIO}\n${inseguridadPorBarrio.get(d.properties.BARRIO)?.length || 0} denuncias`,
      }),
      
    ],
    height: 550,
  })


  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart2').append(() => chartMap2)
})
