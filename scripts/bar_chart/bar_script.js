// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

Promise.all([
  d3.dsv(';', '../../data/dataset_2020.csv', d3.autoType),
  d3.dsv(';', '../../data/dataset_2021.csv', d3.autoType),
  ]).then(([data2020, data2021]) => {


data = data2020.concat(data2021)

let colorScale = d3.scaleOrdinal()
.domain(data.map(d => d3.timeFormat('%Y')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))))
.range(d3.schemePaired);

let chart = Plot.plot({
  marks: [
    Plot.barY(data, Plot.groupX({y: "count"}, {
      x: d => d3.timeFormat('%Y')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
      y: () => 1,
      fill: d => colorScale(d3.timeFormat('%Y')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso))),
      rx: 6,
      })),
    ],
    facet: {
      data: data,
      x: d => d3.timeFormat('%m')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
      label: "Mes",
      labelAnchor: "center",
    },  
    fx: {
      tickFormat: (d) => {
        const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
        return monthNames[d-1];
      },
    },
    x: { axis: null, 
      paddingInner: 0.05,
      // barwidth: 100, 
    },
    y: {
      label: "Cantidad de denuncias",
      labelAnchor: "top",
    },
    color: {
      domain: ["2020", "2021"],
      range: d3.schemePaired,
      legend: true
    },
    width: 700,
    height: 300,
    options: {
      scales: {
          xAxes: [{
              barThickness: 6,  // number (pixels) or 'flex'
              maxBarThickness: 8 // number (pixels)
          }]
      }
  }

  })
  d3.select('#barchart').append(() => chart)
})