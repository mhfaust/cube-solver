import clsx from 'clsx'
import styles from '../page.module.css'
import useAppStore, { actionsSelector, isOpenSelector, messagesSelector } from '../store/useAppStore'
import { useEffect, useRef } from 'react'


const Log = () => {
  
  const { toggleLog: toggle } = useAppStore(actionsSelector)
  const isOpen = useAppStore(isOpenSelector)
  const messages = useAppStore(messagesSelector)
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
        [styles.open]: isOpen
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
      onClick={toggle}
      className={styles.logToggle}
    >{isOpen ? "↑ Log" : "↓ Log"}</div>
  </>
  )
}

export default Log