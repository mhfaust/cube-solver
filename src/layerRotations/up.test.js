const { pipe } = require('ramda')
const newCube = require('../newCube')
const printCube = require('../console/printCube')
const { U, Ui, U2, R, Ri, L, Li, F, Fi, B, Bi, M, Mi, S, Si } = require('../layerRotations/advancedNotation')
const { down, up, left, right, clockwise, counterWise } = require('./index')
const { identity } = require('../cubeUtils')

const { north, east } = require('../cubeRotations')
const 

superFlip = [
    Mi, U, Mi, U, Mi, U, Mi, U,
    north(3), east(3),
    Mi, U, Mi, U, Mi, U, Mi, U,
    north(3), east(3),
    Mi, U, Mi, U, Mi, U, Mi, U,
]


const step4 = [F, R, U, Ri, Ui, Fi]
const step5 = [Ri, U, U, R, U, Ri, U, R, U]
const step6 = [Ri, F, Ri, B, B, R, Fi, Ri, B, B, R, R]
const step7 = [R, Ui, R, U, R, U, R, Ui, Ri, Ui, R, R]

describe('up', () => {
    it('rotates the front right face up correctly', () => {
        const cube = newCube(3)
        const transform = pipe(...superFlip, ...superFlip)

        // const next = transform(cube)
        // console.log(printCube(next)) 
        
    })
})