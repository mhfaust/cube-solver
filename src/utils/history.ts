import { MoveCode } from "./moveCodes";
import { CubeHistory } from '../store/recordsSlice'

const wholeCubeSpins = new Set<MoveCode>(['X', 'Xi', 'Y', 'Yi', 'Z', 'Zi'])

export const countMutations = (moves: CubeHistory['moves']) => {
    return moves.filter(m => !wholeCubeSpins.has(m.moveCode)).length
}

export const isMutation = (moveCode: MoveCode) => !wholeCubeSpins.has(moveCode);