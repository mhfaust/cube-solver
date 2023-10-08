import { BOTTOM, TOP } from '../../../constants'
import { promoteBottomEdge } from './promoteBottomEdge'
import { promoteEquatorialEdge } from './promoteEquatorialEdge'
import { rotateNorthEdgeToEquator } from './rotateNorthEdgeToEquator'
import { rotateSouthEdgeToEquator } from './rotateSouthEdgeToEquator'
import { findPetal } from './findPetal'
import { newSequenceBuilder } from '../../sequenceBuilder'

export const isDaisyDone = cube => {
    const petalColor = cube.bottom[1][1]
    const { top: [ [ , a, ], [b, , c],[ , d, ] ] } = cube
    return [a,b,c,d].every(tile => tile === petalColor)
}

const getCaseHandler = (edge) => {
    if(edge.faceName === BOTTOM){
        return promoteBottomEdge
    }
    return {
        0: rotateNorthEdgeToEquator,
        1: promoteEquatorialEdge,
        2: rotateSouthEdgeToEquator
    }[edge.row]
}


export const daisy = (cube) => {
    const builder = newSequenceBuilder(cube)
    let c = 0
    while(!isDaisyDone(builder.getCube())){
        const nextCube = builder.getCube()
        const edge = findPetal(nextCube)

        const { sequence } = getCaseHandler(edge)(nextCube, edge)
        builder.concat(sequence)
    }
    
    return {
        cube: builder.getCube(),
        sequence: builder.getSequence() 
    }
}
