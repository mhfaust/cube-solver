import { FaceName } from "./constants"
import { Cube, Face } from "./newCube"

type FaceTransform = (faceName: FaceName, cube: Cube) => Face
export type CubeTransform = (cube: Cube) => Cube

const nextCube = (transforms: Record<FaceName, FaceTransform>): CubeTransform => {
    const entries = Object.entries(transforms) as [FaceName, FaceTransform][]
    return (prevCube) => entries.reduce(
        (accum, [sideName, transform]) => {
            accum[sideName] = transform(sideName, prevCube)
            return accum
        }, {} as Cube)
}

export default nextCube