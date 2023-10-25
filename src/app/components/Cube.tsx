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

  const { frameColor, faceColors, boxRoundness, cubeGeometry } = useTheme()

  const cubeRef = useRef<Mesh>({} as Mesh)

  const materialRef = useRef(new MeshStandardMaterial({ vertexColors: true }))

  useEffect (() => {
    cubeRef.current.geometry = cubeGeometry

    cubeRef.current.material = materialRef.current

    let { count } = cubeGeometry.attributes.position
    cubeGeometry
      .setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))

    for(let i = 0; i < count; i++){
      const imod = i % 150
      if(!facePolygonIndices.has(imod)) {
        cubeGeometry
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
          cubeGeometry.attributes.color.setXYZ(i ,faceColor.r, faceColor.g, faceColor.b)
        }
      }
    }
  }, [cubeGeometry, faceColors, frameColor.b, frameColor.g, frameColor.r, x0, y0, z0])

  return (
    <mesh ref={containerRef} >
        <mesh
          ref={cubeRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          position={[x0-1, y0-1, z0-1]}
          geometry={cubeGeometry}
          // material={materialRef.current} 
        />
    </mesh>
  )
}

export default Cube