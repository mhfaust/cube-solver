export const FRONT = 'front'
export const RIGHT = 'right'
export const BACK = 'back'
export const LEFT = 'left'
export const TOP = 'top'
export const BOTTOM = 'bottom'
export type EquatorialEdge = typeof FRONT | typeof BACK | typeof LEFT | typeof RIGHT


export const faceNames = [FRONT, RIGHT, BACK, LEFT, TOP, BOTTOM] as const;
export type FaceName = typeof faceNames[number];

export const equatorFaces: [FaceName, FaceName, FaceName, FaceName] =  [FRONT, RIGHT, BACK, LEFT]   

// COLOR_A_1 and COLOR_Z_1 center-tiles should always appear on opposite sides of the cube
export const COLOR_A_1 = 'COLOR_A_1' as const
export const COLOR_A_2 = 'COLOR_A_2' as const
export const COLOR_A_3 = 'COLOR_A_3' as const
export const COLOR_Z_1 = 'COLOR_Z_1' as const
export const COLOR_Z_2 = 'COLOR_Z_2' as const
export const COLOR_Z_3 = 'COLOR_Z_3' as const

export const colors = [COLOR_A_1, COLOR_A_2, COLOR_A_3, COLOR_Z_1, COLOR_Z_2, COLOR_Z_3];
export type FaceColorCode = typeof colors[number];

// These short-hand names are just for the convenience of arranging tight arrays of test mocks
export const A1 = COLOR_A_1
export const A2 = COLOR_A_2
export const A3 = COLOR_A_3
export const Z1 = COLOR_Z_1
export const Z2 = COLOR_Z_2
export const Z3 = COLOR_Z_3
