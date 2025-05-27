import { expect } from 'chai'
import { locateCenter } from './locateCenter'
import { newCubeFaces } from '../../newCube'
import { RED, GREEN, BLUE, YELLOW, WHITE, ORANGE } from '@/logic/constants'

describe('locateCenter', function(){
    it('gets the name of the face with the center tile of a given color', function(){
        const cube = newCubeFaces()

        expect(locateCenter(RED, cube)).to.equal('right')
        expect(locateCenter(GREEN, cube)).to.equal('bottom')
        expect(locateCenter(BLUE, cube)).to.equal('top')
        expect(locateCenter(YELLOW, cube)).to.equal('back')
        expect(locateCenter(WHITE, cube)).to.equal('front')
        expect(locateCenter(ORANGE, cube)).to.equal('left')
    })
})