import { B, G, W, Y, R, O } from '../constants'
import { CubeFaces, faceOf, newCubeFaces } from '../newCube'
import { expect } from 'chai'
import { yPos } from './yPos'

describe('yPos', () => {
    it('yPos(0)', () => {
        const cube = newCubeFaces()
        const trans = yPos(0)(cube)
        const expected: CubeFaces = {
            front: [[O,O,O],[W,W,W],[W,W,W]],
            right: [[W,W,W],[R,R,R],[R,R,R]],
            back: [[R,R,R],[Y,Y,Y],[Y,Y,Y]],
            left: [[Y,Y,Y],[O,O,O],[O,O,O]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        }
        expect(trans).to.deep.equal(expected)
    })
    it('yPos(1)', () => {
        const cube = newCubeFaces()
        const trans = yPos(1)(cube)
        const expected: CubeFaces = {
            front: [[W,W,W],[O,O,O],[W,W,W]],
            right: [[R,R,R],[W,W,W],[R,R,R]],
            back: [[Y,Y,Y],[R,R,R],[Y,Y,Y]],
            left: [[O,O,O],[Y,Y,Y],[O,O,O]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        }
        expect(trans).to.deep.equal(expected)
    })
    it('yPos(2)', () => {
        const cube = newCubeFaces()
        const trans = yPos(2)(cube)
        const expected: CubeFaces = {
            front: [[W,W,W],[W,W,W],[O,O,O]],
            right: [[R,R,R],[R,R,R],[W,W,W]],
            back: [[Y,Y,Y],[Y,Y,Y],[R,R,R]],
            left: [[O,O,O],[O,O,O],[Y,Y,Y]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        }
        expect(trans).to.deep.equal(expected)
    })
})