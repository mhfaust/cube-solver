import { pipe } from 'ramda'
import { yPos } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(yPos))