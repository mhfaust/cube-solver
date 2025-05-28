import { COLOR_A_2, FaceColorCode, FaceName, COLOR_Z_2, COLOR_Z_1, COLOR_A_1, COLOR_Z_3, COLOR_A_3 } from "../constants"
import { CubeFaces, Face } from "../newCube"

const colorMap: Record<string, FaceColorCode> = {
    r: COLOR_A_1,
    y: COLOR_A_3,
    b: COLOR_A_2,
    g: COLOR_Z_2,
    w: COLOR_Z_3,
    o: COLOR_Z_1
}

export const parseFaces = (faces: Record<FaceName, string>) => {
    return Object.keys(faces).reduce((cube, faceName) => {
        const facesStr = faces[faceName as FaceName];
        const rows = facesStr.split('-')
        cube[faceName as FaceName] = rows
            .map(row => row
                .split('')
                .map(s => colorMap[s.toLowerCase()])
            ) as Face
        return cube
    }, {} as CubeFaces)
}
