import { Quaternion } from "three"

export function quaternionsAreEqual(
  q1: Quaternion, 
  q2: Quaternion, 
  tolerance: number = .01
): boolean {
  // Calculate the distance between the quaternions directly
  const directDistance = Math.sqrt(
    (q1.w - q2.w) ** 2 + 
    (q1.x - q2.x) ** 2 + 
    (q1.y - q2.y) ** 2 + 
    (q1.z - q2.z) ** 2
  )
  
  // Calculate the distance between q1 and the negative of q2
  // This accounts for the double coverage property of quaternions
  const negativeDistance = Math.sqrt(
    (q1.w - (-q2.w)) ** 2 + 
    (q1.x - (-q2.x)) ** 2 + 
    (q1.y - (-q2.y)) ** 2 + 
    (q1.z - (-q2.z)) ** 2
  )
  
  // Take the minimum distance, since both representations are equivalent
  const rotationalDistance = Math.min(directDistance, negativeDistance)

  
  // Compare against the tolerance
  return rotationalDistance < tolerance
}