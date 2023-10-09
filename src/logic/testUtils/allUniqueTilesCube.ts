import { Cube } from '../newCube'

export const allUniqueTilesCube = (): Cube => ['front', 'back', 'right', 'left', 'top', 'bottom']
.reduce(
    (cube, faceName) => ({
        ...cube,
        [faceName]: [[0,1,2],[0,1,2],[0,1,2]].map((i,j) => `.${faceName}[${i}][${j}]`)
    })
    , {} as Cube
)
