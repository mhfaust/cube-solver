export const FRONT = 'front'
export const RIGHT = 'right'
export const BACK = 'back'
export const LEFT = 'left'
export const TOP = 'top'
export const BOTTOM = 'bottom'
export type EquatorialEdge = typeof FRONT | typeof BACK | typeof LEFT | typeof RIGHT


export const faceNames = [FRONT, RIGHT, BACK, LEFT, TOP, BOTTOM] as const;
export type FaceName = typeof faceNames[number];

export const RED = 'red' as const
export const BLUE = 'blue' as const
export const GREEN = 'green' as const
export const YELLOW = 'yellow' as const
export const ORANGE = 'orange' as const
export const WHITE = 'white' as const
export const R = RED
export const B = BLUE
export const G = GREEN
export const Y = YELLOW
export const O = ORANGE
export const W = WHITE
export const colors = [RED, BLUE, GREEN, YELLOW, ORANGE, WHITE];
export type Color = typeof colors[number];

export const equatorFaces: [FaceName, FaceName, FaceName, FaceName] =  [FRONT, RIGHT, BACK, LEFT]   
