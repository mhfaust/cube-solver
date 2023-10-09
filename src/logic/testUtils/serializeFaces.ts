import { Cube } from "../newCube"

export const serializeFaces = (cube: Cube) => Object.entries(cube)
    .reduce((accum, [faceName, face]) => {
        return ({ ...accum, [faceName]: face.map(row => row.join('')).join('-')})
    }, {})
    