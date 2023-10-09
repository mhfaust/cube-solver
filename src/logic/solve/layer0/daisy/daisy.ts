// import { BOTTOM, TOP } from '../../../constants'
// import { promoteBottomEdge } from './promoteBottomEdge'
// import { promoteEquatorialEdge } from './promoteEquatorialEdge'
// import { rotateNorthEdgeToEquator } from './rotateNorthEdgeToEquator'
// import { rotateSouthEdgeToEquator } from './rotateSouthEdgeToEquator'
// import { findPetal } from './findPetal'
// import { CaseHandler, CubeAndSequence, newSequenceBuilder } from '../../sequenceBuilder'
// import { Cube } from '@/logic/newCube'
// import { TileLocator } from '@/logic/cubeUtils'

// export const isDaisyDone = (cube: Cube) => {
//     const petalColor = cube.bottom[1][1]
//     const { top: [ [ , a, ], [b, , c],[ , d, ] ] } = cube
//     return [a,b,c,d].every(tile => tile === petalColor)
// }

// const getCaseHandler = (edge: TileLocator): CaseHandler => {
//     if(edge.faceName === BOTTOM){
//         return promoteBottomEdge
//     }
//     return {
//         0: rotateNorthEdgeToEquator,
//         1: promoteEquatorialEdge,
//         2: rotateSouthEdgeToEquator
//     }[edge.row]
// }


// export const daisy = (cube: Cube) => {
//     const builder = newSequenceBuilder(cube)
//     let c = 0
//     while(!isDaisyDone(builder.getCube())){
//         const nextCube = builder.getCube()
//         const edge = findPetal(nextCube)!

//         const handler = getCaseHandler(edge!);
//         const { sequence } = handler(nextCube, edge)
//         builder.concat(sequence)
//     }
    
//     return {
//         cube: builder.getCube(),
//         sequence: builder.getSequence() 
//     }
// }
