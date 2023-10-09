import { daisy } from './layer0/daisy/daisy'
import { cross } from './layer0/cross/cross'
import { newSequenceBuilder } from './sequenceBuilder'
import { Cube } from '../newCube'

export function solve (cube: Cube) {
    const builder = newSequenceBuilder(cube)
    
    const pipeline = [
        daisy, 
        cross
    ]
    
    pipeline.forEach(fn => {
        const { sequence } =  fn(builder.getCube())
        builder.concat(sequence)
    })

    return {
        cube: builder.getCube(),
        sequence: builder.getSequence()
    }
}
