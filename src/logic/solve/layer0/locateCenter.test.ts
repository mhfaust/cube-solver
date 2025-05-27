import { expect } from 'chai'
import { locateCenter } from './locateCenter'
import { newCubeFaces } from '../../newCube'
import { COLOR_A_1, COLOR_Z_2, COLOR_A_2, COLOR_A_3, COLOR_Z_3, COLOR_Z_1 } from '@/logic/constants'

describe('locateCenter', function(){
    it('gets the name of the face with the center tile of a given color', function(){
        const cube = newCubeFaces()

        expect(locateCenter(COLOR_A_1, cube)).to.equal('right')
        expect(locateCenter(COLOR_Z_2, cube)).to.equal('bottom')
        expect(locateCenter(COLOR_A_2, cube)).to.equal('top')
        expect(locateCenter(COLOR_A_3, cube)).to.equal('back')
        expect(locateCenter(COLOR_Z_3, cube)).to.equal('front')
        expect(locateCenter(COLOR_Z_1, cube)).to.equal('left')
    })
})