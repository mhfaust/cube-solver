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
import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from './constants'


describe('face fns', () => {
    it('frontFace', () => {
        expect(frontFace(newCubeFaces())).to.deep.equal([
            [WHITE, WHITE, WHITE], 
            [WHITE, WHITE, WHITE], 
            [WHITE, WHITE, WHITE]
        ])
    })
    it('rightFace', () => {
        expect(rightFace(newCubeFaces())).to.deep.equal([
            [RED, RED, RED], 
            [RED, RED, RED], 
            [RED, RED, RED]
        ])
    })
    it('backFace', () => {
        expect(backFace(newCubeFaces())).to.deep.equal([
            [YELLOW, YELLOW, YELLOW], 
            [YELLOW, YELLOW, YELLOW], 
            [YELLOW, YELLOW, YELLOW]
        ])
    })
    it('leftFace', () => {
        expect(leftFace(newCubeFaces())).to.deep.equal([
            [ORANGE, ORANGE, ORANGE], 
            [ORANGE, ORANGE, ORANGE], 
            [ORANGE, ORANGE, ORANGE]
        ])
    })
    it('topFace', () => {
        expect(topFace(newCubeFaces())).to.deep.equal([
            [BLUE, BLUE, BLUE], 
            [BLUE, BLUE, BLUE], 
            [BLUE, BLUE, BLUE]
        ])
    })
    it('bottomFace', () => {
        expect(bottomFace(newCubeFaces())).to.deep.equal([
            [GREEN, GREEN, GREEN], 
            [GREEN, GREEN, GREEN], 
            [GREEN, GREEN, GREEN]
        ])
    })
})