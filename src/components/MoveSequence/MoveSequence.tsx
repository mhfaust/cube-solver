import { CubeHistory } from "@/store/recordsSlice";
import { PropsWithChildren } from "react";
import ObliqueCube, { ObliqueCubeProps } from "../ObliqueCube/ObliqueCube";
import { CubeFaces } from "@/logic/newCube";
import { faceTransformsByNotation } from "@/logic/layerRotations/advancedNotation";
import Arrow from "./Arrow";
import { ThemeSlice } from "@/store/themeSlice";

type MoveSequenceProps = PropsWithChildren<{
    initialFaces: CubeFaces;
    sequence: CubeHistory['moves'];
    perspective: ObliqueCubeProps['perspective'];
    themeName?: ThemeSlice['themeName']
}>

const cubeSize = 30;

const MoveSequence = ({ initialFaces, sequence, perspective, themeName = 'dark' }: MoveSequenceProps) => {
    if(!sequence.length) {
        return (
            <ObliqueCube 
                faces={initialFaces} 
                perspective={perspective}
                themeName={themeName}
                height={cubeSize}
                width={cubeSize}
            />
        );
    }
    const [nextMove, ...subsequentMoves] = sequence;
    const nextFaces = faceTransformsByNotation[nextMove.moveCode](initialFaces);

    return (
        <>
            <div style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <ObliqueCube 
                    faces={initialFaces} 
                    perspective={perspective} 
                    themeName={themeName}
                    height={cubeSize}
                    width={cubeSize}
                />
                <Arrow 
                    width={30}
                    moveCode={sequence[0].moveCode} 
                />
            </div>
            <MoveSequence 
                initialFaces={nextFaces} 
                sequence={subsequentMoves} 
                perspective={perspective} 
                themeName={themeName}
            />
        </>
    );
}

export default MoveSequence;