import { CubeHistory } from "@/store/recordsSlice";
import { PropsWithChildren } from "react";
import SkewedCubeFacesSvg, { ObliqueCubeProps } from "../ObliqueCube/ObliqueCube";
import { CubeFaces } from "@/logic/newCube";
import { faceTransformsByNotation } from "@/logic/layerRotations/advancedNotation";
import Arrow from "./Arrow";

type MoveSequenceProps = PropsWithChildren<{
    initialFaces: CubeFaces;
    sequence: CubeHistory['moves']
    perspective: ObliqueCubeProps['perspective']
}>

const MoveSequence = ({ initialFaces, sequence, perspective }: MoveSequenceProps) => {
    if(!sequence.length) {
        return (
            <SkewedCubeFacesSvg 
                faces={initialFaces} 
                perspective={perspective}
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
                <SkewedCubeFacesSvg 
                    faces={initialFaces} 
                    perspective={perspective} 
                />
                <Arrow moveCode={sequence[0].moveCode} />
            </div>
            <MoveSequence 
                initialFaces={nextFaces} 
                sequence={subsequentMoves} 
                perspective={perspective} 
            />
        </>
    );
}

export default MoveSequence;