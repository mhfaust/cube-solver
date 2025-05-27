import { A2, Z2, Z3, A3, A1, Z1, COLOR_A_2, COLOR_Z_2 } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { yPos } from './yPos'

describe('yPos', () => {
    it('yPos(0)', () => {
        const cube = newCubeFaces()
        const trans = yPos(0)(cube)
        const expected: CubeFaces = {
            front: [[Z1,Z1,Z1],[Z3,Z3,Z3],[Z3,Z3,Z3]],
            right: [[Z3,Z3,Z3],[A1,A1,A1],[A1,A1,A1]],
            back: [[A1,A1,A1],[A3,A3,A3],[A3,A3,A3]],
            left: [[A3,A3,A3],[Z1,Z1,Z1],[Z1,Z1,Z1]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        }
        expect(trans).to.deep.equal(expected)
    })
    it('yPos(1)', () => {
        const cube = newCubeFaces()
        const trans = yPos(1)(cube)
        const expected: CubeFaces = {
            front: [[Z3,Z3,Z3],[Z1,Z1,Z1],[Z3,Z3,Z3]],
            right: [[A1,A1,A1],[Z3,Z3,Z3],[A1,A1,A1]],
            back: [[A3,A3,A3],[A1,A1,A1],[A3,A3,A3]],
            left: [[Z1,Z1,Z1],[A3,A3,A3],[Z1,Z1,Z1]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        }
        expect(trans).to.deep.equal(expected)
    })
    it('yPos(2)', () => {
        const cube = newCubeFaces()
        const trans = yPos(2)(cube)
        const expected: CubeFaces = {
            front: [[Z3,Z3,Z3],[Z3,Z3,Z3],[Z1,Z1,Z1]],
            right: [[A1,A1,A1],[A1,A1,A1],[Z3,Z3,Z3]],
            back: [[A3,A3,A3],[A3,A3,A3],[A1,A1,A1]],
            left: [[Z1,Z1,Z1],[Z1,Z1,Z1],[A3,A3,A3]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        }
        expect(trans).to.deep.equal(expected)
    })
})