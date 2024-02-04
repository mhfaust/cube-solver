const { PI } = Math

export const FIELD_OF_VIEW_ANGLE = PI / 10
export const ANIMATION_TIME = 120
export const MIN_DIAL_ANGLE = 75
export const MAX_SWIPE_ANGLE = 45
export const MAX_SWIPE_TIME = 500
export const MIN_SPEED_ASSESS_TIME = 100


//CORNERS
// R--U-Ri-U--R--U2--Ri (front-left fixed, rotates clockwise)
// Li-Ui-L-Ui-Li-Ui2-L (front-right fixed, rotates counter-clockwise)

//HEADLIGHTS
// Ri-F-Ri-B2-R-Fi-Ri-B2-R2
// OR
// L-Fi-L-B2-Li-F-L-B2-L2

//FINAL EDGE SWAP
// R UI R U R U R UI RI UI R2

