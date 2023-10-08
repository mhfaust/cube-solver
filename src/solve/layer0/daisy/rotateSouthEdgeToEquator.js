import solutionNotation from '../../solutionNotation'
import { tile } from '../../../cubeUtils'
import { fnKeys } from '../../solutionNotation'
import { newSequenceBuilder } from '../../sequenceBuilder'
const { up, front, left, right, back } = fnKeys

const topTile = tile('top')

const displacements = {
    front: topTile(2, 0),
    right: topTile(1, 2),
    back: topTile(0, 1),
    left: topTile(1, 0)
}

const canRotate = (faceName, cube) => {
    const petalColor = cube.bottom[1][1]
    return displacements[faceName](cube) !== petalColor
}

export const rotateSouthEdgeToEquator = (cube, { faceName }) => {
    const builder = newSequenceBuilder(cube)
    while(!canRotate(faceName, builder.getCube())){
        builder.push(up)
    }
    builder.push(faceName)

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
