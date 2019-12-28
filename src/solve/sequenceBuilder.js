const solutionNotation = require('./solutionNotation')
const { cloneCube } = require('../cubeUtils')

class Sequence {
    constructor(cube){
        this.cube = cube
        this.stack = []
    }

    push (fnName){
        this.stack.push(fnName)
        this.cube = solutionNotation[fnName](this.cube )
    }

    concat(sequence){
        sequence.forEach(fnName => this.push(fnName))
    }

    getSequence (){
        return this.stack.slice(0)
    }

    getCube(){
        // return cloneCube(this.cube)
        return this.cube
    }
}


module.exports = {
    newSequenceBuilder: (cube) => new Sequence(cube)
}