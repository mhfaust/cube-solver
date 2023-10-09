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


describe('face fns', () => {
    it('frontFace', () => {
        expect(frontFace(newCube())).to.deep.equal([
            ['white', 'white', 'white'], 
            ['white', 'white', 'white'], 
            ['white', 'white', 'white']
        ])
    })
    it('rightFace', () => {
        expect(rightFace(newCube())).to.deep.equal([
            ['red', 'red', 'red'], 
            ['red', 'red', 'red'], 
            ['red', 'red', 'red']
        ])
    })
    it('backFace', () => {
        expect(backFace(newCube())).to.deep.equal([
            ['yellow', 'yellow', 'yellow'], 
            ['yellow', 'yellow', 'yellow'], 
            ['yellow', 'yellow', 'yellow']
        ])
    })
    it('leftFace', () => {
        expect(leftFace(newCube())).to.deep.equal([
            ['orange', 'orange', 'orange'], 
            ['orange', 'orange', 'orange'], 
            ['orange', 'orange', 'orange']
        ])
    })
    it('topFace', () => {
        expect(topFace(newCube())).to.deep.equal([
            ['blue', 'blue', 'blue'], 
            ['blue', 'blue', 'blue'], 
            ['blue', 'blue', 'blue']
        ])
    })
    it('bottomFace', () => {
        expect(bottomFace(newCube())).to.deep.equal([
            ['green', 'green', 'green'], 
            ['green', 'green', 'green'], 
            ['green', 'green', 'green']
        ])
    })
})