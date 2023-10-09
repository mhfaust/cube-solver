import { expect } from 'chai'
import { locateCenter } from './locateCenter'
import newCube from '../../newCube'

describe('locateCenter', function(){
    it('gets the name of the face with the center tile of a given color', function(){
        const cube = newCube()

        expect(locateCenter('red', cube)).to.equal('right')
        expect(locateCenter('green', cube)).to.equal('bottom')
        expect(locateCenter('blue', cube)).to.equal('top')
        expect(locateCenter('yellow', cube)).to.equal('back')
        expect(locateCenter('white', cube)).to.equal('front')
        expect(locateCenter('orange', cube)).to.equal('left')
    })
})