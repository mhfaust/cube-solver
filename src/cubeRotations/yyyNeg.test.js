const { expect } = require('chai')
const yyyNeg = require('./yyyNeg')
const { allUniqueTilesCube } = require('../test.utils')
const { faceClockwise, faceCounterClockwise, face180 } = require('../cubeUtils')

describe('yyyNeg', () => {
    it('rotates a 3-cube right correctly', () => {
        const initial = allUniqueTilesCube(3)
        const transform = yyyNeg(3)
        const rotated = transform(initial)

        expect(rotated.top).to.deep.equal(faceClockwise('top')(initial))
        expect(rotated.back).to.deep.equal(initial.left)
        expect(rotated.bottom).to.deep.equal(faceCounterClockwise('bottom')(initial))
        expect(rotated.front).to.deep.equal(initial.right)
        expect(rotated.left).to.deep.equal(initial.front)
        expect(rotated.right).to.deep.equal(initial.back)
    })
})