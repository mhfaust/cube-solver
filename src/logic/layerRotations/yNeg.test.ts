import { printCube } from '../console/printCube'
import { A2, Z2, Z3, A3, A1, Z1, COLOR_A_2, COLOR_Z_2 } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'

import { expect } from 'chai'
import { yNeg } from './yNeg'

describe('yNeg', () => {
    it('yNeg(0)', () => {
        const cube = newCubeFaces()
        const trans = yNeg(0)(cube)
        const expected: CubeFaces = {
            front: [[A1,A1,A1],[Z3,Z3,Z3],[Z3,Z3,Z3]],
            right: [[A3,A3,A3],[A1,A1,A1],[A1,A1,A1]],
            back: [[Z1,Z1,Z1],[A3,A3,A3],[A3,A3,A3]],
            left: [[Z3,Z3,Z3],[Z1,Z1,Z1],[Z1,Z1,Z1]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        }
        expect(trans, `\n${printCube(trans)}`).to.deep.equal(expected)
    })
    it('yNeg(1)', () => {
        const cube = newCubeFaces()
        const trans = yNeg(1)(cube)
        expect(trans).to.deep.equal({
            front: [[Z3,Z3,Z3],[A1,A1,A1],[Z3,Z3,Z3]],
            right: [[A1,A1,A1],[A3,A3,A3],[A1,A1,A1]],
            back: [[A3,A3,A3],[Z1,Z1,Z1],[A3,A3,A3]],
            left: [[Z1,Z1,Z1],[Z3,Z3,Z3],[Z1,Z1,Z1]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        })
    })
    it('yNeg(2)', () => {
        const cube = newCubeFaces()
        const trans = yNeg(2)(cube)
        expect(trans).to.deep.equal({
            front: [[Z3,Z3,Z3],[Z3,Z3,Z3],[A1,A1,A1]],
            right: [[A1,A1,A1],[A1,A1,A1],[A3,A3,A3]],
            back: [[A3,A3,A3],[A3,A3,A3],[Z1,Z1,Z1]],
            left: [[Z1,Z1,Z1],[Z1,Z1,Z1],[Z3,Z3,Z3]],
            top: faceOf(COLOR_A_2),
            bottom: faceOf(COLOR_Z_2),
        })
    })
})