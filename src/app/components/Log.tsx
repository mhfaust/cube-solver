import styles from '@/app/page.module.css'
import { useActions } from '@/app/store/useAppStore'
import { useIsLogOpen, useMessages } from "../store/selectors"
import clsx from 'clsx'
import { useEffect, useRef } from 'react'


const Log = () => {
  
  const { toggleLog } = useActions()
  const isLogOpen = useIsLogOpen()
  const messages = useMessages()
  const logDiv = useRef<HTMLDivElement | null>(null);

  //always scroll to bottom on new message:
  useEffect(() => {
    if(logDiv.current){
      logDiv.current.scrollTop = logDiv.current.scrollHeight
    }
  }, [messages])

  return (<>
    <div 
      className={clsx(styles.log, { 
        [styles.open]: isLogOpen
      })}
      ref={logDiv}
    >
      {messages.map((msg, i) => (
        <div key={i} className={styles.logMessage}>
          {i}{".) "}{msg}
        </div>
      ))}
    </div>
    <div 
      onClick={toggleLog}
      className={styles.logToggle}
    >{isLogOpen ? "↓ Log" : "↑ Log"}</div>
  </>
  )
}

export default Log