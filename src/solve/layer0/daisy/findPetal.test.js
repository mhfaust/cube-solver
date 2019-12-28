const { expect } = require('chai')
const { findPetal } = require('./findPetal')
const { parseFaces } = require('../../../testUtils')


describe('findPetal', function(){

    it('finds equatorial edge', function(){
        const initialCube  = parseFaces({ 
            front: 'WOO-ROY-RRY',
            right: 'BBB-GGG-GGG',
            back: 'RRY-WRO-WOO',
            left: 'GGG-BBB-BBB',
            top: 'OWY-OWY-OWY',
            bottom: 'RRR-WYR-WYR' 
          })

          const edge = findPetal(initialCube)

          expect(edge).to.deep.equal({
              face: 'front',
              row: 1,
              col: 2,
          })
    })

    it('finds a bottom edge', function(){
        const initialCube =  parseFaces({
            front: 'RRR-ROR-GGY',
            back: 'BBR-WRO-OOO',
            right: 'BOO-BGR-RGY',
            left: 'GGG-BBG-BBW',
            top: 'YYY-YWW-WYW',
            bottom: 'OOB-WYW-WYG',
        })
        const edge = findPetal(initialCube)

        expect(edge).to.deep.equal({
            face: 'bottom',
            row: 2,
            col: 1,
        })

    })
})


