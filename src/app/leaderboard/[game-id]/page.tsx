
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { useRecordsStore } from '@/store/recordsSlice'
import Link from 'next/link';
import MoveSequence from '@/components/MoveSequence';
import { useParams } from 'next/navigation';
import styles from './game-play.module.css'
import PerspectiveControl from '@/components/PerspectiveControl';
import { useState } from 'react';
import { ObliquePerspective } from '@/components/ObliqueCube/ObliqueCube';
import { formatDate, reportTime } from '@/utils/displayTime';
import MainNav from '@/components/MainNav';
import { countMutations } from '@/utils/history';

export default function App() {

    const { records } = useRecordsStore();
    const gameId = useParams()?.['game-id'];

    const game = records.find(game => game.id === gameId);


    const [perspective, setPerspective] = useState<ObliquePerspective>('top-right')


    if(!game) {
        return null;
    }

    return (
        <NoSsr>
            <div className={styles.main}>
                <div className={styles.gameHeader}>
                    <div className={styles.headerText}>
                        <div className={styles.title}>{formatDate(game.moves[game.moves.length - 1].moveTime)}</div>
                        <div >{`${countMutations(game.moves)}`} moves, {reportTime(game.duration)}</div>
                    </div>
                    <PerspectiveControl perspective={perspective} setPerspective={setPerspective}/>
                </div>
                <div className={styles.moveSequence}>
                    <MoveSequence 
                        initialFaces={game.initialState} 
                        sequence={game.moves} 
                        perspective={perspective}
                        themeName={game.themeName}
                    />
                </div>
            </div>
            <MainNav />
        </NoSsr>
    )
}