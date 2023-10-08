import { pipe } from 'ramda'
import { yNeg } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(yNeg))