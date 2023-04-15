// import addTooltips from "./addTooltips.js";
const mapaFetch = d3.json('palermo-caba.geojson')
const dataFetch = d3.dsv(';', 'dataset_seguridad_2022.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrio, data]) => {
  
    let chartMap = Plot.plot({
      // https://github.com/observablehq/plot#projection-options
      projection: {
        type: 'mercator',
        domain: barrio, // Objeto GeoJson a encuadrar
      },
      marks: [
        Plot.geo(barrios, {
          stroke: '#ddd',
          title: d => `${d.properties.BARRIO}\n${d.properties.prestacion} prestación`,
        }),
        Plot.dot(data.filter(d => d.subcategoria === 'Mayor presencia policial'), { // Filtramos los datos solo para el barrio "Belgrano"
  
          x: 'lon',
          y: 'lat',
          r: 3,
          stroke: 'none',
          fill: 'black'
        }),
      ],
      
    })
  
    /* Agregamos al DOM la visualización chartMap */
    d3.select('#chart').append(() => chartMap)
  })
  