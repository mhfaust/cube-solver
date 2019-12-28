const solutionNotation = require('../../solutionNotation')
const { tile } = require('../../../cubeUtils')
const { fnKeys } = require('../../solutionNotation')
const { newSequenceBuilder } = require('../../sequenceBuilder')
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

const rotateSouthEdgeToEquator = (cube, { face }) => {
    const builder = newSequenceBuilder(cube)
    while(!canRotate(face, builder.getCube())){
        builder.push(up)
    }
    builder.push(face)

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}

module.exports = { rotateSouthEdgeToEquator: rotateSouthEdgeToEquator }