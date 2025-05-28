import { CubeFaces } from '@/logic/newCube'
import { FaceColorCode, faceNames } from '../../constants'

export const locateCenter = (color: FaceColorCode, cube: CubeFaces) => {
    return faceNames.find(faceName => cube[faceName][1][1] === color)
}
