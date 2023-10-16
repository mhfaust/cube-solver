import { ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect, MutableRefObject } from 'react'
import { 
  Mesh, 
  Color, 
  BufferAttribute,
  MeshBasicMaterial,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
  MeshPhongMaterial,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const red = new Color(.5, 0, 0);
const green = new Color(0, .4, 0);
const blue = new Color(.0, .02, 1);
const orange = new Color(.8, .2, 0)
const yellow = new Color(.7, .7, 0)
const white = new Color(1, 1, 1)
const frameColor = new Color(.8, .8, .8)

const colors = [red, orange, blue, green, white, yellow]

const orangeGreenYellowPolys = [22, 23, 24, 25, 26, 27]
const redWhiteBluePolys = [72, 73, 74, 75, 76, 77]
const facePolygonIndices = new Set([...orangeGreenYellowPolys,  ...redWhiteBluePolys])

export type CubeContainerRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

type CubeProps = {
  x0: 0| 1| 2; 
  y0: 0| 1| 2; 
  z0: 0| 1| 2;
  containerRef: CubeContainerRef;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void,
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void,
}
const Cube = ({ 
  x0, 
  y0, 
  z0, 
  containerRef, 
  onPointerDown, 
  onPointerUp,
}: CubeProps) => {

  const geometryRef = useRef(new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .1))
  const materialRef = useRef(new MeshPhongMaterial({ vertexColors: true }))

  useEffect (() => {
    let { count } = geometryRef.current.attributes.position
    geometryRef.current
      .setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))
    for(let i = 0; i < count; i++){
      const imod = i % 150

      if(!facePolygonIndices.has(imod)) {
        geometryRef.current
          .attributes.color.setXYZ(i ,frameColor.r, frameColor.g, frameColor.b)
      } else {
        const faceColor = colors[Math.floor(i / 6) % 6]
        if(
          //only color exposed sides:
          faceColor === red && x0 === 2 ||
          faceColor === orange && x0 === 0 ||
          faceColor === blue && y0 === 2 ||
          faceColor === green && y0 === 0 ||
          faceColor === white && z0 === 2 || 
          faceColor === yellow && z0 === 0
        ){
          geometryRef.current.attributes.color.setXYZ(i ,faceColor.r, faceColor.g, faceColor.b)
        }
      }
    }
  }, [x0, y0, z0])

  return (
    <mesh ref={containerRef} >
        <mesh
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          // onWheel={onWheel}
          // onPointerMove={console.log}
          position={[x0-1, y0-1, z0-1]}
          geometry={geometryRef.current}
          material={materialRef.current} 
        />
    </mesh>
  )
}

export default Cube