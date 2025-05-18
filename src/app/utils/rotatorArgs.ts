import { MoveCode } from "./moveCodes"

export type LayerRotatorArgs = ['x'|'y'|'z', 0|1|2, '+'|'-'];
export type CubeRotatorArgs = ['x'|'y'|'z', '+'|'-'];

export const modelSpinFunctions: Record<MoveCode, LayerRotatorArgs | CubeRotatorArgs> = {
  'U': ['y', 2, '-'],
  'U′': ['y', 2, '+'],
  'D': ['y', 0, '+'],
  'D′': ['y', 0, '-'],
  'L': ['x', 0, '+'],
  'L′': ['x', 0, '-'],
  'R': ['x', 2, '-'],
  'R′': ['x', 2, '+'],
  'F': ['z', 2, '-'],
  'F′': ['z', 2, '+'],
  'B': ['z', 0, '+'],
  'B′': ['z', 0, '-'],
  'Y′': ['y', '-'],
  'Y': ['y', '+'],
  'X′': ['x', '-'],
  'X': ['x', '+'],
  'Z′': ['z', '+'],
  'Z': ['z', '-'],
  'E': ['y', 1 , '+'],
  'E′': ['y', 1, '-'],
  'M': ['x', 1, '+'],
  'M′': ['x', 1, '-'],
  'S': ['z', 1, '-'],
  'S′': ['z', 1, '+']
}

