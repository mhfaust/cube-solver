import { ThreeEvent } from "@react-three/fiber"
import { rotationDirection } from "./rotationDirection"
import { Pointers } from "./pointers"

const { sqrt, pow, min, max, acos, PI } = Math
const square = (x:number) => pow(x, 2)


/**
 * Calculates the cumulative dialing angle in degrees based on the movement history of a pointer.
 *
 * @param pointers - The current "pointers" collection representing fingers on the screen.
 * @param upPointer - The pointer event reporesenting the finger that has been lifted.
 * @returns The cumulative dialing angle as a number. Returns 0 if the pointer data is missing or if there are insufficient moves to calculate the angle.
 */
const calculateDialingAngle = (pointers: Pointers, upPointer: ThreeEvent<PointerEvent>) => {

  const { moves } = pointers[upPointer.pointerId] || {}
  
  if (!pointers[upPointer.pointerId]) { 
    // console.log('//no down-pointer found for up-pointer (unexpected)')
    return 0
  }
  if (!moves || moves?.length < 3) { 
    // console.log('//too few moves')
    return 0
  }

  const cumulativeAngle = moves.reduce<number>((cum, move, i) => {
    if(i < 2){
      // console.log('too few angles')
      return 0
    }
    return cum + angle(move, moves[i-1], moves[i-2])
  }, 0)

  // console.log({cumulativeAngle})
  // console.log('====================')

  return cumulativeAngle
}

export default calculateDialingAngle

const angle = (
  e1: ThreeEvent<PointerEvent>, 
  e2: ThreeEvent<PointerEvent>,
  e3: ThreeEvent<PointerEvent>,
  ) => {
    let vector1 = { x: e2.x - e1.x, y: e2.y - e1.y };
    let vector2 = { x: e3.x - e2.x, y: e3.y - e2.y };

    let dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;

    let magnitude1 = sqrt(square(vector1.x) + square(vector1.y));
    let magnitude2 = sqrt(square(vector2.x) + square(vector2.y));

    // // Avoid division by zero
    if(magnitude1 * magnitude2 === 0) return 0;

    let cosTheta = dotProduct / (magnitude1 * magnitude2);
    
    // // Make sure the value is in the range of -1 to 1, inclusive
    cosTheta = min(1, max(-1, cosTheta));
    // console.log({ cosTheta })

    const dir = rotationDirection(
      [vector1.x, vector1.y],
      [vector2.x, vector2.y]
    )
    // console.log({dir})
    // const theta = acos(cosTheta) * (180 / PI) * dir
    // console.log( {theta})
    // console.log('----------------------')

    //Mult. by -1 to get + for clockwise:
    return -1 * acos(cosTheta) * (180 / PI) * dir;
}
