import useTheme from '@/themes/useThemeAssets';
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

    const buffer = new BufferAttribute(new Float32Array( polygonCount * 3 ), 3 )
    blockGeometry.setAttribute('color', buffer)
      
    Object.entries(initialFaceColors).forEach(([faceName, faceColorCode]) => {
  
      /* color the faces  
        *   0 <= i < 150  -- RIGHT side of RoundedBoxGeometry
        * 150 <= i < 300  -- LEFT side of RoundedBoxGeometry
        * 300 <= i < 450  -- TOP side of RoundedBoxGeometry
        * 450 <= i < 600  -- BOTTOM side of RoundedBoxGeometry
        * 600 <= i < 750  -- FRONT side of RoundedBoxGeometry
        * 750 <= i < 900  -- BACK side of RoundedBoxGeometry
        */

      const startIndex = faceColorPolygonStartIndex[faceName as FaceName];
      const nextSideStart = startIndex + 150

      for(let i = startIndex; i < nextSideStart; i++){

        if(!facePolygonIndices.has(i % 150) || faceColorCode === null) {
          blockGeometry
            .attributes.color.setXYZ(i ,frameColor.r, frameColor.g, frameColor.b)
        } 
        else {
          const paintColor = faceColors[faceColorCode];
          blockGeometry.attributes.color.setXYZ(i ,paintColor.r, paintColor.g, paintColor.b);
        }
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
        />
    </mesh>
  )
}

export default Block