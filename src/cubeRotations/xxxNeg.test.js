const { expect } = require('chai')
const xxxNeg = require('./xxxNeg')
const { allUniqueTilesCube } = require('../test.utils')
const { faceClockwise, faceCounterClockwise, face180 } = require('../cubeUtils')
const newCube = require('../newCube')

describe('xxxNeg', () => {
    it('rotates a 3-cube up correctly', () => {
        const initial = allUniqueTilesCube(3)
        const transform = xxxNeg(3)
        const rotated = transform(initial)

        expect(rotated.top).to.deep.equal(initial.front)
        expect(rotated.back).to.deep.equal(face180('top')(initial))
        expect(rotated.bottom).to.deep.equal(face180('back')(initial))
        expect(rotated.front).to.deep.equal(initial.bottom)
        expect(rotated.left).to.deep.equal(faceCounterClockwise('left')(initial))
        expect(rotated.right).to.deep.equal(faceClockwise('right')(initial))
    })
})