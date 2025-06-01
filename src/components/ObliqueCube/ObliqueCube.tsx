import { BOTTOM, FaceName, LEFT, RIGHT, TOP } from "@/logic/constants";
import { CubeFaces } from "@/logic/newCube";
import useTheme from "@/themes/useThemeAssets";

type ObliquePerspective = `${typeof TOP | typeof BOTTOM}-${typeof LEFT | typeof RIGHT}`;

export type ObliqueCubeProps = {
    faces: CubeFaces;
    perspective: ObliquePerspective;
}

const ObliqueCube = ({ faces, perspective }: ObliqueCubeProps) => {
    
    const { faceColors, frameColor } = useTheme()
    const perspectiveParts = perspective.split('-') as [FaceName, FaceName];
    
    const aSide: FaceName = 'front';
    const cSide = perspectiveParts[0]; 
    const bSide = perspectiveParts[1];
    
    // The un-transformed SVG shows a cube viewed obliquely from the top-right
    // So I transform (flip) it in either dimension as needed:
    const flipVertically = cSide === BOTTOM;
    const flipHorizontally = bSide === LEFT;

    const vScale = flipVertically ? -1 : 1;
    const hScale = flipHorizontally ? -1 : 1;

    // ...and if I flip the SVG I'll also need to invert the row/col selections to paint the tiles correctly:
    const transformRow = (i: 0|1|2) => flipVertically ? 2 - i: i;
    const transformCol = (j: 0|1|2) => flipHorizontally ? 2 - j : j;

    const tileColorHex = (face: FaceName, row: 0|1|2, col: 0|1|2) =>  {
        return `#${faceColors[faces[face][transformRow(row)][transformCol(col)]].getHexString()}`
    }

    const frameColorHex = `#${frameColor.getHexString()}`;

    return (
        <svg 
            version="1.1" 
            viewBox="0 0 840 828"  
            xmlns="http://www.w3.org/2000/svg" 
            style={{height: '70px', width: '70px'}}
            transform={`scale(${hScale}, ${vScale})`}
        >
            <path id="cube-frame" fill={frameColorHex} d="M413 16l-41 18-9 4-103-5-40-2-10-1-3-1-9 4-2 2-4 2 136 7h19v2l-9 3-43 19-5 2-79-4-74-4-7-1-4-1-9 4-2 1v2l-4 2 147 8 14 1-63 28-25-1-139-8-6-1-4-1-10 4-5 4-5 8-1 6v18l6 148 1 18 3 10 4 5 7 4 2 1-9 7-4 7-1 5v18l6 147 1 13 4 11 6 5 4 3-6 4-5 8-1 4v26l6 145 4 11 5 5 8 4 64 8 92 11h16l11-6 3-3 6 9 10 5 20 3 151 18 9-1 9-6 6-5 1 6 4 5 7 4 6 2 174 21 13-2 7-4 11-15 22-32 14-20 1-6-5 5-28 40-8 11v-25l3-131 1-16 13-16 11-14 14-17 4-5-4 153v13l6-4 11-15 13-19 14-20 3-5-1-4-13 18-22 32 1-49 3-107 2-10 12-14 11-14 13-16-5 158 5-3 8-10 7-11 12-17 10-14 1-6-4 4-16 23-12 17v2h-2l1-2 5-153 10-13 13-16 11-14-1-11-7-8 2-4 6-9 1-5-5 4-9 11-11 13-8 10v-21l4-123 1-18 8-8 8-7 17-17 1-6-2-8-8-7 6-7 4-6 1-6-8 6-14 14-8 7-5 4 1-2 5-154 1-13 19-14 15-11-1-10-4-6-6-4-9-2-11 8-19 13-4 3h-12l-140-7-14-1 23-13 14-8v-1h-5l-13 7-2-4-5-4-7-2-6 1-41 22-143-7-16-1 39-18 5-2-4-1-9 4-4-1-5-4-7-2z"/>
            
            <g id='front-face'>
                <path fill={tileColorHex(aSide,0,0)} transform="translate(27,124)" d="m0 0h16l150 9 6 1 1 12 3 131v40h-11l-155-12-3-1-3-70-4-102z" />
                <path fill={tileColorHex(aSide,0,1)} transform="translate(243,137)" d="m0 0h17l149 9 13 1 1 187h-12l-155-12-10-1-2-94-1-54z" />
                <path fill={tileColorHex(aSide,0,2)} transform="translate(468,150)" d="m0 0 25 1 149 9 13 1v18l-3 150-1 23-21-1-155-12-8-1v-114z" />
                <path fill={tileColorHex(aSide,1,0)} transform="translate(36,348)" d="m0 0 64 5 98 8 6 1 1 2 3 132v42l-43-4-122-12-1-6-6-153z" />
                <path fill={tileColorHex(aSide,1,1)} transform="translate(247,366)" d="m0 0h12l159 13 5 1v179l-18-1-152-15-3-1-3-155z" />
                <path fill={tileColorHex(aSide,1,2)} transform="translate(467,384)" d="m0 0h12l171 14v30l-3 150-1 3-25-2-152-15-2-1z" />
                <path fill={tileColorHex(aSide,2,0)} transform="translate(44,564)" d="m0 0 18 1 147 15 1 1 3 123 1 45h-9l-56-7-93-11-5-1-1-8z" />
                <path fill={tileColorHex(aSide,2,1)} transform="translate(251,585)" d="m0 0h9l156 16 7 1 1 109v63l-17-1-151-18-2-1-1-34-2-107z" />
                <path fill={tileColorHex(aSide,2,2)} transform="translate(466,607)" d="m0 0 18 1 55 6 106 11 1 3-3 149-1 23-13-1-126-15-37-4z" />
            </g>
            <g id='b-face'>
                <path fill={tileColorHex(bSide,0,0)} transform="translate(727,126)" d="m0 0h3l-4 152-1 28-20 20-8 7-11 11-6 4v-18l4-171 5-5 14-10 19-14z" />
                <path fill={tileColorHex(bSide,0,1)} transform="translate(778,89)" d="m0 0h2l-1 40-4 127-2 5-14 14-8 7-10 10-6 4v-20l4-143 1-16 17-13 14-10z" />
                <path fill={tileColorHex(bSide,0,2)} transform="translate(823,56)" d="m0 0h1v23l-5 138-5 6-8 7-10 10-8 7-3 3h-2l5-156 1-13 13-10 18-13z" />
                <path fill={tileColorHex(bSide,1,0)} transform="translate(722,351)" d="m0 0h1v38l-3 111-1 25-10 11-9 11-11 13-9 11-5 5v-28l3-131 1-23z" />
                <path fill={tileColorHex(bSide,1,1)} transform="translate(772,301)" d="m0 0h1v18l-4 126-1 21-12 14-9 11-12 14-5 6h-1v-21l4-143 1-8z" />
                <path fill={tileColorHex(bSide,1,2)} transform="translate(816,258)" d="m0 0h1v17l-5 138-9 11-11 13-9 11-5 6h-1v-22l4-123 1-18 9-9 8-7z" />
                <path fill={tileColorHex(bSide,2,0)} transform="translate(717,567)" d="m0 0h1l-4 154-1 13-12 17-28 40-3 3v-27l3-131 1-16 13-16 11-14 14-17z" />
                <path fill={tileColorHex(bSide,2,1)} transform="translate(766,506)" d="m0 0 1 3-5 154-7 11-12 17-14 20-5 7h-1l1-50 3-107 2-10 12-14 11-14 13-16z" />
                <path fill={tileColorHex(bSide,2,2)} transform="translate(809,452)" d="m0 0h1v19l-4 112-1 19-13 19-14 20-6 9h-2l5-155 10-13 13-16z" />
            </g>
            <g id='c-face'>            
                <path fill={tileColorHex(cSide,0,0)} transform="translate(265,8)" d="m0 0 49 2 100 5-3 3-30 13-18 8-103-5-40-2-11-1 1-2 50-19z" />
                <path fill={tileColorHex(cSide,0,1)} transform="translate(451,17)" d="m0 0 31 1 124 6-3 3-41 22-160-8 3-3 37-17z" />
                <path fill={tileColorHex(cSide,0,2)} transform="translate(645,26)" d="m0 0 109 5 42 2 8 1-5 5-12 8-17 12h-12l-140-7-15-1 4-4 29-16z" />
                <path fill={tileColorHex(cSide,1,0)} transform="translate(190,37)" d="m0 0h20l137 7v2l-43 19-14 6-79-4-74-4-10-1 3-2 52-20z" />
                <path fill={tileColorHex(cSide,1,1)} transform="translate(385,47)" d="m0 0h21l138 7 5 1-5 4-25 13-18 10-28-1-131-7-10-1 3-3 37-17z" />
                <path fill={tileColorHex(cSide,1,2)} transform="translate(589,57)" d="m0 0h14l155 8-1 3-15 10-23 16-78-4-94-5-4-2 29-16z" />
                <path fill={tileColorHex(cSide,2,0)} transform="translate(109,68)" d="m0 0 149 8 15 1-3 3-41 18-20 9-25-1-139-8-9-1 3-2 52-20z" />
                <path fill={tileColorHex(cSide,2,1)} transform="translate(313,80)" d="m0 0h19l147 8 7 1-4 3-28 15-24 13-176-10-2-2 39-18z" />
                <path fill={tileColorHex(cSide,2,2)} transform="translate(529,91)" d="m0 0 61 3 110 6 7 1-4 4-35 24-6 4-25-1-157-9-4-2 23-13 25-14z" />
            </g>                
        </svg>
    );
};

export default ObliqueCube;