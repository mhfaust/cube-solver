import { expect } from 'chai'
import zzzNeg from './zzzNeg'
import { allUniqueTilesCube } from '../testUtils'
import { faceClockwise, faceCounterClockwise } from '../cubeUtils'

describe('zzzNeg', () => {
    it('rotates a 3-cube negatively on the z-axis correctly', () => {
        const initial = allUniqueTilesCube()
        const rotated = zzzNeg(initial)

        expect(rotated.top).to.deep.equal(faceCounterClockwise('right', initial))
        expect(rotated.back).to.deep.equal(faceClockwise('back', initial))
        expect(rotated.bottom).to.deep.equal(faceCounterClockwise('left', initial))
        expect(rotated.front).to.deep.equal(faceCounterClockwise('front', initial))
        expect(rotated.left).to.deep.equal(faceCounterClockwise('top', initial))
        expect(rotated.right).to.deep.equal(faceCounterClockwise('bottom', initial))
    })
})