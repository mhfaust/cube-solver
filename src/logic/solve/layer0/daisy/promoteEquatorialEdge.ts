import { FRONT, BACK, LEFT, RIGHT, EquatorialEdge } from '../../../constants'
import { tile } from '../../../cubeUtils'
import { FnName } from '../../solutionNotation'
import { newSequenceBuilder } from '../../sequenceBuilder'
import { Cube } from '@/logic/newCube'

type TopEdgeFn = Record<EquatorialEdge, { 0: (cube: Cube) => string, 2:  (cube: Cube) => string }>
type Promotion = Record<EquatorialEdge, { 0: FnName, 2: FnName }>

const topTile = tile('top')

const displacedTopEdge: TopEdgeFn = {
    [FRONT]: { 0: topTile(1, 0), 2: topTile(1, 2) },
    [BACK]: { 0: topTile(1, 2), 2: topTile(1, 0) },
    [LEFT]: { 0: topTile(0, 1), 2: topTile(2, 1) },
    [RIGHT]: { 0: topTile(2, 1), 2: topTile(0, 1) },
}

const promotions: Promotion = {
    [FRONT]: { 0: 'left_inverted', 2: 'right' },
    [BACK]: { 0: 'right_inverted',2:  'left' },
    [LEFT]: { 0: 'back_inverted', 2: 'front' },
    [RIGHT]: { 0: 'front_inverted', 2: 'back' },
}

const canPromote = (col: 0 | 2, faceName: EquatorialEdge, cube: Cube ) => {
    const color = cube.bottom[1][1]
    if(cube[faceName][1][col] !== color){
       throw Error('Cube not valid for this algorithm.')
    }
    return displacedTopEdge[faceName as EquatorialEdge][col](cube) !== color  
}

export const promoteEquatorialEdge = (
            initialCube: Cube, 
            { faceName, col }: { faceName: EquatorialEdge, col: 0 | 2 }
        ) => {
            
    const  builder = newSequenceBuilder(initialCube)
    while(!canPromote(col, faceName, builder.getCube())){
        builder.push('up')
    }
    builder.push(promotions[faceName][col])
    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
