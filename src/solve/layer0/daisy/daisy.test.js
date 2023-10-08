import { expect } from 'chai'
import { daisy } from './daisy'
import { parseFaces } from '../../../testUtils'

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

        const { sequence, cube } = daisy(initialCube)

        expect(cube.top[0][1]).to.equal('Y')
        expect(cube.top[1][0]).to.equal('Y')
        expect(cube.top[1][2]).to.equal('Y')
        expect(cube.top[2][1]).to.equal('Y')
    })

    it('works for case 2', function(){
        const initialCube = parseFaces({
            front: 'OWG-RYR-RGY',
            right: 'YBW-BGR-OOR',
            back: 'BGB-GWB-GBW',
            left: 'YYW-WBW-BWY',
            top: 'OYO-ROY-GOR',
            bottom: 'BOG-GRY-ROW',            
        })
        const { sequence, cube } = daisy(initialCube)

        expect(cube.top[0][1]).to.equal('R')
        expect(cube.top[1][0]).to.equal('R')
        expect(cube.top[1][2]).to.equal('R')
        expect(cube.top[2][1]).to.equal('R')
    })

    it('works for case 3', function(){
        const initialCube = parseFaces({
            front: 'YRR-BBB-GGY',
            right: 'GBW-YWR-RWG',
            back: 'OOW-GGW-YYW',
            left: 'BYB-OYR-BWR',
            top: 'OGG-GRO-OYY',
            bottom: 'WWB-BOR-ROO',            
        })
        const { sequence, cube } = daisy(initialCube)

        expect(cube.top[0][1]).to.equal('O')
        expect(cube.top[1][0]).to.equal('O')
        expect(cube.top[1][2]).to.equal('O')
        expect(cube.top[2][1]).to.equal('O')
    })

    it('works for case 4', function(){
        const initialCube = parseFaces({
            front: 'WWW-WWW-WWW',
            right: 'RRR-RRR-RRR',
            back: 'YYY-YYY-YYY',
            left: 'OOO-OOO-OOO',
            top: 'BBB-BBB-BBB',
            bottom: 'GGG-GGG-GGG',
        })

        const { sequence, cube } = daisy(initialCube)
        
        expect(cube.top[0][1]).to.equal('G')
        expect(cube.top[1][0]).to.equal('G')
        expect(cube.top[1][2]).to.equal('G')
        expect(cube.top[2][1]).to.equal('G')
    })

    it('works for case 5', function(){
        const initialCube = parseFaces({
            front: 'GBR-GOW-ORY',
            right: 'YWR-RBO-GRO',
            back: 'BWO-GRO-BWG',
            left: 'GYW-BGR-YYB',
            top: 'WGW-GYB-RYB',
            bottom: 'YYR-OWB-OOW',            
        })

        const { sequence, cube } = daisy(initialCube)
        
        expect(cube.top[0][1]).to.equal('W')
        expect(cube.top[1][0]).to.equal('W')
        expect(cube.top[1][2]).to.equal('W')
        expect(cube.top[2][1]).to.equal('W')
    })

    it('works for case 6', function(){
        const initialCube = parseFaces({
            front: 'GOR-OOR-BBY',
            right: 'GBR-GYY-RWW',
            back: 'BRY-GRO-ROW',
            left: 'GWO-YWW-ORY',
            top: 'OYW-RGW-WBY',
            bottom: 'OYB-BBG-BGG', 
        })

        const { sequence, cube } = daisy(initialCube)
        
        expect(cube.top[0][1]).to.equal('B')
        expect(cube.top[1][0]).to.equal('B')
        expect(cube.top[1][2]).to.equal('B')
        expect(cube.top[2][1]).to.equal('B')
    })
})