import { B, G, ORANGE, RED, W, Y } from '../constants'
import { newCubeFaces, faceOf } from '../newCube'

import { xNeg } from './xNeg'
import { expect } from 'chai'

describe('xNeg', () => {
    it('xNeg(0)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(0)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[G,W,W],[G,W,W],[G,W,W]],
            right: faceOf(RED),
            back: [[Y,Y,B],[Y,Y,B],[Y,Y,B]],
            left: faceOf(ORANGE),
            top: [[W,B,B],[W,B,B],[W,B,B],],
            bottom: [[Y,G,G],[Y,G,G],[Y,G,G]],
        })
    })
    it('xNeg(1)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(1)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[W,G,W],[W,G,W],[W,G,W]],
            right: faceOf(RED),
            back: [[Y,B,Y],[Y,B,Y],[Y,B,Y]],
            left: faceOf(ORANGE),
            top: [[B,W,B],[B,W,B],[B,W,B],],
            bottom: [[G,Y,G],[G,Y,G],[G,Y,G]],
        })
    })
    it('xNeg(2)', () => {
        const cubeFaces = newCubeFaces()
        const trans = xNeg(2)(cubeFaces)
        expect(trans).to.deep.equal({
            front: [[W,W,G],[W,W,G],[W,W,G]],
            right: faceOf(RED),
            back: [[B,Y,Y],[B,Y,Y],[B,Y,Y]],
            left: faceOf(ORANGE),
            top: [[B,B,W],[B,B,W],[B,B,W],],
            bottom: [[G,G,Y],[G,G,Y],[G,G,Y]],
        })
    })
})