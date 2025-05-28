import useTheme from '@/app/themes/useTheme';
import { Color } from '@/logic/constants';
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
    console.log('coloring a block')
    blockRef.current.geometry = blockGeometry
    blockRef.current.material = materialRef.current
    
    let { count } = blockGeometry.attributes.position
    blockGeometry
      .setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))

    /* color the faces  
     *   0 <= i < 150  -- COLOR_A_1 -- RIGHT side of initial cube
     * 150 <= i < 300  -- COLOR_Z_1 -- LEFT side of initial cube
     * 300 <= i < 450  -- COLOR_A_2 -- TOP side of initial cube
     * 450 <= i < 600  -- COLOR_Z_2 -- BOTTOM side of initial cube
     * 600 <= i < 750  -- COLOR_A_3 -- FRONT side of initial cube
     * 750 <= i < 900  -- COLOR_Z_3 -- BACK side of initial cube
     */
    for(let i = 0; i < count; i++){
      const imod = i % 150
      if(!facePolygonIndices.has(imod)) {
        blockGeometry
          .attributes.color.setXYZ(i ,frameColor.r, frameColor.g, frameColor.b)
      } else {
        const colorIndex = Math.floor(i / 6) % 6 
        const colorName = Object.keys(faceColors)[colorIndex]
        const faceColor = faceColors[colorName as Color]
        if(
          //only color exposed sides:
          faceColor === faceColors.COLOR_A_1 && x0 === 2 ||
          faceColor === faceColors.COLOR_Z_1 && x0 === 0 ||
          faceColor === faceColors.COLOR_A_2 && y0 === 2 ||
          faceColor === faceColors.COLOR_Z_2 && y0 === 0 ||
          faceColor === faceColors.COLOR_A_3 && z0 === 2 || 
          faceColor === faceColors.COLOR_Z_3 && z0 === 0
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