import { useRef, useState, useEffect } from 'react'
import { 
  Mesh, 
  BoxGeometry, 
  Color, 
  BufferAttribute,
  MeshBasicMaterial
} from 'three'

const red = new Color(1, 0, 0);
const green = new Color(0, 1, 0);
const blue = new Color(0, 0, 1);
const orange = new Color(.8, .2, 0)
const yellow = new Color(.5, .5, 0)
const white = new Color(1, 1, 1)

const colors = [red, orange, blue, green, white, yellow ]

type CubeProps = {
  x0: number; 
  y0: number; 
  z0: number; 
}
const Cube = ({ x0, y0, z0 }: CubeProps) => {
  
  const geometryRef = useRef(new BoxGeometry().toNonIndexed())
  const geometry = geometryRef.current
  const materialRef = useRef(new MeshBasicMaterial({ vertexColors: true }))
  const material = materialRef.current

    const [position, setPosition] = useState<[number, number, number]>(
      [x0, y0, z0]
    )
    const [x,y,z] = position

    useEffect (() => {
      let { count } = geometry.attributes.position
      geometry.setAttribute('color', new BufferAttribute(new Float32Array( count * 3 ), 3 ))

      for(let i = 0; i < count; i++){
        const color = colors[Math.floor(i / 6) % 6]
        geometry.attributes.color.setXYZ(i ,color.r, color.g, color.b)
      }
    }, [geometry])

    const ref = useRef<Mesh>({} as Mesh)

    return (
      <mesh
          ref={ref}
          position={[x,y,z]}
          geometry={geometry}
          material={material}
      >
      </mesh>
    )
}

export default Cube