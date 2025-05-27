import chalk from 'chalk';
import { CubeFaces, Line } from '../newCube';
import { Color, FaceName } from '../constants';
import { I } from '../cubeUtils';


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
    ) => (n: I) => (cube: CubeFaces) => faceNames.map(fn => rowStr(cube[fn][n])).join('   ')
const northRow = nthRowOfEachFace(['top'])
const equatorialRow = nthRowOfEachFace(['left', 'front', 'right', 'back'])
const southRow = nthRowOfEachFace(['bottom'])

const eyes: [I,I,I] = [0,1,2]

const printCube = (cube: CubeFaces) => {
    
    const size = cube['front'].length

    return [
        eyes.map(northRow).map(r => '        ' + r(cube)).join('\n'),
        eyes.map(equatorialRow).map(r => r(cube)).join('\n'),
        eyes.map(southRow).map(r => '        ' + r(cube)).join('\n')
    ].join('\n\n')
}

export default printCube
