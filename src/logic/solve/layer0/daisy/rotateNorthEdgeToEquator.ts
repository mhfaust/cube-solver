import { CubeFaces } from '@/logic/newCube'
import { solutionNotation, FnName } from '../../solutionNotation'
import { TileLocator } from '@/logic/cubeUtils'

export const rotateNorthEdgeToEquator = (cube: CubeFaces, { faceName }: Pick<TileLocator, 'faceName'>) => {
    console.log('rotateNorthEdgeToEquator')
    return {
        cube: solutionNotation[faceName as FnName](cube),
        //this works because the convenience of the notation matching equatorial face-names
        sequence: [faceName] 
    }
}
