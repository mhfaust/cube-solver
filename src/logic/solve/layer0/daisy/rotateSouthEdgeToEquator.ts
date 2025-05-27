import { solutionNotation, FnName } from '../../solutionNotation'
import { TileLocator, tile } from '../../../cubeUtils'
import { newSequenceBuilder } from '../../sequenceBuilder'
import { CubeFaces } from '@/logic/newCube'
import { EquatorialEdge } from '@/logic/constants'

const topTile = tile('top')

const displacements = {
    front: topTile(2, 0),
    right: topTile(1, 2),
    back: topTile(0, 1),
    left: topTile(1, 0)
}

const canRotate = (faceName: EquatorialEdge, cube: CubeFaces) => {
    const petalColor = cube.bottom[1][1]
    return displacements[faceName](cube) !== petalColor
}

export const rotateSouthEdgeToEquator = (cube: CubeFaces, { faceName }: { faceName: EquatorialEdge }) => {
    const builder = newSequenceBuilder(cube)
    while(!canRotate(faceName, builder.getCube())){
        builder.push('up')
    }
    builder.push(faceName as FnName)

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
