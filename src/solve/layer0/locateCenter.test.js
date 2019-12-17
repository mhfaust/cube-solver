const { expect } = require('chai')
const { locateCenter } = require('./locateCenter')
const newCube = require('../../newCube')
const { R, G, B, Y, O, W } = require('../../constants').colors

describe('locateCenter', function(){
    it('gets the name of the face with the center tile of a given color', function(){
        const cube = newCube()

        expect(locateCenter(R, cube)).to.equal('right')
        expect(locateCenter(G, cube)).to.equal('bottom')
        expect(locateCenter(B, cube)).to.equal('top')
        expect(locateCenter(Y, cube)).to.equal('back')
        expect(locateCenter(W, cube)).to.equal('front')
        expect(locateCenter(O, cube)).to.equal('left')
    })
})