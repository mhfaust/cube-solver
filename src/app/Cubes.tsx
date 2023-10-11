import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { useThree } from "@react-three/fiber"
import { stat } from "fs/promises"
import { useEffect, useMemo, useRef, useState } from 'react'
import { Mesh, MeshBasicMaterial, Object3D, Vector3, Quaternion } from "three"

var q = new Quaternion();

function rotateAroundWorldAxis(
        object: Object3D, 
        point: Vector3, 
        axis: Vector3, 
        angle: number 
    ) {

    q.setFromAxisAngle( axis, angle );

    object.applyQuaternion( q );

    object.position.sub( point );
    object.position.applyQuaternion( q );
    object.position.add( point );

    return object;
}

const rotateXPositive = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, xAxis, Math.PI / 2)
const rotateXNegative = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, xAxis, -Math.PI / 2)
const rotateYPositive = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, yAxis, Math.PI / 2)
const rotateYNegative = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, yAxis, -Math.PI / 2)
const rotateZPositive = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, zAxis, Math.PI / 2)
const rotateZNegative = (cube: Object3D) => rotateAroundWorldAxis(cube, origin, zAxis, -Math.PI / 2)

//axes:
//x = red-axis
//y = green-axis
//z = blue-axis

const eyes = [0,1,2]
// const r = () => new MeshBasicMaterial({ vertexColors: true })

const xAxis = new Vector3(1, 0,0 ).normalize()
const yAxis = new Vector3(0, 1, 0).normalize()
const zAxis = new Vector3(0, 0, 1).normalize()
const origin = new Vector3(0, 0, 0).normalize()

function copyGrid<T> (grid: T[][][]) {
    return grid.map(dim2 => dim2.map(dim1 => dim1.slice()))
}

const Cubes = () => {
    const { scene } = useThree();
    const refs = [
        [
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)]
        ],
        [
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)]
        ],
        [
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)],
            [useRef({} as Mesh),useRef({} as Mesh),useRef({} as Mesh)]
        ],
    ]

    const [grid, setGrid] = useState(refs)

    // const gridRef = useRef(
    //     eyes.map(i => eyes.map(j => eyes.map(k => refs[i][j][k])))
    // )
    // const grid = gridRef.current


    // const rightCubes = grid[2].flat()
    // const leftCubes = grid[0].flat()
    // const upCubes = useMemo(() => grid.map(layer => layer[2]).flat(), [grid])
    // const downCubes = grid.map(layer => layer[0]).flat()
    // const frontCubes = grid.map(layer => layer.map(line => line[2])).flat()
    // const backCubes = grid.map(layer => layer.map(line => line[0])).flat()

    // useEffect(() => {
    //     gridRef.current.forEach(a => a.forEach(b => b.forEach(c => scene.add(c.current))))
    // }, [scene])

    const rotateUp = () => {
        grid.map(layer => layer[2])
            .flat().map(r => r.current)
            .forEach(rotateYPositive)

        const new020 = grid[0][2][0].current
        const new021 = grid[1][2][0].current
        const new022 = grid[2][2][0].current
        const new120 = grid[0][2][1].current
        const new121 = grid[1][2][1].current
        const new122 = grid[2][2][1].current
        const new220 = grid[0][2][2].current
        const new221 = grid[1][2][2].current
        const new222 = grid[2][2][2].current

        const newGrid = copyGrid(grid)
        newGrid[0][2][0].current =new020
        newGrid[0][2][1].current =new021
        newGrid[0][2][2].current =new022
        newGrid[1][2][0].current =new120
        newGrid[1][2][1].current =new121
        newGrid[1][2][2].current =new122
        newGrid[2][2][0].current =new220
        newGrid[2][2][1].current =new221
        newGrid[2][2][2].current =new222
        setGrid(newGrid)
    }

    const rotateRight = () => {
        const cubes = grid[2].flat().map(r => r.current)
        // cubes.forEach(c => c.visible = false)
        cubes.forEach(rotateXPositive)
        // const newGrid = copyGrid(grid)
        // newGrid[0][2][0].current = grid[0][2][2].current
        // newGrid[0][2][1].current = grid[1][2][2].current
        // newGrid[0][2][2].current = grid[2][2][2].current
        // newGrid[1][2][0].current = grid[0][2][1].current
        // newGrid[1][2][1].current = grid[1][2][1].current
        // newGrid[1][2][2].current = grid[2][2][1].current
        // newGrid[2][2][0].current = grid[0][2][0].current
        // newGrid[2][2][1].current = grid[1][2][0].current
        // newGrid[2][2][2].current = grid[2][2][0].current
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            rotateUp()
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, [])
    useEffect(() => {
        const timeout = setInterval(() => {
            rotateRight()
        }, 4000)
        return () => {
            clearInterval(timeout)
        }
    }, [])


    console.log('RENDER')
    return (<>
        <Stats />
        <OrbitControls />
        <axesHelper args={[5]} />
        {eyes.map(i => eyes.map(j => eyes.map(k =>(
            <Cube 
                key={`i:${i},j:${j},k:${k}`} 
                x0={i-1} 
                y0={j-1} 
                z0={k-1} 
                meshRef={refs[i][j][k]}
            />
        ))))}
     </>)
}

export default Cubes;