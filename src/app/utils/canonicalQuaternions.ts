import { Quaternion, Vector3 } from 'three'

export const createRotationQuaternion = (axis: 'x' | 'y' | 'z', degrees: number): Quaternion => {
  const radians = (degrees * Math.PI) / 180
  const axisVector = axis === 'x' ? new Vector3(1, 0, 0) : 
                     axis === 'y' ? new Vector3(0, 1, 0) : 
                     new Vector3(0, 0, 1)
  return new Quaternion().setFromAxisAngle(axisVector, radians)
}

export const composeRotations = (baseRotation: Quaternion, additionalRotation: Quaternion): Quaternion => {
  return new Quaternion().multiplyQuaternions(additionalRotation, baseRotation)
}
export const identity = new Quaternion(0, 0, 0, 1)

export const y90 = createRotationQuaternion('y', 90)
export const y180 = createRotationQuaternion('y', 180)
export const y270 = createRotationQuaternion('y', -90)

export const x90 = createRotationQuaternion('x', 90)
export const x180 = createRotationQuaternion('x', 180)
export const x270 = createRotationQuaternion('x', -90)

export const z90 = createRotationQuaternion('z', 90)
export const z180 = createRotationQuaternion('z', 180)
export const z270 = createRotationQuaternion('z', -90)

export const x90_z90 = composeRotations(x90,z90) 
export const x90_z180 = composeRotations(x90,z180)
export const x90_z270 = composeRotations(x90,z270)

export const x180_y90 = composeRotations(x180,y90)
export const x180_y270 = composeRotations(x180,y270)

export const x270_z90 = composeRotations(x270,z90)
export const x270_z180 = composeRotations(x270,z180)
export const x270_z270 = composeRotations(x270,z270)

export const z90_x90 = composeRotations(z90,x90)
export const z90_x180 = composeRotations(z90,x180)
export const z90_x270 = composeRotations(z90,x270)
export const z270_x90 = composeRotations(z270,x90)
export const z270_x180 = composeRotations(z270,x180)
export const z270_x270 = composeRotations(z270,x270)

export const canonicalQuaternions = {
  identity,
  y90, y180, y270, x90, x180, x270, z90, z180, z270, x90_z90, 
  x90_z180, x90_z270, x180_y90, x180_y270, x270_z90, x270_z180, x270_z270, 
  z90_x90, z90_x180, z90_x270, z270_x90, z270_x180, z270_x270,
} as const;

const referenceOrientation = identity

const v = Object.entries(canonicalQuaternions)
v.forEach(([key, q], i) => {
  if (i > 0) {
    
    const dot = q.dot(referenceOrientation)
    if(dot < 0) {
      console.log(key)
    }
  }
})


export type CanonicalQuaternionName = keyof typeof canonicalQuaternions;

const quarterTurnQuaternionNames =  ['y90', 'y180', 'y270', 'x90', 'x180', 'x270', 'z90', 'z180', 'z270'] as const;
export type QuarterTurnQuaternionName = typeof quarterTurnQuaternionNames[number]

