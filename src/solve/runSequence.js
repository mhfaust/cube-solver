import solutionNotation from './solutionNotation'
import { pipe } from 'ramda'

export function runSequence(sequence, cube){
    return pipe(...sequence.map(i => solutionNotation[i]))
}
