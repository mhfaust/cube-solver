import { faceNames } from '../../../constants'

const edgeCoords = [[0,1],[1,0],[1,2],[2,1]]


export const coloredEdges = (color, cube) => {
    return faceNames.map(faceName => {
        const face = cube[faceName]
        return edgeCoords
            .filter(([r,c]) => face[r][c] === color)
            .map(([row, col]) => ({
                faceName,
                row,
                col
            }))
        })
        .reduce((accum, arr) => accum.concat(arr), [])
}
