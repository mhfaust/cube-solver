'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import Cubes from './Cubes'

export default function App() {

  return (
    <Canvas  style={{width: 500, height: 500}}>
      <Cubes />
    </Canvas>
  )
}