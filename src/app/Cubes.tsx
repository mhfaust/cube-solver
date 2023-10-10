import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

//axes:
//x = red-axis
//y = green-axis
//z = blue-axis

const Cubes = () => {

    return (<>
        <Stats />
        <OrbitControls />
        <axesHelper args={[5]} />
        <Cube x0={-1} y0={-1} z0={-1}/>
        <Cube x0={-1} y0={-1} z0={0}/>
        <Cube x0={-1} y0={-1} z0={1}/>
        <Cube x0={-1} y0={0} z0={-1}/>
        <Cube x0={-1} y0={0} z0={0}/>
        <Cube x0={-1} y0={0} z0={1}/>
        <Cube x0={-1} y0={1} z0={-1}/>
        <Cube x0={-1} y0={1} z0={0}/>
        <Cube x0={-1} y0={1} z0={1}/>

        <Cube x0={0} y0={-1} z0={-1}/>
        <Cube x0={0} y0={-1} z0={0}/>
        <Cube x0={0} y0={-1} z0={1}/>
        <Cube x0={0} y0={0} z0={-1}/>
        <Cube x0={0} y0={0} z0={0}/>
        <Cube x0={0} y0={0} z0={1}/>
        <Cube x0={0} y0={1} z0={-1}/>
        <Cube x0={0} y0={1} z0={0}/>
        <Cube x0={0} y0={1} z0={1}/>

        <Cube x0={1} y0={-1} z0={-1}/>
        <Cube x0={1} y0={-1} z0={0}/>
        <Cube x0={1} y0={-1} z0={1}/>
        <Cube x0={1} y0={0} z0={-1}/>
        <Cube x0={1} y0={0} z0={0}/>
        <Cube x0={1} y0={0} z0={1}/>
        <Cube x0={1} y0={1} z0={-1}/>
        <Cube x0={1} y0={1} z0={0}/>
        <Cube x0={1} y0={1} z0={1} />
     </>)
}

export default Cubes;