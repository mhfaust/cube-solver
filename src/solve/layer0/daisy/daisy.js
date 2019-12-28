const { BOTTOM, TOP } = require('../../../constants')
const { promoteBottomEdge } = require('./promoteBottomEdge')
const { promoteEquatorialEdge } = require('./promoteEquatorialEdge')
const { rotateNorthEdgeToEquator } = require('./rotateNorthEdgeToEquator')
const { rotateSouthEdgeToEquator } = require('./rotateSouthEdgeToEquator')
const { findPetal } = require('./findPetal')
const { newSequenceBuilder } = require('../../sequenceBuilder')

const isDaisyDone = cube => {
    const petalColor = cube.bottom[1][1]
    const { top: [ [ , a, ], [b, , c],[ , d, ] ] } = cube
    return [a,b,c,d].every(tile => tile === petalColor)
}

const handler = (edge) => {
    if(edge.face === BOTTOM){
        return promoteBottomEdge
    }
    return {
        0: rotateNorthEdgeToEquator,
        1: promoteEquatorialEdge,
        2: rotateSouthEdgeToEquator
    }[edge.row]
}


const daisy = (cube) => {
    const builder = newSequenceBuilder(cube)
    let c = 0
    while(!isDaisyDone(builder.getCube())){
        const nextCube = builder.getCube()
        const edge = findPetal(nextCube)
        const { sequence } = handler(edge)(nextCube, edge)
        builder.concat(sequence)
    }
    
    return {
        cube: builder.getCube(),
        sequence: builder.getSequence() 
    }
}

module.exports = { daisy }