import { useRef, useEffect, MutableRefObject } from 'react'
import { 
  Mesh, 
  BoxGeometry, 
  Color, 
  BufferAttribute,
  MeshBasicMaterial,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
// import { RoundedBoxGeometry } from 'threejs/examples/jsm/geometries/RoundedBoxGeometry.js';

const red = new Color(.5, 0, 0);
const green = new Color(0, .4, 0);
const blue = new Color(.0, .02, 1);
const orange = new Color(.8, .2, 0)
const yellow = new Color(.7, .7, 0)
const white = new Color(1, 1, 1)

const colors = [red, orange, blue, green, white, yellow ]

export type CubeRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

type CubeProps = {
  meshRef: CubeRef;
  x0: number; 
  y0: number; 
  z0: number; 
}
const Cube = ({ meshRef, x0, y0, z0 }: CubeProps) => {
  
  const geometryRef = useRef(new RoundedBoxGeometry(1.0, 1.0, 1.0))
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
          continue
        }
        const color = colors[Math.floor(i / 6) % 6]
        if(
          //only color exposed sides:
          color === red && x0 === 1 ||
          color === orange && x0 === -1 ||
          color === blue && y0 === 1 ||
          color === green && y0 === -1 ||
          color === white && z0 === 1 || 
          color === yellow && z0 === -1
        ){
          geometry.attributes.color.setXYZ(i ,color.r, color.g, color.b)
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