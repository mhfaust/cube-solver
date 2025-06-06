import { CubeFaces } from "../newCube"

export const serializeFaces = (cube: CubeFaces) => Object.entries(cube)
    .reduce((accum, [faceName, face]) => {
        return ({ ...accum, [faceName]: face.map(row => row.join('')).join('-')})
    }, {})
    