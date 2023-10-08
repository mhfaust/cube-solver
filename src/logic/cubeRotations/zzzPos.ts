import { pipe } from 'ramda'
import { zPos } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(zPos))