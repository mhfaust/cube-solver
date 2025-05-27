import chalk from 'chalk';
import { CubeFaces, Line } from '../newCube';
import { FaceName } from '../constants';

const coloredSquare = {
    red: chalk['red']('■'),
    blue: chalk['blue']('■'),
    green: chalk['green']('■'),
    yellow: chalk['yellow']('■'),
    white: chalk['white']('■'),
    orange: chalk['magenta']('■'),
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
