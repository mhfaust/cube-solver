import { B, G, R, O, Y } from '../constants'
import newCube, { CubeFaces, faceOf } from '../newCube'

import zNeg from './zNeg'
import { expect } from 'chai'

describe('zNeg', () => {
    it('zNeg(0)', () => {
        const cube = newCube()
        const trans = zNeg(0)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[G,R,R],[G,R,R],[G,R,R]],
            back: faceOf('yellow'),
            left: [[O,O,B],[O,O,B],[O,O,B]],
            top: [[B,B,B],[B,B,B],[R,R,R]],
            bottom: [[O,O,O],[G,G,G],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(1)', () => {
        const cube = newCube()
        const trans = zNeg(1)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[R,G,R],[R,G,R],[R,G,R]],
            back: faceOf('yellow'),
            left: [[O,B,O],[O,B,O],[O,B,O]],
            top: [[B,B,B],[R,R,R],[B,B,B]],
            bottom: [[G,G,G],[O,O,O],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zNeg(2)', () => {
        const cube = newCube()
        const trans = zNeg(2)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[R,R,G],[R,R,G],[R,R,G]],
            back: faceOf('yellow'),
            left: [[B,O,O],[B,O,O],[B,O,O]],
            top: [[R,R,R],[B,B,B],[B,B,B]],
            bottom: [[G,G,G],[G,G,G],[O,O,O]],
        }
        expect(trans).to.deep.equal(expected)
    })
})