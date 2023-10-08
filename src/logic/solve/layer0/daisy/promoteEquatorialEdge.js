import { FRONT, BACK, LEFT, RIGHT } from '../../../constants'
import { tile } from '../../../cubeUtils'
import { fnKeys } from '../../solutionNotation'
import { newSequenceBuilder } from '../../sequenceBuilder'

const {
    front, 
    front_inverted, 
    back, 
    back_inverted, 
    left, 
    left_inverted,
    right,
    right_inverted,
    up,
 } = fnKeys

const topTile = tile('top')

const displacedTopEdge = {
    [FRONT]: { 0: topTile(1, 0), 2: topTile(1, 2) },
    [BACK]: { 0: topTile(1, 2), 2: topTile(1, 0) },
    [LEFT]: { 0: topTile(0, 1), 2: topTile(2, 1) },
    [RIGHT]: { 0: topTile(2, 1), 2: topTile(0, 1) },
}

const promotions = {
    [FRONT]: { 0: left_inverted, 2: right },
    [BACK]: { 0: right_inverted,2:  left },
    [LEFT]: { 0: back_inverted, 2: front },
    [RIGHT]: { 0: front_inverted, 2: back },
}

const canPromote = (col, faceName, cube ) => {
    const color = cube.bottom[1][1]
    if(cube[faceName][1][col] !== color){
       throw Error('Cube not valid for this algorithm.')
    }
    return displacedTopEdge[faceName][col](cube) !== color  
}

export const promoteEquatorialEdge = (initialCube, { faceName, col }) => {
    const  builder = newSequenceBuilder(initialCube)
    while(!canPromote(col, faceName, builder.getCube())){
        builder.push(up)
    }
    builder.push(promotions[faceName][col])
    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
