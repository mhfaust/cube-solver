const edgeCoords = [[0,1],[1,0],[1,2],[2,1]]

const { faceNames } = require('../../constants')

const coloredEdges = (color, cube) => {
    return faceNames.map(faceName => {
        const face = cube[faceName]
        return edgeCoords
            .filter(([r,c]) => face[r][c] === color)
            .map(([row, col]) => ({
                face: faceName,
                row,
                col
            }))
        })
        .reduce((accum, arr) => accum.concat(arr), [])
}

edgesBelongingOnTop = (cube) => {
    const color = cube.top[1][1]
    return coloredEdges(color, top)
}



module.exports = { coloredEdges, edgesBelongingOnTop }
