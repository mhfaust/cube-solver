import solutionNotation from './solutionNotation'

class SequenceBuilder {
    constructor(cube){
        this.cube = cube
        this.stack = []
    }

    push (fnName){
        this.stack.push(fnName)
        this.cube = solutionNotation[fnName](this.cube )
        return this
    }

    concat(sequence){
        sequence.forEach(fnName => this.push(fnName))
        return this
    }

    getSequence (){
        return this.stack.slice(0)
    }

    getCube(){
        // return cloneCube(this.cube)
        return this.cube
    }
}

export const  newSequenceBuilder = (cube) => new SequenceBuilder(cube)