import { B, G, R, O, WHITE, YELLOW } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { zPos } from './zPos'

describe('zPos', () => {
    it('zPos(0)', () => {
        const cube = newCubeFaces()
        const trans = zPos(0)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[B,R,R],[B,R,R],[B,R,R]],
            back: faceOf(YELLOW),
            left: [[O,O,G],[O,O,G],[O,O,G]],
            top: [[B,B,B],[B,B,B],[O,O,O]],
            bottom: [[R,R,R],[G,G,G],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(1)', () => {
        const cube = newCubeFaces()
        const trans = zPos(1)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[R,B,R],[R,B,R],[R,B,R]],
            back: faceOf(YELLOW),
            left: [[O,G,O],[O,G,O],[O,G,O]],
            top: [[B,B,B],[O,O,O],[B,B,B]],
            bottom: [[G,G,G],[R,R,R],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(2)', () => {
        const cube = newCubeFaces()
        const trans = zPos(2)(cube)
        const expected: CubeFaces = {
            front: faceOf(WHITE),
            right: [[R,R,B],[R,R,B],[R,R,B]],
            back: faceOf(YELLOW),
            left: [[G,O,O],[G,O,O],[G,O,O]],
            top: [[O,O,O],[B,B,B],[B,B,B]],
            bottom: [[G,G,G],[G,G,G],[R,R,R]],
        }
        expect(trans).to.deep.equal(expected)
    })
})