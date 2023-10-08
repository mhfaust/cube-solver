import { pipe } from 'ramda'
import { xNeg } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(xNeg))