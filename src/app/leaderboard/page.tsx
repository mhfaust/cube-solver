'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { CubeHistory, useRecordsStore } from '@/store/recordsSlice'
import { formatDate, reportTime } from '@/utils/displayTime';
import styles from './leaderboard.module.css'
import { byAscending, byDescending, CompareFunction } from '@/utils/sort';
import Link from 'next/link';
import MainNav from '@/components/MainNav';
import { countMutations } from '@/utils/history';
import { useState } from 'react';
import { clsx } from 'clsx';
import { routes, useNavigation } from '@/utils/useNavigation';

type SortByField = 'duration' | 'moves' | 'date';

// const sortStrategy: Record<SortByField, (game: CubeHistory, ) => 

export default function App() {

    const [sortby, setSortby] = useState<SortByField>('duration');
    const sortStrategy: Record<SortByField, CompareFunction<CubeHistory>> = {
        duration: byAscending(game => game.duration),
        moves: byAscending(game => countMutations(game.moves)),
        date: byDescending(game => game.startTime),
    }

    
    const { records } = useRecordsStore();
    const recordsSorted = records.slice(0).sort(sortStrategy[sortby])
    const mostRecentPlay = records.sort(byDescending(game => game.startTime))[0];
    const playedWithinPast10Minutes = Date.now() - mostRecentPlay.startTime < 10 * 60 * 1000;

    const { goto } = useNavigation();

    return (
        <NoSsr>
            <div className={styles.main}>
                <div className={styles.list}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th onClick={() => setSortby('duration')} className={styles.th}>Duration</th>
                                <th onClick={() => setSortby('moves')} className={styles.th}>Moves</th>
                                <th onClick={() => setSortby('date')} className={styles.th}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {recordsSorted.map(({ startTime, moves, duration, id }) => (
                            <tr key={startTime} className={clsx({ 
                                [styles.mostRecent]: startTime === mostRecentPlay.startTime && playedWithinPast10Minutes,
                            })}>
                                <td className={styles.td}>{reportTime(duration)}</td>
                                <td className={styles.td}><Link href={routes.gamePlay(id)}>{countMutations(moves)}</Link></td>
                                <td className={styles.td}>{formatDate(startTime)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <MainNav />
        </NoSsr>
    )
}