import styles from '@/app/page.module.css'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useLoggerStore } from '../store/loggerSlice'


const Log = () => {
  
  const { toggleLog, messages, logIsOpen } = useLoggerStore()
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
        [styles.open]: logIsOpen
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
    >{logIsOpen ? "↓ Log" : "↑ Log"}</div>
  </>
  )
}

export default Log