import { MoveCode } from "./moveCodes";
import { CubeHistory } from '../store/recordsSlice'

const wholeCubeSpins = new Set<MoveCode>(['X', 'Xi', 'Y', 'Yi', 'Z', 'Zi'])

/**
 * Counts non-orientation moves in a move history.
 *
 * @param moves - Move list from a game record.
 */
export const countMutations = (moves: CubeHistory['moves']) => {
    return moves.filter(m => !wholeCubeSpins.has(m.moveCode)).length
}

/**
 * Returns true when a move mutates cube state rather than rotating the whole cube orientation.
 *
 * @param moveCode - Move notation to classify.
 */
export const isMutation = (moveCode: MoveCode) => !wholeCubeSpins.has(moveCode);
