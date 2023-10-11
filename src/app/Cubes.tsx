import Cube from "./Cube"
import { Stats, OrbitControls } from '@react-three/drei'
import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from 'react'
import { Mesh, Object3D, Vector3, Quaternion } from "three"

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

const eyes = [0,1,2]

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



    const rotateXLayerPos = (x:0|1|2) => {
        const cubes = grid[x].flat().map(r => r.current)
        cubes.forEach(rotateXPositive)

        const newx00 = grid[x][0][2].current
        const newx01 = grid[x][1][2].current
        const newx02 = grid[x][2][2].current
        const newx10 = grid[x][0][1].current
        const newx11 = grid[x][1][1].current
        const newx12 = grid[x][2][1].current
        const newx20 = grid[x][0][0].current
        const newx21 = grid[x][1][0].current
        const newx22 = grid[x][2][0].current

        const newGrid = copyGrid(grid)
        newGrid[x][0][0].current = newx00
        newGrid[x][0][1].current = newx01
        newGrid[x][0][2].current = newx02
        newGrid[x][1][0].current = newx10
        newGrid[x][1][1].current = newx11
        newGrid[x][1][2].current = newx12
        newGrid[x][2][0].current = newx20
        newGrid[x][2][1].current = newx21
        newGrid[x][2][2].current = newx22
        setGrid(newGrid)
    }

    const rotateXLayerNeg = (x:0|1|2) => {
        const cubes = grid[x].flat().map(r => r.current)
        cubes.forEach(rotateXNegative)

        const newx00 = grid[x][2][0].current
        const newx01 = grid[x][1][0].current
        const newx02 = grid[x][0][0].current
        const newx10 = grid[x][2][1].current
        const newx11 = grid[x][1][1].current
        const newx12 = grid[x][0][1].current
        const newx20 = grid[x][2][2].current
        const newx21 = grid[x][1][2].current
        const newx22 = grid[x][0][2].current

        const newGrid = copyGrid(grid)
        newGrid[x][0][0].current = newx00
        newGrid[x][0][1].current = newx01
        newGrid[x][0][2].current = newx02
        newGrid[x][1][0].current = newx10
        newGrid[x][1][1].current = newx11
        newGrid[x][1][2].current = newx12
        newGrid[x][2][0].current = newx20
        newGrid[x][2][1].current = newx21
        newGrid[x][2][2].current = newx22
        setGrid(newGrid)
    }

    const rotateYLayerPos = (y: 0|1|2) => {
        const cubes = grid.map(layer => layer[y])
            .flat().map(r => r.current)
        cubes.forEach(rotateYPositive)

        const new0y0 = grid[2][y][0].current
        const new0y1 = grid[1][y][0].current
        const new0y2 = grid[0][y][0].current
        const new1y0 = grid[2][y][1].current
        const new1y1 = grid[1][y][1].current
        const new1y2 = grid[0][y][1].current
        const new2y0 = grid[2][y][2].current
        const new2y1 = grid[1][y][2].current
        const new2y2 = grid[0][y][2].current

        const newGrid = copyGrid(grid)
        newGrid[0][y][0].current = new0y0
        newGrid[0][y][1].current = new0y1
        newGrid[0][y][2].current = new0y2
        newGrid[1][y][0].current = new1y0
        newGrid[1][y][1].current = new1y1
        newGrid[1][y][2].current = new1y2
        newGrid[2][y][0].current = new2y0
        newGrid[2][y][1].current = new2y1
        newGrid[2][y][2].current = new2y2
        setGrid(newGrid)
    }

    const rotateYLayerNeg = (y: 0|1|2) => {
        const cubes = grid.map(layer => layer[y])
            .flat().map(r => r.current)
        cubes.forEach(rotateYNegative)

        const new0y0 = grid[0][y][2].current
        const new0y1 = grid[1][y][2].current
        const new0y2 = grid[2][y][2].current
        const new1y0 = grid[0][y][1].current
        const new1y1 = grid[1][y][1].current
        const new1y2 = grid[2][y][1].current
        const new2y0 = grid[0][y][0].current
        const new2y1 = grid[1][y][0].current
        const new2y2 = grid[2][y][0].current

        const newGrid = copyGrid(grid)
        newGrid[0][y][0].current = new0y0
        newGrid[0][y][1].current = new0y1
        newGrid[0][y][2].current = new0y2
        newGrid[1][y][0].current = new1y0
        newGrid[1][y][1].current = new1y1
        newGrid[1][y][2].current = new1y2
        newGrid[2][y][0].current = new2y0
        newGrid[2][y][1].current = new2y1
        newGrid[2][y][2].current = new2y2
        setGrid(newGrid)
    }

    const rotateZLayerPos = (z: 0|1|2) => {
        const cubes = grid.map(layer => layer.map(line => line[z]))
            .flat().map(r => r.current)
        cubes.forEach(rotateZPositive)

        const new00z = grid[0][2][z].current
        const new01z = grid[1][2][z].current
        const new02z = grid[2][2][z].current
        const new10z = grid[0][1][z].current
        const new11z = grid[1][1][z].current
        const new12z = grid[2][1][z].current
        const new20z = grid[0][0][z].current
        const new21z = grid[1][0][z].current
        const new22z = grid[2][0][z].current

        const newGrid = copyGrid(grid)
        newGrid[0][0][z].current = new00z
        newGrid[0][1][z].current = new01z
        newGrid[0][2][z].current = new02z
        newGrid[1][0][z].current = new10z
        newGrid[1][1][z].current = new11z
        newGrid[1][2][z].current = new12z
        newGrid[2][0][z].current = new20z
        newGrid[2][1][z].current = new21z
        newGrid[2][2][z].current = new22z
        setGrid(newGrid)
    }

    const rotateZLayerNeg = (z:0|1|2) => {
        const cubes = grid.map(layer => layer.map(line => line[z]))
            .flat().map(r => r.current)
        cubes.forEach(rotateZNegative)

        const new00z = grid[2][0][z].current
        const new01z = grid[1][0][z].current
        const new02z = grid[0][0][z].current
        const new10z = grid[2][1][z].current
        const new11z = grid[1][1][z].current
        const new12z = grid[0][1][z].current
        const new20z = grid[2][2][z].current
        const new21z = grid[1][2][z].current
        const new22z = grid[0][2][z].current

        const newGrid = copyGrid(grid)
        newGrid[0][0][z].current = new00z
        newGrid[0][1][z].current = new01z
        newGrid[0][2][z].current = new02z
        newGrid[1][0][z].current = new10z
        newGrid[1][1][z].current = new11z
        newGrid[1][2][z].current = new12z
        newGrid[2][0][z].current = new20z
        newGrid[2][1][z].current = new21z
        newGrid[2][2][z].current = new22z
        setGrid(newGrid)
    }

    const effects = [
        () => rotateZLayerNeg(1),
        () => rotateZLayerPos(2),
        () => rotateYLayerNeg(2),
        () => rotateZLayerNeg(0),
        () => rotateXLayerPos(2),
        () => rotateZLayerNeg(2),
        () => rotateXLayerNeg(1),
        () => rotateYLayerNeg(0),
        () => rotateYLayerPos(1),
        () => rotateXLayerNeg(2),
    ]

    useEffect(() => { effects[0] && setTimeout(effects[0], 0 * 500) }, [])
    useEffect(() => { effects[1] && setTimeout(effects[1], 1 * 500) }, [])
    useEffect(() => { effects[2] && setTimeout(effects[2], 2 * 500) }, [])
    useEffect(() => { effects[3] && setTimeout(effects[3], 3 * 500) }, [])
    useEffect(() => { effects[4] && setTimeout(effects[4], 4 * 500) }, [])
    useEffect(() => { effects[5] && setTimeout(effects[5], 5 * 500) }, [])
    useEffect(() => { effects[6] && setTimeout(effects[6], 6 * 500) }, [])
    useEffect(() => { effects[7] && setTimeout(effects[7], 7 * 500) }, [])
    useEffect(() => { effects[8] && setTimeout(effects[8], 8 * 500) }, [])
    useEffect(() => { effects[9] && setTimeout(effects[9], 9 * 500) }, [])

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