import { ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect, MutableRefObject, createRef } from 'react'
import { 
  Mesh, 
  BufferAttribute,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
  MeshPhongMaterial,
  MeshStandardMaterial,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import useTheme from '../themes/useTheme';

const facePolygonIndices = new Set([72, 73, 74, 75, 76, 77])

export type CubeContainerRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

const r = createRef()

type CubeProps = {
  x0: 0|1|2; 
  y0: 0|1|2; 
  z0: 0|1|2;
  containerRef: CubeContainerRef;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void,
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void,
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void,
}
const Cube = ({ 
  x0, 
  y0, 
  z0, 
  containerRef, 
  onPointerDown, 
  onPointerUp,
  onPointerMove
}: CubeProps) => {

  const { frameColor, faceColors, boxRoundness } = useTheme()

  const geometryRef = useRef(new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, boxRoundness))
  const materialRef = useRef(new MeshStandardMaterial({ vertexColors: true }))

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
        const faceColor = faceColors[Math.floor(i / 6) % 6]
        if(
          //only color exposed sides:
          faceColor === faceColors[0] && x0 === 2 ||
          faceColor === faceColors[1] && x0 === 0 ||
          faceColor === faceColors[2] && y0 === 2 ||
          faceColor === faceColors[3] && y0 === 0 ||
          faceColor === faceColors[4] && z0 === 2 || 
          faceColor === faceColors[5] && z0 === 0
        ){
          geometryRef.current.attributes.color.setXYZ(i ,faceColor.r, faceColor.g, faceColor.b)
        }
      }
    }
  }, [faceColors, frameColor.b, frameColor.g, frameColor.r, x0, y0, z0])

  return (
    <mesh ref={containerRef} >
        <mesh
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          position={[x0-1, y0-1, z0-1]}
          geometry={geometryRef.current}
          material={materialRef.current} 
        />
    </mesh>
  )
}

export default Cube