const { equatorFaces } = require('../../../constants')

const bottomEdgeCoords = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 1 },
]

function findPetal(cube){
    const petalColor = cube.bottom[1][1]
    //equatorial edges:
    for(let faceName of equatorFaces){
        for(col of [0, 2]){
            if(cube[faceName][1][col] === petalColor){
                return { faceName, row: 1, col }
            }
        }
    }
    //bottom edges:
    for(let coords of bottomEdgeCoords){
        const { col, row } = coords
        if(cube.bottom[row][col] === petalColor){
            return { faceName: 'bottom', row, col }
        }
    }
    //north and south edges:
    for(let faceName of equatorFaces){
        for(let row of [0, 2]){
            if(cube[faceName][row][1] === petalColor){
                return { faceName, row, col: 1 }
            }
        }
    }
}

module.exports = { findPetal }
