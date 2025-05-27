import { B, G, R, O } from '../constants'
import newCube, { CubeFaces, faceOf } from '../newCube'

import zPos from './zPos'
import { expect } from 'chai'

describe('zPos', () => {
    it('zPos(0)', () => {
        const cube = newCube()
        const trans = zPos(0)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[B,R,R],[B,R,R],[B,R,R]],
            back: faceOf('yellow'),
            left: [[O,O,G],[O,O,G],[O,O,G]],
            top: [[B,B,B],[B,B,B],[O,O,O]],
            bottom: [[R,R,R],[G,G,G],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(1)', () => {
        const cube = newCube()
        const trans = zPos(1)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[R,B,R],[R,B,R],[R,B,R]],
            back: faceOf('yellow'),
            left: [[O,G,O],[O,G,O],[O,G,O]],
            top: [[B,B,B],[O,O,O],[B,B,B]],
            bottom: [[G,G,G],[R,R,R],[G,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('zPos(2)', () => {
        const cube = newCube()
        const trans = zPos(2)(cube)
        const expected: CubeFaces = {
            front: faceOf('white'),
            right: [[R,R,B],[R,R,B],[R,R,B]],
            back: faceOf('yellow'),
            left: [[G,O,O],[G,O,O],[G,O,O]],
            top: [[O,O,O],[B,B,B],[B,B,B]],
            bottom: [[G,G,G],[G,G,G],[R,R,R]],
        }
        expect(trans).to.deep.equal(expected)
    })
})