const { PI } = Math

export const FOV_ANGLE = PI / 9
export const ANIMATION_TIME = 120
export const MIN_DIAL_ANGLE = 90
export const MAX_SWIPE_TIME = 500

// R--U-Ri-U--R--U2--Ri (front-left fixed, rotates clockwise)
// Li-Ui-L-Ui-Li-Ui2-L (front-right fixed, rotates counter-clockwise)

//then
// L-Fi-L-B2-Li-F-L-B2-L2
// Ri-F-Ri-B2-R-Fi-Ri-B2-R2
  // Same, but put headlights to the left:
  // R-U-Ri-Ui-R-F-R2-Ui-Ri-Ui-R-U-Ri-Fi


