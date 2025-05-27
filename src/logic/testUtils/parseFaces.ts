import { Color, FaceName } from "../constants"
import { CubeFaces, Face } from "../newCube"

const colorMap: Record<string, Color> = {
    r: 'red',
    y: 'yellow',
    b: 'blue',
    g: 'green',
    w: 'white',
    o: 'orange'
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
