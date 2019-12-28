const { newSequenceBuilder } = require('../../sequenceBuilder')

function corners(cube){
    const builder = newSequenceBuilder(cube)



    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
    return
}