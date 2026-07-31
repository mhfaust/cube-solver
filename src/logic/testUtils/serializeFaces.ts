import { CubeFaces } from "../newCube"

/**
 * Serializes cube-face matrices into compact dash-delimited row strings for tests.
 *
 * @param cube - Cube face state to serialize.
 */
export const serializeFaces = (cube: CubeFaces) => Object.entries(cube)
    .reduce((accum, [faceName, face]) => {
        return ({ ...accum, [faceName]: face.map(row => row.join('')).join('-')})
    }, {})
    
