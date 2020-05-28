const { newSequenceBuilder } = require('../../sequenceBuilder')
const { equatorFaces } = require('../../../constants')
const { crossEnds } = require('../../../cubeUtils')
const { isDaisyDone } = require('../daisy/daisy')
const { fnKeys } = require('../../solutionNotation')

const { up } = fnKeys

const crossIsSolved = (cube) => {
    
    return crossEnds(cube.bottom).every(tile => tile === cube.bottom[1][1])
        && equatorFaces.every(faceName => cube[faceName][1][1] === cube[faceName][2][1])
}

const cross = (cube) => {
    if(!isDaisyDone(cube)){
        throw Error('Cross expects a cube already solved to daisy.')
    }

    const builder = newSequenceBuilder(cube)

    while(!crossIsSolved(builder.getCube())){

        equatorFaces.forEach(faceName => {
            const currentCube = builder.getCube()
            if(currentCube[faceName][0][1] === currentCube[faceName][1][1]){
                builder.push(faceName).push(faceName)
            }
        })
        if(!crossIsSolved(builder.getCube())){
            builder.push(up)
        }

    }

    return { 
        cube: builder.getCube(),
        sequence: builder.getSequence()
     }
}

module.exports = { cross }