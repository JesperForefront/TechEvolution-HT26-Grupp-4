import { useEffect, useId, useState } from 'react'
import type { Colleague } from '../colleagues/colleague'
import type { Kudos } from './kudos'
import { KudosCard } from './KudosCard'
import styles from './KudosFeed.module.css'

interface KudosFeedProps {
  kudos: readonly Kudos[]
  colleagues: readonly Colleague[]
}

export function KudosFeed({ kudos, colleagues }: KudosFeedProps) {
  const headingId = useId()
  const [now, setNow] = useState(Date.now)
  const sortedKudos = [...kudos].sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt))
  const colleagueIds = new Set(colleagues.map(({ id }) => id))

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className={styles.feed} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h2 className={styles.heading} id={headingId}>Latest kudos</h2>
        <p className={styles.order}>Newest first</p>
      </header>

      {sortedKudos.length === 0 ? (
        <div className={styles.empty}>
          <h3 className={styles.emptyHeading}>No kudos yet.</h3>
          <p className={styles.emptyMessage}>A little appreciation goes a long way.</p>
        </div>
      ) : (
        <ol className={styles.list} role="list">
          {sortedKudos.map((kudos) => (
            <li key={kudos.id}>
              <KudosCard
                kudos={kudos}
                hasSenderLeft={!colleagueIds.has(kudos.from)}
                hasRecipientLeft={!colleagueIds.has(kudos.to)}
                now={now}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
