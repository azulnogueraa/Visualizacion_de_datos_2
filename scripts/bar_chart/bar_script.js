// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

Promise.all([
    d3.dsv(';', '../../data/dataset_2020.csv', d3.autoType),
    d3.dsv(';', '../../data/dataset_2021.csv', d3.autoType),
    ]).then(([data2020, data2021]) => {

const data = data2020.concat(data2021)
  
let chart = Plot.plot({  
    marks: [
    Plot.rectY(
        data,
        Plot.binX(
            {
                y: 'count',
                title: d => JSON.stringify(d),
            },
            {
                x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), 
                thresholds: d3.timeMonth,
                fill: 'lightblue',
                rx: 10,
            },
        ),
    ),
    ],
    x: {
        axis:null,
    },
    y: {
    grid: true,
    label: 'Cantidad de reclamos',
    tickFormat: 'd',
    },
    facet: {
        data: data,
        x: d => d3.timeFormat('%B')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
        facetConfig: {
          marginBottom: 50,
          facetPadding: 0.2,
          facetMargins: { top: 10, right: 10, bottom: 50, left: 10 },
          cell: {
            fillOpacity: 0.8,
            stroke: 'lightgray',
            strokeWidth: 1,
          },
          widthRatio: 0.8,
          // Configuración de ancho de faceta personalizado
          width: (facetData) => {
            const maxCount = d3.max(facetData, d => d.count);
            const facetWidth = Math.max(20, maxCount * 5);
            return facetWidth;
          }
        }
      },
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
});