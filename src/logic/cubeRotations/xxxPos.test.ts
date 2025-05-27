import { expect } from 'chai'
import { faceClockwise, faceCounterClockwise, face180 } from '../cubeUtils'
import { newCubeFaces } from '../newCube'
import { xxxPos } from './xxxPos'

describe('xxxPos', () => {
    it('rotates a 3-cube in the x-positive direction correctly', () => {
        const initial = newCubeFaces()
        const rotated = xxxPos(initial)

        expect(rotated.top).to.deep.equal(face180('back', initial))
        expect(rotated.back).to.deep.equal(face180('bottom', initial))
        expect(rotated.bottom).to.deep.equal(initial.front)
        expect(rotated.front).to.deep.equal(initial.top)
        expect(rotated.left).to.deep.equal(faceClockwise('left', initial))
        expect(rotated.right).to.deep.equal(faceCounterClockwise('right', initial))
    })
})