import { MoveCode } from "./moveCodes";
import { History } from '../store/historiesSlices'

const wholeCubeSpins = new Set<MoveCode>(['X', 'Xi', 'Y', 'Yi', 'Z', 'Zi'])

export const countMutations = (moves: History['moves']) => {
    return moves.filter(m => !wholeCubeSpins.has(m)).length
}