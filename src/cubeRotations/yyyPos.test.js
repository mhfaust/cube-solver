const { expect } = require('chai')
const east = require('./yyyPos')
const { allUniqueTilesCube } = require('../test.utils')
const { faceClockwise, faceCounterClockwise }= require('../cubeUtils')

const bottomRotatedClockwise = faceClockwise('bottom')
const topRotatedCounterClockwise = faceCounterClockwise('top')

describe('east', () => {
    it('rotates a 3-cube right correctly', () => {
        const initial = allUniqueTilesCube()
        const transform = east(3)
        const rotatedCube = transform(initial)
        
        expect(rotatedCube.top).to.deep.equal(topRotatedCounterClockwise(initial))
        expect(rotatedCube.back).to.deep.equal(initial.right)
        expect(rotatedCube.bottom).to.deep.equal(bottomRotatedClockwise(initial))
        expect(rotatedCube.front).to.deep.equal(initial.left)
        expect(rotatedCube.left).to.deep.equal(initial.back)
        expect(rotatedCube.right).to.deep.equal(initial.front)
    })
})