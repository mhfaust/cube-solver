import printCube from '../console/printCube'
import { B, G, W, Y, R, O } from '../constants'
import newCube, { CubeFaces, faceOf } from '../newCube'

import yNeg from './yNeg'
import { expect } from 'chai'

describe('yNeg', () => {
    it('yNeg(0)', () => {
        const cube = newCube()
        const trans = yNeg(0)(cube)
        const expected: CubeFaces = {
            front: [[R,R,R],[W,W,W],[W,W,W]],
            right: [[Y,Y,Y],[R,R,R],[R,R,R]],
            back: [[O,O,O],[Y,Y,Y],[Y,Y,Y]],
            left: [[W,W,W],[O,O,O],[O,O,O]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        }
        expect(trans, `\n${printCube(trans)}`).to.deep.equal(expected)
    })
    it('yNeg(1)', () => {
        const cube = newCube()
        const trans = yNeg(1)(cube)
        expect(trans).to.deep.equal({
            front: [[W,W,W],[R,R,R],[W,W,W]],
            right: [[R,R,R],[Y,Y,Y],[R,R,R]],
            back: [[Y,Y,Y],[O,O,O],[Y,Y,Y]],
            left: [[O,O,O],[W,W,W],[O,O,O]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        })
    })
    it('yNeg(2)', () => {
        const cube = newCube()
        const trans = yNeg(2)(cube)
        expect(trans).to.deep.equal({
            front: [[W,W,W],[W,W,W],[R,R,R]],
            right: [[R,R,R],[R,R,R],[Y,Y,Y]],
            back: [[Y,Y,Y],[Y,Y,Y],[O,O,O]],
            left: [[O,O,O],[O,O,O],[W,W,W]],
            top: faceOf('blue'),
            bottom: faceOf('green'),
        })
    })
})