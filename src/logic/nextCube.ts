import { FaceName } from "./constants"
import { CubeFaces, Face } from "./newCube"

type FaceTransform = (faceName: FaceName, cube: CubeFaces) => Face
export type CubeFacesTransform = (cube: CubeFaces) => CubeFaces

/**
 * Builds a cube transform function from per-face transform callbacks.
 *
 * @param transforms - Face transform functions keyed by face name.
 */
export const nextCube = (transforms: Record<FaceName, FaceTransform>): CubeFacesTransform => {
    const entries = Object.entries(transforms) as [FaceName, FaceTransform][]
    return (prevCube) => entries.reduce(
        (accum, [sideName, transform]) => {
            accum[sideName] = transform(sideName, prevCube)
            return accum
        }, {} as CubeFaces)
}
