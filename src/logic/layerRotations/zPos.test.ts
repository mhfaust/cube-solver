import { A2, Z2, A1, Z1, COLOR_Z_3, COLOR_A_3 } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { zPos } from './zPos'

describe('zPos', () => {
    it('zPos(0)', () => {
        const cube = newCubeFaces()
        const trans = zPos(0)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[A2,A1,A1],[A2,A1,A1],[A2,A1,A1]],
            back: faceOf(COLOR_A_3),
            left: [[Z1,Z1,Z2],[Z1,Z1,Z2],[Z1,Z1,Z2]],
            top: [[A2,A2,A2],[A2,A2,A2],[Z1,Z1,Z1]],
            bottom: [[A1,A1,A1],[Z2,Z2,Z2],[Z2,Z2,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(1)', () => {
        const cube = newCubeFaces()
        const trans = zPos(1)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[A1,A2,A1],[A1,A2,A1],[A1,A2,A1]],
            back: faceOf(COLOR_A_3),
            left: [[Z1,Z2,Z1],[Z1,Z2,Z1],[Z1,Z2,Z1]],
            top: [[A2,A2,A2],[Z1,Z1,Z1],[A2,A2,A2]],
            bottom: [[Z2,Z2,Z2],[A1,A1,A1],[Z2,Z2,Z2]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(2)', () => {
        const cube = newCubeFaces()
        const trans = zPos(2)(cube)
        const expected: CubeFaces = {
            front: faceOf(COLOR_Z_3),
            right: [[A1,A1,A2],[A1,A1,A2],[A1,A1,A2]],
            back: faceOf(COLOR_A_3),
            left: [[Z2,Z1,Z1],[Z2,Z1,Z1],[Z2,Z1,Z1]],
            top: [[Z1,Z1,Z1],[A2,A2,A2],[A2,A2,A2]],
            bottom: [[Z2,Z2,Z2],[Z2,Z2,Z2],[A1,A1,A1]],
        }
        expect(trans).to.deep.equal(expected)
    })
})