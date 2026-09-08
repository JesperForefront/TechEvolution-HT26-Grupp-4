import { useState } from 'react'
import type { Colleague } from '../features/colleagues/colleague'
import { colleagues } from '../features/colleagues/colleagues'
import { CurrentUserSelector } from '../features/current-user/CurrentUserSelector'
import { KudosFeed } from '../features/kudos/KudosFeed'
import { sampleKudos } from '../features/kudos/kudos-data'
import styles from './App.module.css'

function App() {
  const [currentUserId, setCurrentUserId] = useState<Colleague['id'] | null>(null)

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
          <span className={styles.brandName}>Kudos Wall</span>
        </div>
        <span className={styles.headerNote}>A place for appreciation</span>
      </header>

      <main className={styles.main}>
        <div className={styles.boardHeader}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}>Good people. Great teamwork.</p>
            <h1>
              Great work deserves
              <br />
              <span>a little recognition.</span>
            </h1>
          </div>

          <CurrentUserSelector
            colleagues={colleagues}
            currentUserId={currentUserId}
            onCurrentUserChange={setCurrentUserId}
          />
        </div>
        <KudosFeed kudos={sampleKudos} colleagues={colleagues} />
      </main>
    </div>
  )
}

export default App
