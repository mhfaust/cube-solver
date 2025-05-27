import { FaceName } from "./constants"
import { CubeFaces, Face } from "./newCube"

type FaceTransform = (faceName: FaceName, cube: CubeFaces) => Face
export type CubeTransform = (cube: CubeFaces) => CubeFaces

const nextCube = (transforms: Record<FaceName, FaceTransform>): CubeTransform => {
    const entries = Object.entries(transforms) as [FaceName, FaceTransform][]
    return (prevCube) => entries.reduce(
        (accum, [sideName, transform]) => {
            accum[sideName] = transform(sideName, prevCube)
            return accum
        }, {} as CubeFaces)
}

export default nextCube