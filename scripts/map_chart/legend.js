let legend = Plot.legend({

    color: {
        type: 'quantize',
        n: 7,
        scheme: 'blues',
        label: 'grado de inseguridad',
        domain: [1, 203]
    }
  })

d3.select('#legend').append(() => legend)