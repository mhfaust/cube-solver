'use client'

import { Stats, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import Cube from './Cube'
import Cubes from './Cubes'
import THREE, { Mesh, Object3DEventMap, Vector3 } from 'three'

export default function App() {

  return (
    <Canvas  style={{width: 500, height: 500}}>
      <Cubes />
      
    </Canvas>
  )
}