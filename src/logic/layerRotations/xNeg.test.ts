import { B, G, W, Y } from '../constants'
import newCube, { faceOf } from '../newCube'

import xNeg from './xNeg'
import { expect } from 'chai'

describe('xNeg', () => {
    it('xNeg(0)', () => {
        const cube = newCube()
        const trans = xNeg(0)(cube)
        expect(trans).to.deep.equal({
            front: [[G,W,W],[G,W,W],[G,W,W]],
            right: faceOf('red'),
            back: [[Y,Y,B],[Y,Y,B],[Y,Y,B]],
            left: faceOf('orange'),
            top: [[W,B,B],[W,B,B],[W,B,B],],
            bottom: [[Y,G,G],[Y,G,G],[Y,G,G]],
        })
    })
    it('xNeg(1)', () => {
        const cube = newCube()
        const trans = xNeg(1)(cube)
        expect(trans).to.deep.equal({
            front: [[W,G,W],[W,G,W],[W,G,W]],
            right: faceOf('red'),
            back: [[Y,B,Y],[Y,B,Y],[Y,B,Y]],
            left: faceOf('orange'),
            top: [[B,W,B],[B,W,B],[B,W,B],],
            bottom: [[G,Y,G],[G,Y,G],[G,Y,G]],
        })
    })
    it('xNeg(2)', () => {
        const cube = newCube()
        const trans = xNeg(2)(cube)
        expect(trans).to.deep.equal({
            front: [[W,W,G],[W,W,G],[W,W,G]],
            right: faceOf('red'),
            back: [[B,Y,Y],[B,Y,Y],[B,Y,Y]],
            left: faceOf('orange'),
            top: [[B,B,W],[B,B,W],[B,B,W],],
            bottom: [[G,G,Y],[G,G,Y],[G,G,Y]],
        })
    })
})