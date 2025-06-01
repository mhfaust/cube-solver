import { useState } from "react";
import { ObliquePerspective } from "../ObliqueCube/ObliqueCube";
import PerspectiveArrow from "../PerspectiveArrow";
import { clsx } from "clsx";
import styles from './PerspectiveControl.module.css'

type PerspectiveControlProps = {
    perspective: ObliquePerspective;
    setPerspective: (p: ObliquePerspective) => void;
}

const PerspectiveControl = ({
    perspective,
    setPerspective
}: PerspectiveControlProps) => {

    return (
        <div className={styles.perspectiveControl} >
            <div className={styles.row}>
                <PerspectiveArrow  
                    perspective="top-left"
                    className={clsx(styles.arrow, {[styles.selected]: perspective==='top-left' })}
                    onClick={() => setPerspective("top-left")}
                />
                <PerspectiveArrow  
                    perspective="top-right"
                    className={clsx(styles.arrow, {[styles.selected]: perspective==='top-right' })}
                    onClick={() => setPerspective("top-right")}
                />
            </div>
            <div className={styles.row}>
                <PerspectiveArrow  
                    perspective="bottom-left"
                    className={clsx(styles.arrow, {[styles.selected]: perspective==='bottom-left' })}
                    onClick={() => setPerspective("bottom-left")}
                />
                <PerspectiveArrow  
                    perspective="bottom-right"
                    className={clsx(styles.arrow, {[styles.selected]: perspective==='bottom-right' })}
                    onClick={() => setPerspective("bottom-right")}
                />
            </div>
        </div>
    )
}

export default PerspectiveControl;