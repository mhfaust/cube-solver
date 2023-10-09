import { expect } from 'chai'
import xxxNeg from './xxxNeg'
import { allUniqueTilesCube } from '../testUtils'
import { faceClockwise, faceCounterClockwise, face180 } from '../cubeUtils'

describe('xxxNeg', () => {
    it('rotates a 3-cube up correctly', () => {
        const initial = allUniqueTilesCube()
        const rotated = xxxNeg(initial)

        expect(rotated.top).to.deep.equal(initial.front)
        expect(rotated.back).to.deep.equal(face180('top', initial))
        expect(rotated.bottom).to.deep.equal(face180('back', initial))
        expect(rotated.front).to.deep.equal(initial.bottom)
        expect(rotated.left).to.deep.equal(faceCounterClockwise('left', initial))
        expect(rotated.right).to.deep.equal(faceClockwise('right', initial))
    })
})