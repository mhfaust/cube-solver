const { expect } = require('chai')
const { promoteEquatorialEdge } = require('./promoteEquatorialEdge')
const { parseFaces } = require('../../../parseFaces')

describe('promoteEquatorialEdge', function(){

    it('promotes a "petal" from a side "equatorial" edge up to the top without dispaling another petal', function(){

        const initialCube = parseFaces({
            front: 'WOO-ROY-RRY',
            right: 'BBB-GGG-GGG',
            back: 'RRY-WRO-WOO',
            left: 'GGG-BBB-BBB',
            top: 'OWY-OWY-OWY',
            bottom: 'WYR-WYR-WYR',
        })

        const expectedResultCube = parseFaces({
            front: 'BBR-ROR-RRR',
            right: 'GGR-GGR-GGY',
            back: 'YGG-WRO-OOO',
            left: 'WOO-BBB-BBB',
            top: 'OOB-WWY-YYY',
            bottom: 'WYW-WYW-WYG',
        })

        // const sequenceBuilder = newSequenceBuilder(initialCube)

        const { cube, sequence } = promoteEquatorialEdge(initialCube, { face: 'front', col: 2 })

        expect(cube).to.deep.equal(expectedResultCube)
        expect(sequence).to.deep.equal(['up', 'right'])

    })
})