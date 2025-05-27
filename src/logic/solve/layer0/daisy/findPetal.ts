import { CubeFaces } from '@/logic/newCube'
import { equatorFaces } from '../../../constants'
import { I, TileLocator } from '@/logic/cubeUtils'

const bottomEdgeCoords: Pick<TileLocator, 'col' | 'row'>[] = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 1 },
]

const eyes: I[] = [0,1,2]

export const findPetal = (cube: CubeFaces): TileLocator | undefined => {
    const petalColor = cube.bottom[1][1]
    //equatorial edges:
    for(let faceName of equatorFaces){
        for(const col of eyes){
            if(cube[faceName][1][col] === petalColor){
                return { faceName, row: 1, col }
            }
        }
    }
    //bottom edges:
    for(let coords of bottomEdgeCoords){
        const { col, row } = coords
        if(cube.bottom[row][col] === petalColor){
            return { faceName: 'bottom', row, col }
        }
    }
    //north and south edges:
    for(let faceName of equatorFaces){
        for(let row of eyes){
            if(cube[faceName][row][1] === petalColor){
                return { faceName, row, col: 1 }
            }
        }
    }
}

