import { TileLocator } from '../cubeUtils';
import { Cube } from '../newCube'
import solutionNotation, { FnName } from './solutionNotation'

export type CubeAndSequence = {
    cube: Cube;
    sequence: FnName[];
}
export type CaseHandler = (cube: Cube, l: Partial<TileLocator>) => CubeAndSequence


class SequenceBuilder {
    cube: Cube
    stack: FnName[]
    constructor(cube: Cube){
        this.cube = cube
        this.stack = []
    }

    push (fnName: FnName){
        this.stack.push(fnName)
        this.cube = solutionNotation[fnName](this.cube)
        return this
    }

    concat(sequence: FnName[]){
        sequence.forEach(fnName => this.push(fnName))
        return this
    }

    getSequence (){
        return this.stack.slice(0)
    }

    getCube(){
        // return cloneCube(this.cube)
        return this.cube
    }
}

export const  newSequenceBuilder = (cube: Cube) => new SequenceBuilder(cube)