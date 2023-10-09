import { expect } from 'chai'
import yyyPos from './yyyPos'
import { allUniqueTilesCube } from '../testUtils'
import { faceClockwise, faceCounterClockwise } from '../cubeUtils'


describe('east', () => {
    it('rotates a 3-cube right correctly', () => {
        const initial = allUniqueTilesCube()
        const rotatedCube = yyyPos(initial)
        
        expect(rotatedCube.top).to.deep.equal(faceCounterClockwise('top', initial))
        expect(rotatedCube.back).to.deep.equal(initial.right)
        expect(rotatedCube.bottom).to.deep.equal(faceClockwise('bottom', initial))
        expect(rotatedCube.front).to.deep.equal(initial.left)
        expect(rotatedCube.left).to.deep.equal(initial.back)
        expect(rotatedCube.right).to.deep.equal(initial.front)
    })
})