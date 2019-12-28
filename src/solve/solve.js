const { daisy } = require('./layer0/daisy/daisy')
const { cross } = require('./layer0/cross/cross')
const { newSequenceBuilder } = require('./sequenceBuilder')

function solve (cube) {
    const builder = newSequenceBuilder(cube)
    
    const pipeline = [
        daisy, 
        cross
    ]
    
    pipeline.forEach(fn => {
        const { sequence } =  fn(builder.getCube())
        builder.concat(sequence)
    })

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}

module.exports = { solve }