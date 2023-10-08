import { expect } from 'chai'
import yyyNeg from './yyyNeg'
import { allUniqueTilesCube } from '../testUtils'
import { faceClockwise, faceCounterClockwise, face180 } from '../cubeUtils'

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