import { I, tile } from '../../../cubeUtils'
import { FnName } from '../../solutionNotation'
import { newSequenceBuilder } from '../../sequenceBuilder'
import { CubeFaces } from '@/logic/newCube'

const topTile = tile('top')

const canPromote = (row: I, col: I, cube: CubeFaces) => {
    const petalColor = cube.bottom[1][1]
    const displacedTopEdge = topTile(2 - row, col)(cube)
    return displacedTopEdge !== petalColor
}
const promotions = [
    [      , 'front2',       ],
    [ 'left2',       , 'right2'],
    [      , 'back2' ,       ],
]

type P = { row: 0, col: 1 } | { row: 1, col: 0 } | { row: 0, col: 2 } | { row: 2, col: 1 }

export const promoteBottomEdge = (cube: CubeFaces, { row, col }: P) => {
    const builder = newSequenceBuilder(cube)
    while(!canPromote(row, col, builder.getCube())){
        builder.push('up')
    }
    builder.push(promotions[row][col] as FnName)

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
