const { expect } = require('chai')
const { promoteBottomEdge } = require('./promoteBottomEdge')
const { parseFaces } = require('../../../parseFaces')

describe('promoteBottomEdge', function(){

    it('promotes a "petal" from the bottom face up to the top without dispaling another petal', function(){

        const initialCube = parseFaces({
            front: 'WOY-RRB-WRY',
            right: 'GWG-YYW-ROG',
            back: 'RRY-BOO-OWY',
            left: 'RYO-BWY-BWR',
            top: 'GBW-GBG-BGO',
            bottom: 'BGB-OGY-ORW',
        })

        const expectedResultCube = parseFaces({
            front: 'YRW-BRR-YRR',
            right: 'RYO-YYW-GOG',
            back: 'WOY-BOO-OWY',
            left: 'GWR-BWY-BWR',
            top: 'OGB-GBG-BGB',
            bottom: 'GBW-OGY-ORW',
        })

        const { cube, sequence } = promoteBottomEdge(initialCube, { row: 0, col: 1 })

        expect(cube).to.deep.equal(expectedResultCube)
        expect(sequence).to.deep.equal(['up', 'up', 'front2'])

    })
})