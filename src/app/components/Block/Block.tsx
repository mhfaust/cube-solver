import useTheme from '@/app/themes/useTheme';
import { ThreeEvent } from '@react-three/fiber';
import { MutableRefObject, createRef, useEffect, useRef } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  Material,
  Mesh,
  // MeshPhongMaterial,
  MeshStandardMaterial,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';

const facePolygonIndices = new Set([72, 73, 74, 75, 76, 77])

export type BlockContainerRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

const r = createRef()

type BlockProps = {
  x0: 0|1|2; 
  y0: 0|1|2; 
  z0: 0|1|2;
  containerRef: BlockContainerRef;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void,
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void,
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void,
}
const Block = ({ 
  x0, 
  y0, 
  z0, 
  containerRef, 
  onPointerDown, 
  onPointerUp,
  onPointerMove
}: BlockProps) => {

  const { frameColor, faceColors, boxRoundness, blockGeometry } = useTheme()

  const blockRef = useRef<Mesh>({} as Mesh)

  const materialRef = useRef(new MeshStandardMaterial({ vertexColors: true }))

  useEffect (() => {
    blockRef.current.geometry = blockGeometry
    blockRef.current.material = materialRef.current

    let { count } = blockGeometry.attributes.position
    blockGeometry
      .setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))

    for(let i = 0; i < count; i++){
      const imod = i % 150
      if(!facePolygonIndices.has(imod)) {
        blockGeometry
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
          blockGeometry.attributes.color.setXYZ(i ,faceColor.r, faceColor.g, faceColor.b)
        }
      }
    }
  }, [blockGeometry, faceColors, frameColor.b, frameColor.g, frameColor.r, x0, y0, z0])

  return (
    <mesh 
      ref={containerRef} 
      position={[0,1,0]}
    >
        <mesh
          ref={blockRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          position={[x0-1, y0-1, z0-1]}
          geometry={blockGeometry}
          // material={materialRef.current} 
        />
    </mesh>
  )
}

export default Block