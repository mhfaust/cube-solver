import { tile } from '../../../cubeUtils'
import { fnKeys } from '../../solutionNotation'
import { newSequenceBuilder } from '../../sequenceBuilder'
const { up, front2, left2, right2, back2 } = fnKeys

const topTile = tile('top')

const canPromote = (row, col, cube) => {
    const petalColor = cube.bottom[1][1]
    const displacedTopEdge = topTile(2 - row, col, cube)
    return displacedTopEdge !== petalColor
}
const promotions = [
    [      , front2,       ],
    [ left2,       , right2],
    [      , back2 ,       ],
]

export const promoteBottomEdge = (cube, { row, col }) => {
    const builder = newSequenceBuilder(cube)
    while(!canPromote(row, col, builder.getCube())){
        builder.push(up)
    }
    builder.push(promotions[row][col])

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
