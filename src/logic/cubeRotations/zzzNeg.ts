import { pipe } from 'ramda'
import { zNeg } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(zNeg))