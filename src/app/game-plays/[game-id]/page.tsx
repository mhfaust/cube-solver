
'use client'

import NoSsr from '@/components/NoSsr/NoSsr'
import { useRecordsStore } from '@/store/recordsSlice'
import Link from 'next/link';
import MoveSequence from '@/components/MoveSequence';
import { useParams } from 'next/navigation';
import styles from './game-play.module.css'

export default function App() {

    const { records } = useRecordsStore();
    const gameId = useParams()?.['game-id'];

    const game = records.find(game => game.id === gameId);

    if(!game) {
        return null;
    }

    return (
        <NoSsr>
            <div className={styles.main}>
                <Link href="/">Back to Cube</Link>
                <div style={{
                    width:'500px', 
                    margin: 'auto', 
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"stretch"
                }}>
                </div>
                <div>
                    <span></span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '1rem',
                    margin: 'auto'
                }}>
                    <MoveSequence 
                        initialFaces={game.initialState} 
                        sequence={game.moves} 
                        perspective='top-right'
                        themeName={game.themeName}
                    />
                </div>
            </div>
        </NoSsr>
    )
}