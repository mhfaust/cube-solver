import { TileLocator } from '../cubeUtils';
import { CubeFaces } from '../newCube'
import { solutionNotation, FnName } from './solutionNotation'

export type CubeAndSequence = {
    cube: CubeFaces;
    sequence: FnName[];
}
export type CaseHandler = (cube: CubeFaces, l: Partial<TileLocator>) => CubeAndSequence


class SequenceBuilder {
    cube: CubeFaces
    stack: FnName[]
    constructor(cube: CubeFaces){
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

export const  newSequenceBuilder = (cube: CubeFaces) => new SequenceBuilder(cube)