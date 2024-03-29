import { B, G, W, Y } from '../constants'
import newCube, { Cube, faceOf } from '../newCube'

import xPos from './xPos'
import { expect } from 'chai'

describe('xPos', () => {
    it('xPos(0)', () => {
        const cube = newCube()
        const trans = xPos(0)(cube)
        const expected: Cube = {
            front: [[B,W,W],[B,W,W],[B,W,W]],
            right: faceOf('red'),
            back: [[Y,Y,G],[Y,Y,G],[Y,Y,G]],
            left: faceOf('orange'),
            top: [[Y,B,B],[Y,B,B],[Y,B,B],],
            bottom: [[W,G,G],[W,G,G],[W,G,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('xPos(1)', () => {
        const cube = newCube()
        const trans = xPos(1)(cube)
        const expected: Cube = {
            front: [[W,B,W],[W,B,W],[W,B,W]],
            right: faceOf('red'),
            back: [[Y,G,Y],[Y,G,Y],[Y,G,Y]],
            left: faceOf('orange'),
            top: [[B,Y,B],[B,Y,B],[B,Y,B],],
            bottom: [[G,W,G],[G,W,G],[G,W,G]],
        }
        expect(trans).to.deep.equal(expected)
    })
    it('xPos(2)', () => {
        const cube = newCube()
        const trans = xPos(2)(cube)
        const expected: Cube = {
            front: [[W,W,B],[W,W,B],[W,W,B]],
            right: faceOf('red'),
            back: [[G,Y,Y],[G,Y,Y],[G,Y,Y]],
            left: faceOf('orange'),
            top: [[B,B,Y],[B,B,Y],[B,B,Y],],
            bottom: [[G,G,W],[G,G,W],[G,G,W]],
        }
        expect(trans).to.deep.equal(expected)
    })
})