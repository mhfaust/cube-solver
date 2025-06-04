
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { CubeHistory, useRecordsStore } from '@/store/recordsSlice'
import { formatDate, reportTime } from '@/utils/displayTime';
import styles from './game-plays.module.css'
import { byAscending, byDescending, CompareFunction } from '@/utils/sort';
import Link from 'next/link';
import MainNav from '@/components/MainNav';
import { countMutations } from '@/utils/history';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigation } from '@/utils/useNavigation';

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

    const { goto } = useNavigation();

    return (
        <NoSsr>
            <div className={styles.main}>
                <div className={styles.list}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => setSortby('duration')}>Duration</th>
                                <th onClick={() => setSortby('moves')}>Moves</th>
                                <th onClick={() => setSortby('date')}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {recordsSorted.map(({ startTime, moves, duration, id }) => (
                            <tr key={startTime} className={styles.item} onClick={() => goto.gamePlay(id)}>
                                <td>{reportTime(duration)}</td>
                                <td>{countMutations(moves)}</td>
                                <td>{formatDate(startTime)}</td>
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