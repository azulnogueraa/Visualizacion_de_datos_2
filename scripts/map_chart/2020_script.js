const mapaFetch1 = d3.json('../../data/barrios-caba.geojson')
const dataFetch1 = d3.dsv(';', '../../data/dataset_2020.csv', d3.autoType)

Promise.all([mapaFetch1, dataFetch1]).then(([barrios, data]) => {

  /* Agrupamos reclamos de inseguridad x barrio */
  const inseguridadPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map

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
      // legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = (inseguridadPorBarrio.get(nombreBarrio)?.length/1086)*100 || 0
          return cantReclamos
        },
        stroke: 'grey',
        strokeOpacity: 5,

        title: d => `${d.properties.BARRIO}\n${inseguridadPorBarrio.get(d.properties.BARRIO)?.length || 0} reportes`,
      }),
      
    ],
    height: 550,
  })


  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart1').append(() => chartMap)
})
