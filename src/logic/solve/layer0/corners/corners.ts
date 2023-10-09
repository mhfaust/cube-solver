import { Cube } from '@/logic/newCube'
import { newSequenceBuilder } from '../../sequenceBuilder'

function corners(cube: Cube){
    const builder = newSequenceBuilder(cube)



    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
    return
}