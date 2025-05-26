import { expect } from 'chai'
import {
    frontFace,
    rightFace,
    backFace,
    leftFace,
    topFace,
    bottomFace
} from './cubeUtils'
import newCube from './newCube'
import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from './constants'


describe('face fns', () => {
    it('frontFace', () => {
        expect(frontFace(newCube())).to.deep.equal([
            [WHITE, WHITE, WHITE], 
            [WHITE, WHITE, WHITE], 
            [WHITE, WHITE, WHITE]
        ])
    })
    it('rightFace', () => {
        expect(rightFace(newCube())).to.deep.equal([
            [RED, RED, RED], 
            [RED, RED, RED], 
            [RED, RED, RED]
        ])
    })
    it('backFace', () => {
        expect(backFace(newCube())).to.deep.equal([
            [YELLOW, YELLOW, YELLOW], 
            [YELLOW, YELLOW, YELLOW], 
            [YELLOW, YELLOW, YELLOW]
        ])
    })
    it('leftFace', () => {
        expect(leftFace(newCube())).to.deep.equal([
            [ORANGE, ORANGE, ORANGE], 
            [ORANGE, ORANGE, ORANGE], 
            [ORANGE, ORANGE, ORANGE]
        ])
    })
    it('topFace', () => {
        expect(topFace(newCube())).to.deep.equal([
            [BLUE, BLUE, BLUE], 
            [BLUE, BLUE, BLUE], 
            [BLUE, BLUE, BLUE]
        ])
    })
    it('bottomFace', () => {
        expect(bottomFace(newCube())).to.deep.equal([
            [GREEN, GREEN, GREEN], 
            [GREEN, GREEN, GREEN], 
            [GREEN, GREEN, GREEN]
        ])
    })
})