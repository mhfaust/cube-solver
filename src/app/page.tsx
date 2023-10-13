'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import Cubes from './Cubes'

export default function App() {

  return (
    <Canvas  style={{width: '100vw', height: '100vh'}}>
      <Cubes />
    </Canvas>
  )
}