import { faceNames } from '../../constants'

export const locateCenter = (color, cube) => {
    return faceNames.find(faceName => cube[faceName][1][1] === color)
}
