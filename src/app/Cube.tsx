import { useRef, useEffect, MutableRefObject } from 'react'
import { 
  Mesh, 
  Color, 
  BufferAttribute,
  MeshBasicMaterial,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const red = new Color(.5, 0, 0);
const green = new Color(0, .4, 0);
const blue = new Color(.0, .02, 1);
const orange = new Color(.8, .2, 0)
const yellow = new Color(.7, .7, 0)
const white = new Color(1, 1, 1)
const frameColor = new Color(.0, .0, .0)

const colors = [red, orange, blue, green, white, yellow ]

export type CubeRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

type CubeProps = {
  meshRef: CubeRef;
  x0: number; 
  y0: number; 
  z0: number; 
}
const Cube = ({ meshRef, x0, y0, z0 }: CubeProps) => {
  
  const geometryRef = useRef(new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .07))
  const geometry = geometryRef.current
  const materialRef = useRef(new MeshBasicMaterial({ vertexColors: true }))
  const material = materialRef.current

    useEffect (() => {
      let { count } = geometry.attributes.position
      geometry.setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))
      for(let i = 0; i < count; i++){
        const imod = i % 150
        const s = new Set([22, 23, 24, 25, 26, 27, 72, 73, 74, 75, 76, 77 ])
        if(!s.has(imod)) {
          geometry.attributes.color.setXYZ(i ,frameColor.r, frameColor.g, frameColor.b)
        } else {
          const faceColor = colors[Math.floor(i / 6) % 6]
          if(
            //only color exposed sides:
            faceColor === red && x0 === 1 ||
            faceColor === orange && x0 === -1 ||
            faceColor === blue && y0 === 1 ||
            faceColor === green && y0 === -1 ||
            faceColor === white && z0 === 1 || 
            faceColor === yellow && z0 === -1
          ){
            geometry.attributes.color.setXYZ(i ,faceColor.r, faceColor.g, faceColor.b)
          }
        }
      }
    }, [geometry, x0, y0, z0])

    return (
      <mesh
          ref={meshRef}
          position={[x0,y0,z0]}
          geometry={geometry}
          material={material}
      >
      </mesh>
    )
}

export default Cube