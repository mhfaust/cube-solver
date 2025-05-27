import { CubeFaces } from '@/logic/newCube'
import { newSequenceBuilder } from '../../sequenceBuilder'

function corners(cube: CubeFaces){
    const builder = newSequenceBuilder(cube)



    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
    return
}