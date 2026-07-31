import { CubeFaces } from '@/logic/newCube'
import { FaceColorCode, faceNames } from '../../constants'

/**
 * Finds the face whose center tile matches a target color.
 *
 * @param color - Center color to locate.
 * @param cube - Cube state to inspect.
 */
export const locateCenter = (color: FaceColorCode, cube: CubeFaces) => {
    return faceNames.find(faceName => cube[faceName][1][1] === color)
}
