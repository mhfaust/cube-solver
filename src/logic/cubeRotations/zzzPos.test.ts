import { expect } from 'chai'
import zzzPos from './zzzPos'
import { allUniqueTilesCube } from '../testUtils'
import { faceClockwise, faceCounterClockwise } from '../cubeUtils'

describe('zzzPos', () => {
    it('rotates a 3-cube positive on the z-axis correctly', () => {
        const initial = allUniqueTilesCube()
        const rotated = zzzPos(initial)

        expect(rotated.top).to.deep.equal(faceClockwise('left', initial))
        expect(rotated.back).to.deep.equal(faceCounterClockwise('back', initial))
        expect(rotated.bottom).to.deep.equal(faceClockwise('right', initial))
        expect(rotated.front).to.deep.equal(faceClockwise('front', initial))
        expect(rotated.left).to.deep.equal(faceClockwise('bottom', initial))
        expect(rotated.right).to.deep.equal(faceClockwise('top', initial))
    })
})