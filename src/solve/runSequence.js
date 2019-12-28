const solutionNotation = require('./solutionNotation')
const { pipe } = require('ramda')

function runSequence(sequence, cube){
    return pipe(...sequence.map(i => solutionNotation[i]))
}

module.exports = { runSequence }