const { expect } = require('chai')
const tighten = require('./tighten')
const { allUniqueTilesCube } = require('../test.utils')
const { faceClockwise, faceCounterClockwise, face180 } = require('../cubeUtils')

describe('tighten', () => {
    it('rotates a 3-cube in/clockwise correctly', () => {
        const initial = allUniqueTilesCube(3)
        const transform = tighten(3)
        const rotated = transform(initial)

        expect(rotated.top).to.deep.equal(faceClockwise('left')(initial))
        expect(rotated.back).to.deep.equal(faceCounterClockwise('back')(initial))
        expect(rotated.bottom).to.deep.equal(faceClockwise('right')(initial))
        expect(rotated.front).to.deep.equal(faceClockwise('front')(initial))
        expect(rotated.left).to.deep.equal(faceClockwise('bottom')(initial))
        expect(rotated.right).to.deep.equal(faceClockwise('top')(initial))
    })
})