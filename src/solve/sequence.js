const solutionNotation = require('./solutionNotation')


class Sequence {
    constructor(cube){
        this.result = cube
        this.stack = []
    }

    push (fnName){
        this.stack.push(fnName)
        this.cube = solutionNotation[fnName](cube)
    }
}

module.exports = {
    newSequence: (cube) => new Sequence(cube)
}