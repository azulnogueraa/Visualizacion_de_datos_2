let legend = Plot.legend({

    color: {

        type: 'quantize',

        n: 9,

        scheme: 'blues',

        domain: [1, 203]

    }

  })

d3.select('#legend').append(() => legend)