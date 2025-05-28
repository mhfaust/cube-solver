import useTheme from '@/app/themes/useTheme';
import { BACK, BOTTOM, FaceColorCode, FaceName, FRONT, LEFT, RIGHT, TOP } from '@/logic/constants';
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

// There are 6 polygons (out of 150) that represent the flat part of 1 side of the RoundedBoxGeometry
// These occur in a regular position within the set of 150 for that side:
const facePolygonIndices = new Set([72, 73, 74, 75, 76, 77])

// RoundedBoxGeometry has 900 polygons, 150 x 6 = 1 set of 150 for each side
// This maps the start position within the object's blockGeometry
const faceColorPolygonStartIndex = {
  [RIGHT]: 0,
  [LEFT]: 150,
  [TOP]: 300,
  [BOTTOM]: 450,
  [FRONT]: 600,
  [BACK]: 750,
}
// const faceColorPolygonStartIndex = {
//   COLOR_A_1: 0,
//   COLOR_Z_1: 150,
//   COLOR_A_2: 300,
//   COLOR_Z_2: 450,
//   COLOR_A_3: 600,
//   COLOR_Z_3: 750,
// }

const RoundedBoxGeometryPolygonCount = 900;

export type BlockContainerRef = MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>

const r = createRef()

export type BlockProps = {
  initialFaceColors: Record<FaceName, FaceColorCode | null>,
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
  initialFaceColors, 
  containerRef, 
  onPointerDown, 
  onPointerUp,
  onPointerMove
}: BlockProps) => {

  const { frameColor, faceColors, blockGeometry } = useTheme()

  const blockRef = useRef<Mesh>({} as Mesh)

  const materialRef = useRef(new MeshStandardMaterial({ vertexColors: true }))

  useEffect (() => {
    blockRef.current.geometry = blockGeometry
    blockRef.current.material = materialRef.current
    
    let { count: polygonCount } = blockGeometry.attributes.position

    if(polygonCount !== RoundedBoxGeometryPolygonCount){
      throw Error(`Assumptions about RoundedBoxGeometry are invalid. Check for recent updates to that geometry`)
    }

    blockGeometry
      .setAttribute('color', new BufferAttribute(new Float32Array( polygonCount * 3 ), 3 ))

    /* color the faces  
     *   0 <= i < 150  -- COLOR_A_1 -- RIGHT side of initial cube
     * 150 <= i < 300  -- COLOR_Z_1 -- LEFT side of initial cube
     * 300 <= i < 450  -- COLOR_A_2 -- TOP side of initial cube
     * 450 <= i < 600  -- COLOR_Z_2 -- BOTTOM side of initial cube
     * 600 <= i < 750  -- COLOR_A_3 -- FRONT side of initial cube
     * 750 <= i < 900  -- COLOR_Z_3 -- BACK side of initial cube
     */

    Object.entries(initialFaceColors).forEach(([faceName, faceColorCode]) => {

      const startIndex = faceColorPolygonStartIndex[faceName as FaceName];
      const nextSideStart = startIndex + 150

      for(let i = startIndex; i < nextSideStart; i++){

        // if(!facePolygonIndices.has(i % 150)) {
        //   blockGeometry
        //     .attributes.color.setXYZ(i ,frameColor.r, frameColor.g, frameColor.b)
        // } else {
          // const colorIndex = Math.floor(i / 6) % 6 
          // const colorName = faceColors[faceColorCode]
          const paintColor = faceColorCode === null 
            ? frameColor
            : faceColors[faceColorCode]
          // if(
          //   //only color exposed sides:
          //   faceColor === faceColors.COLOR_A_1 && x0 === 2 ||
          //   faceColor === faceColors.COLOR_Z_1 && x0 === 0 ||
          //   faceColor === faceColors.COLOR_A_2 && y0 === 2 ||
          //   faceColor === faceColors.COLOR_Z_2 && y0 === 0 ||
          //   faceColor === faceColors.COLOR_A_3 && z0 === 2 || 
          //   faceColor === faceColors.COLOR_Z_3 && z0 === 0
          // ){
            blockGeometry.attributes.color.setXYZ(i ,paintColor.r, paintColor.g, paintColor.b)
          // }
        // }
      }
    })


  }, [blockGeometry, initialFaceColors, faceColors, frameColor.b, frameColor.g, frameColor.r, frameColor])

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