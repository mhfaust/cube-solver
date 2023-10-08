import solutionNotation from '../../solutionNotation'

export const rotateNorthEdgeToEquator = (cube, { faceName }) => {
    console.log('rotateNorthEdgeToEquator')
    return {
        cube: solutionNotation[faceName](cube),
        //this works because the convenience of the notation matching equatorial face-names
        sequence: [faceName] 
    }
}
