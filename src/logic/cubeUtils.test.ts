import { expect } from 'chai'
import {
    frontFace,
    rightFace,
    backFace,
    leftFace,
    topFace,
    bottomFace
} from './cubeUtils'
import { newCubeFaces } from './newCube'
import { COLOR_A_2, COLOR_Z_2, COLOR_Z_1, COLOR_A_1, COLOR_Z_3, COLOR_A_3 } from './constants'


describe('face fns', () => {
    it('frontFace', () => {
        expect(frontFace(newCubeFaces())).to.deep.equal([
            [COLOR_Z_3, COLOR_Z_3, COLOR_Z_3], 
            [COLOR_Z_3, COLOR_Z_3, COLOR_Z_3], 
            [COLOR_Z_3, COLOR_Z_3, COLOR_Z_3]
        ])
    })
    it('rightFace', () => {
        expect(rightFace(newCubeFaces())).to.deep.equal([
            [COLOR_A_1, COLOR_A_1, COLOR_A_1], 
            [COLOR_A_1, COLOR_A_1, COLOR_A_1], 
            [COLOR_A_1, COLOR_A_1, COLOR_A_1]
        ])
    })
    it('backFace', () => {
        expect(backFace(newCubeFaces())).to.deep.equal([
            [COLOR_A_3, COLOR_A_3, COLOR_A_3], 
            [COLOR_A_3, COLOR_A_3, COLOR_A_3], 
            [COLOR_A_3, COLOR_A_3, COLOR_A_3]
        ])
    })
    it('leftFace', () => {
        expect(leftFace(newCubeFaces())).to.deep.equal([
            [COLOR_Z_1, COLOR_Z_1, COLOR_Z_1], 
            [COLOR_Z_1, COLOR_Z_1, COLOR_Z_1], 
            [COLOR_Z_1, COLOR_Z_1, COLOR_Z_1]
        ])
    })
    it('topFace', () => {
        expect(topFace(newCubeFaces())).to.deep.equal([
            [COLOR_A_2, COLOR_A_2, COLOR_A_2], 
            [COLOR_A_2, COLOR_A_2, COLOR_A_2], 
            [COLOR_A_2, COLOR_A_2, COLOR_A_2]
        ])
    })
    it('bottomFace', () => {
        expect(bottomFace(newCubeFaces())).to.deep.equal([
            [COLOR_Z_2, COLOR_Z_2, COLOR_Z_2], 
            [COLOR_Z_2, COLOR_Z_2, COLOR_Z_2], 
            [COLOR_Z_2, COLOR_Z_2, COLOR_Z_2]
        ])
    })
})