// import { expect } from 'chai'
// import { solve } from './solve'
// import { parseFaces } from './../testUtils'

// import { crossTiles, crossEnds } from '../cubeUtils'
// import { equatorFaces } from '../constants'

// describe('daisy', function(){

//     it('works for case 1', function(){
//         const initialCube = parseFaces({
//             front: 'WOO-ROY-RRY',
//             right: 'BBB-GGG-GGG',
//             back: 'RRY-WRO-WOO',
//             left: 'GGG-BBB-BBB',
//             top: 'OWY-OWY-OWY',
//             bottom: 'WYR-WYR-WYR',
//         })

//         const { sequence, cube } = solve(initialCube)

//         console.log(initialCube)

//         crossTiles(cube.bottom).every(
//             tile => expect(tile).to.equal('Y')
//         )
//         equatorFaces.every(
//             faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
//         )
//     })

// })