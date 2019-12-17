const chalk  = require("chalk");
const { nArray } = require('../utils')

const chalkColors = {
    R: 'red',
    B: 'blue',
    G: 'green',
    Y: 'yellow',
    W: 'white',
    O: 'magenta'
}

const rowStr = (row) => row.map(tile => chalk[chalkColors[tile]]('■')).join(' ')
const nthRowOfEachFace = (faceNames) => (n) => (cube) => faceNames.map(fn => rowStr(cube[fn][n])).join('   ')
const northRow = nthRowOfEachFace(['top'])
const equatorialRow = nthRowOfEachFace(['left', 'front', 'right', 'back'])
const southRow = nthRowOfEachFace(['bottom'])


module.exports = (cube) => {
    
    const size = cube['front'].length
    const rowOfInts = nArray(size)(i => i)

    return [
        rowOfInts.map(northRow).map(r => '        ' + r(cube)).join('\n'),
        rowOfInts.map(equatorialRow).map(r => r(cube)).join('\n'),
        rowOfInts.map(southRow).map(r => '        ' + r(cube)).join('\n')
    ].join('\n\n')
}

