import { useEffect, useState } from 'react'
import type { Colleague } from '../features/colleagues/colleague'
import { colleagues } from '../features/colleagues/colleagues'
import { CurrentUserSelector } from '../features/current-user/CurrentUserSelector'
import { KudosComposer } from '../features/kudos/KudosComposer'
import { KudosFeed } from '../features/kudos/KudosFeed'
import { MAX_MESSAGE_LENGTH, type Kudos } from '../features/kudos/kudos'
import { sampleKudos } from '../features/kudos/kudos-data'
import { getKudosStarvedIds } from '../features/kudos/get-kudos-starved-ids'
import styles from './App.module.css'

function App() {
  const [currentUserId, setCurrentUserId] = useState<Colleague['id'] | null>(null)
  const [kudos, setKudos] = useState<readonly Kudos[]>(sampleKudos)
  const [now, setNow] = useState(Date.now)
  const kudosStarvedIds = getKudosStarvedIds(colleagues, kudos, now)

  function handleEditMessage(kudosId: Kudos['id'], message: string) {
    if (!currentUserId || message.length > MAX_MESSAGE_LENGTH) return

    setKudos((current) => current.map((kudos) => (
      kudos.id === kudosId && kudos.from === currentUserId
        ? { ...kudos, message }
        : kudos
    )))
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="m12 7 1.2 2.8L16 11l-2.8 1.2L12 15l-1.2-2.8L8 11l2.8-1.2Z" fill="currentColor" />
            </svg>
          </span>
          <h1 className={styles.brandName}>Kudos Wall</h1>
        </div>
        <span className={styles.headerNote}>A place for appreciation</span>
      </header>

      <main className={styles.main}>
        <div className={styles.boardHeader}>
          <CurrentUserSelector
            colleagues={colleagues}
            currentUserId={currentUserId}
            onCurrentUserChange={setCurrentUserId}
          />
          <KudosComposer
            colleagues={colleagues}
            kudosStarvedIds={kudosStarvedIds}
            currentUserId={currentUserId}
            onSend={(newKudos) => setKudos((current) => [newKudos, ...current])}
          />
        </div>
        <KudosFeed
          kudos={kudos}
          colleagues={colleagues}
          currentUserId={currentUserId}
          onEditMessage={handleEditMessage}
          now={now}
        />
      </main>
    </div>
  )
}

export default App
