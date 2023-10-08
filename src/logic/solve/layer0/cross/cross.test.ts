import { expect } from 'chai'
import { parseFaces } from '../../../testUtils'
import { cross } from './cross'
import { crossTiles, crossEnds } from '../../../cubeUtils'
import { equatorFaces } from '../../../constants'

describe('cross', function(){

    it('works for case 1', function(){
        const initialCube = parseFaces({ 
            front: 'GGG-ROR-GGY',
            back: 'OOO-ORW-OOB',
            right: 'RRB-BGB-RGB',
            left: 'YBR-RBG-RBW',
            top: 'GYW-YWY-YYW',
            bottom: 'OOB-WYW-WWY' 
        })

        const { cube, sequence } = cross(initialCube)

        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('Y')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    }),
    it('works for case 2', function(){
        const initialCube = parseFaces({ 
            front: 'BGY-OYG-RGR',
            back: 'OYR-YWO-YBG',
            right: 'OBB-OGB-WGG',
            left: 'GWY-WBY-OWW',
            top: 'YRW-ROR-RRB',
            bottom: 'GWB-BRY-WOO' 
        })

        const { cube, sequence } = cross(initialCube)

        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('R')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    }),
    it('works for case 3', function(){
        const initialCube = parseFaces({ 
            front: 'WWO-BBG-GGB',
            back: 'RYY-RGG-WRB',
            right: 'BGY-YWY-RYO',
            left: 'GBO-RYR-YWR',
            top: 'OOG-ORO-BOY',
            bottom: 'WWW-BOB-RWG' 
        })

        const { cube, sequence } = cross(initialCube)

        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('O')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    }),
    it('works for case 4', function(){
        const initialCube = parseFaces({ 
            front: 'YWY-YWY-YWY',
            back: 'WYW-WYW-WYW',
            right: 'RRR-RRR-RRR',
            left: 'OOO-OOO-OOO',
            top: 'GGG-GBG-GGG',
            bottom: 'BBB-BGB-BBB' 
        })

        const { cube, sequence } = cross(initialCube)
        
        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('G')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    }),
    it('works for case 5', function(){
        const initialCube = parseFaces({ 
            front: 'GRB-YOG-YRY',
            back: 'WOG-GRO-BOY',
            right: 'WBR-YBO-RRO',
            left: 'WGY-YGB-BRR',
            top: 'OWG-WYW-OWR',
            bottom: 'GYB-GWB-OBW' 
        })

        const { cube, sequence } = cross(initialCube)
        
        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('W')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    }),
    it('works for case 6', function(){
        const initialCube = parseFaces({ 
            front: 'GYB-ROG-WRG',
            back: 'YRO-YRY-OOG',
            right: 'WWR-WYR-WYB',
            left: 'WOR-OWW-YWO',
            top: 'BBB-BGB-YBR',
            bottom: 'GGR-OBG-OGY' 
        })

        const { cube, sequence } = cross(initialCube)

        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('B')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    })
})