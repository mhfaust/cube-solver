
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { useRecordsStore } from '@/store/recordsSlice'
import { formatDate, reportTime } from '@/utils/displayTime';
import styles from './game-plays.module.css'
import { byAscending, byDescending } from '@/utils/sort';
import Link from 'next/link';
import { useCubeStore } from '@/store/cubeSlice';
import MoveSequence from '@/components/MoveSequence';

export default function App() {

    const { initialState, faces, moves } = useCubeStore();
    const { records } = useRecordsStore();
    const recordsByDuration = records.toSorted(byAscending(record => record.duration))
    const recordsByStartTime = records.toSorted(byDescending(record => record.startTime))
    const latestGame = recordsByStartTime[0];

    return (
        <NoSsr>
            <div className={styles.main}>
                <Link href="/">Back to Cube</Link>
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
                            <span>{formatDate(startTime)}, &mdash; {moves.length} moves</span>
                            <span>{reportTime(duration)}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <span></span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    margin: 'auto'
                }}>
                    <MoveSequence initialFaces={latestGame.initialState} sequence={latestGame.moves} perspective='bottom-left'/>
                </div>
                {/* <SkewedCubeFaces faces={faces} perspective='bottom-right'/>
                <SkewedCubeFaces faces={faces} perspective='bottom-left'/>
                <br/>
                <SkewedCubeFaces faces={faces} perspective='top-right'/>
                <SkewedCubeFaces faces={faces} perspective='top-left'/> */}
            </div>
        </NoSsr>
    )
}