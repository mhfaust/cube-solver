import { CubeFaces } from '@/logic/newCube'
import { Color, faceNames } from '../../constants'

export const locateCenter = (color: Color, cube: CubeFaces) => {
    return faceNames.find(faceName => cube[faceName][1][1] === color)
}
