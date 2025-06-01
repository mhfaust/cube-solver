import { BOTTOM, FaceName, LEFT, RIGHT, TOP } from "@/logic/constants";
import { ObliquePerspective } from "../ObliqueCube/ObliqueCube";
import { EventHandler, MouseEventHandler, ReactSVGElement } from "react";

type PerspectiveArrowProps = {
    perspective: ObliquePerspective;
    className: string;
    onClick: MouseEventHandler<SVGSVGElement>
}

const PerspectiveArrow = ({ perspective, className, onClick }: PerspectiveArrowProps) => {
    const [v, h] = perspective.split('-') as [FaceName, FaceName];
    const vScale = v === BOTTOM ? -1 : 1;
    const hScale = h === LEFT ? -1 : 1;

    return (
        <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 256 256"
            transform={`scale(${hScale}, ${vScale})`}
            className={className}
            onClick={onClick}
        >
            <defs>
            </defs>
                <path id="upper-right-perspective" d="M105.6,57.6l-47.5,47.5L34.1,81.1L10,57v94.4v94.4h94.4h94.4l-24.1-24.1l-24.1-24.1l47.6-47.6l47.6-47.6l-46.2-46.2c-25.4-25.4-46.3-46.2-46.4-46.2C153.2,10.1,131.8,31.5,105.6,57.6z"/>

        </svg>
    )
}

export default PerspectiveArrow;