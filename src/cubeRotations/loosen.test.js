const { expect } = require('chai')
const loosen = require('./loosen')
const { allUniqueTilesCube } = require('../test.utils')
const { faceClockwise, faceCounterClockwise } = require('../cubeUtils')

describe('loosen', () => {
    it('rotates a 3-cube out/counter-clockwise correctly', () => {
        const initial = allUniqueTilesCube(3)
        const transform = loosen(3)
        const rotated = transform(initial)

        expect(rotated.top).to.deep.equal(faceCounterClockwise('right')(initial))
        expect(rotated.back).to.deep.equal(faceClockwise('back')(initial))
        expect(rotated.bottom).to.deep.equal(faceCounterClockwise('left')(initial))
        expect(rotated.front).to.deep.equal(faceCounterClockwise('front')(initial))
        expect(rotated.left).to.deep.equal(faceCounterClockwise('top')(initial))
        expect(rotated.right).to.deep.equal(faceCounterClockwise('bottom')(initial))
    })
})