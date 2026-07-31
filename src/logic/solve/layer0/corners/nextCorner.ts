import { CubeFaces } from '@/logic/newCube'
import { equatorFaces } from '../../../constants'

/**
 * Finds the next bottom-colored corner candidate around the equator ring.
 *
 * @param cube - Cube state to inspect.
 */
export function nextCorner(cube: CubeFaces){
    const bottomColor = cube.bottom[1][1]

    for(let faceName of equatorFaces){
        for(let col of [0,2]){
            if(cube[faceName][2][col] === bottomColor){
                return {
                    faceName,
                }
            }
        }
    }
}
