
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { useRecordsStore } from '@/store/recordsSlice'
import { formatDate, reportTime } from '@/utils/displayTime';
import styles from './game-plays.module.css'
import { byAscending, byDescending } from '@/utils/sort';
import Link from 'next/link';
import MainNav from '@/components/MainNav';
import { countMutations } from '@/utils/history';

export default function App() {

    const { records } = useRecordsStore();
    const recordsByDuration = records.slice(0).sort(byAscending(record => record.duration))
    const recordsByStartTime = records.slice(0).sort(byDescending(record => record.startTime))
    const latestGame = recordsByStartTime[0];

    return (
        <NoSsr>
            <div className={styles.main}>
                <div style={{
                    width:'500px', 
                    // height:'100%',
                    margin: 'auto', 
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"stretch"
                }}>
                    {recordsByDuration.map(({ startTime, moves, duration }) => (
                        <div key={startTime} style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}>
                            <span>{formatDate(startTime)}, &mdash; {countMutations(moves)} moves</span>
                            <span>{reportTime(duration)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <MainNav />
        </NoSsr>
    )
}