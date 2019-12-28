const solutionNotation = require('../../solutionNotation')

const rotateNorthEdgeToEquator = (cube, { faceName: face }) => {
    console.log('rotateNorthEdgeToEquator')
    return {
        cube: solutionNotation[face](cube),
        //this works because the convenience of the notation matching equatorial face-names
        sequence: [face] 
    }
}

module.exports = { rotateNorthEdgeToEquator: rotateNorthEdgeToEquator }