import chalk from 'chalk';
import { CubeFaces, Line } from '../newCube';
import { COLOR_A_1, COLOR_A_2, COLOR_A_3, COLOR_Z_1, COLOR_Z_2, COLOR_Z_3, FaceName } from '../constants';

const coloredSquare = {
    [COLOR_A_1]: chalk['red']('■'),
    [COLOR_A_2]: chalk['blue']('■'),
    [COLOR_A_3]: chalk['yellow']('■'),
    [COLOR_Z_1]: chalk['magenta']('■'),
    [COLOR_Z_2]: chalk['green']('■'),
    [COLOR_Z_3]: chalk['white']('■'),
}

const rowStr = (row: Line) => row.map(tile => coloredSquare[tile]).join(' ')
const nthRowOfEachFace = (
        faceNames: FaceName[]
    ) => (n: 0|1|2) => (cube: CubeFaces) => faceNames.map(fn => rowStr(cube[fn][n])).join('   ')
const northRow = nthRowOfEachFace(['top'])
const equatorialRow = nthRowOfEachFace(['left', 'front', 'right', 'back'])
const southRow = nthRowOfEachFace(['bottom'])

const eyes: [0|1|2, 0|1|2, 0|1|2] = [0,1,2]

export const printCube = (cube: CubeFaces) => {
    
    const size = cube['front'].length

    return [
        eyes.map(northRow).map(r => '        ' + r(cube)).join('\n'),
        eyes.map(equatorialRow).map(r => r(cube)).join('\n'),
        eyes.map(southRow).map(r => '        ' + r(cube)).join('\n')
    ].join('\n\n')
}
