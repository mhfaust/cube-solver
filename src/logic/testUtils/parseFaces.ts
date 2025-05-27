import { BLUE, Color, FaceName, GREEN, ORANGE, RED, WHITE, YELLOW } from "../constants"
import { CubeFaces, Face } from "../newCube"

const colorMap: Record<string, Color> = {
    r: RED,
    y: YELLOW,
    b: BLUE,
    g: GREEN,
    w: WHITE,
    o: ORANGE
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
