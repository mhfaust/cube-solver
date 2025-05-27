import { A2, Z2, COLOR_Z_1, COLOR_A_1, Z3, A3 } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { xPos } from './xPos'

describe('xPos', () => {
    it('xPos(0)', () => {
        const cube = newCubeFaces()
        const trans = xPos(0)(cube)
        const expected: CubeFaces = {
            front: [[A2,Z3,Z3],[A2,Z3,Z3],[A2,Z3,Z3]],
            right: faceOf(COLOR_A_1),
            back: [[A3,A3,Z2],[A3,A3,Z2],[A3,A3,Z2]],
            left: faceOf(COLOR_Z_1),
            top: [[A3,A2,A2],[A3,A2,A2],[A3,A2,A2],],
            bottom: [[Z3,Z2,Z2],[Z3,Z2,Z2],[Z3,Z2,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('xPos(1)', () => {
        const cube = newCubeFaces()
        const trans = xPos(1)(cube)
        const expected: CubeFaces = {
            front: [[Z3,A2,Z3],[Z3,A2,Z3],[Z3,A2,Z3]],
            right: faceOf(COLOR_A_1),
            back: [[A3,Z2,A3],[A3,Z2,A3],[A3,Z2,A3]],
            left: faceOf(COLOR_Z_1),
            top: [[A2,A3,A2],[A2,A3,A2],[A2,A3,A2],],
            bottom: [[Z2,Z3,Z2],[Z2,Z3,Z2],[Z2,Z3,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('xPos(2)', () => {
        const cube = newCubeFaces()
        const trans = xPos(2)(cube)
        const expected: CubeFaces = {
            front: [[Z3,Z3,A2],[Z3,Z3,A2],[Z3,Z3,A2]],
            right: faceOf(COLOR_A_1),
            back: [[Z2,A3,A3],[Z2,A3,A3],[Z2,A3,A3]],
            left: faceOf(COLOR_Z_1),
            top: [[A2,A2,A3],[A2,A2,A3],[A2,A2,A3],],
            bottom: [[Z2,Z2,Z3],[Z2,Z2,Z3],[Z2,Z2,Z3]],
        }
        expect(trans).to.deep.equal(expected)
    })
})