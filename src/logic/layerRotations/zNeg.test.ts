import { B, G, R, O, Y, WHITE, YELLOW } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { zNeg } from './zNeg'

describe('zNeg', () => {
    it('zNeg(0)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(0)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[G,R,R],[G,R,R],[G,R,R]],
            back: faceOf(YELLOW),
            left: [[O,O,B],[O,O,B],[O,O,B]],
            top: [[B,B,B],[B,B,B],[R,R,R]],
            bottom: [[O,O,O],[G,G,G],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(1)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(1)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[R,G,R],[R,G,R],[R,G,R]],
            back: faceOf(YELLOW),
            left: [[O,B,O],[O,B,O],[O,B,O]],
            top: [[B,B,B],[R,R,R],[B,B,B]],
            bottom: [[G,G,G],[O,O,O],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(2)', () => {
        const cube = newCubeFaces()
        const trans = zNeg(2)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[R,R,G],[R,R,G],[R,R,G]],
            back: faceOf(YELLOW),
            left: [[B,O,O],[B,O,O],[B,O,O]],
            top: [[R,R,R],[B,B,B],[B,B,B]],
            bottom: [[G,G,G],[G,G,G],[O,O,O]],
        }
        expect(trans).to.deep.equal(expected)
    })
})