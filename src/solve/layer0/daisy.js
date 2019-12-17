const coloredEdges = require('./coloredEdges')
const { equatorFaces, oppositeFaces } = require('../../constants')
const { xNeg } = require('../../layerRotations')
const { newSequence } = require('../sequence')

const upLeft = xNeg(0)
const upRight = xNeg(2)

const equatorFacesSet = new Set(equatorFaces)


const canPromoteteEdge = (col, cube) => {
    if(cube.front[1][col] !== color){
        return false
    }
    return cube.top
        .map(row => row[col])
        .every(tile => tile !== color)
}




const isEdgeOnEquator = (edge) => equatorFacesSet.has(edge.face) && edge.row === 1 && edge.col !== 1

const promoteAllEquatorialEdges = (cube) => {

    const color = oppositeFaces[cube.top[1][1]]

    sequence = newSequence(cube)
    
    coloredEdges(color, top)
        .filter(isEdgeOnEquator)
        .forEach(edge => {
            while(!canPromoteteEdge(edge.col, sequence.result)){
                
            }
    })
}

