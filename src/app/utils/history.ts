import { MoveCode } from "./moveCodes";
import { CubeHistory } from '../store/historiesSlices'

const wholeCubeSpins = new Set<MoveCode>(['X', 'Xi', 'Y', 'Yi', 'Z', 'Zi'])

export const countMutations = (moves: CubeHistory['moves']) => {
    return moves.filter(m => !wholeCubeSpins.has(m.moveCode)).length
}