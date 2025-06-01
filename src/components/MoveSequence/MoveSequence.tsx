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

const MoveSequence = ({ initialFaces, sequence, perspective, themeName = 'dark' }: MoveSequenceProps) => {
    if(!sequence.length) {
        return (
            <ObliqueCube 
                faces={initialFaces} 
                perspective={perspective}
                themeName={themeName}
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
                />
                <Arrow moveCode={sequence[0].moveCode} />
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