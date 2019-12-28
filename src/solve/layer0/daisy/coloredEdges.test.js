const { expect } = require('chai')
const { coloredEdges } = require('./coloredEdges')

const newCube = require('../../../newCube')
const { R, G, B, Y, O, W } = require('../../../constants').colors

describe('coloredEdges', function(){
    it('finds all the edges belonging to a specific color', function(){
        const cube = newCube()

        const expected = [{
            "col": 1,
            "faceName": "bottom",
            "row": 0
        },{
            "col": 0,
            "faceName": "bottom",
            "row": 1
        },{
            "col": 2,
            "faceName": "bottom",
            "row": 1
        },{
            "col": 1,
            "faceName": "bottom",
            "row": 2
        }]
// const x = coloredEdges(G, cube)
        expect(coloredEdges(G, cube)).to.deep.equal(expected)
    })
})