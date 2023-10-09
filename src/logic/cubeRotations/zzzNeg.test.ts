import { expect } from 'chai'
import zzzNeg from './zzzNeg'
import { faceClockwise, faceCounterClockwise } from '../cubeUtils'
import newCube from '../newCube'

describe('zzzNeg', () => {
    it('rotates a 3-cube negatively on the z-axis correctly', () => {
        const initial = newCube()
        const rotated = zzzNeg(initial)

        expect(rotated.top).to.deep.equal(faceCounterClockwise('right', initial))
        expect(rotated.back).to.deep.equal(faceClockwise('back', initial))
        expect(rotated.bottom).to.deep.equal(faceCounterClockwise('left', initial))
        expect(rotated.front).to.deep.equal(faceCounterClockwise('front', initial))
        expect(rotated.left).to.deep.equal(faceCounterClockwise('top', initial))
        expect(rotated.right).to.deep.equal(faceCounterClockwise('bottom', initial))
    })
})