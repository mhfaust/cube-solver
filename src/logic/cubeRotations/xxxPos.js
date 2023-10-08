import { pipe } from 'ramda'
import { xPos } from '../layerRotations'
import { nArray } from '../utils'

export default  (cubeSize = 3) => pipe(...nArray(cubeSize)(xPos))