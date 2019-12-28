const { expect } = require('chai')
const { solve } = require('./solve')
const { parseFaces } = require('./../testUtils')

const { crossTiles, crossEnds } = require('../cubeUtils')
const { equatorFaces } = require('../constants')

describe('daisy', function(){

    it('works for case 1', function(){
        const initialCube = parseFaces({
            front: 'WOO-ROY-RRY',
            right: 'BBB-GGG-GGG',
            back: 'RRY-WRO-WOO',
            left: 'GGG-BBB-BBB',
            top: 'OWY-OWY-OWY',
            bottom: 'WYR-WYR-WYR',
        })

        const { sequence, cube } = solve(initialCube)

        console.log(initialCube)

        crossTiles(cube.bottom).every(
            tile => expect(tile).to.equal('Y')
        )
        equatorFaces.every(
            faceName => expect(cube[faceName][1][1]).to.equal(cube[faceName][2][1])
        )
    })

})