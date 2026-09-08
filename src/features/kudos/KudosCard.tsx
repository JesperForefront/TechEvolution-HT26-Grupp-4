import { useId } from 'react'
import { kudosCategoryLabels, type Kudos } from './kudos'
import { KudosTimestamp } from './KudosTimestamp'
import styles from './KudosCard.module.css'

interface KudosCardProps {
  kudos: Kudos
  hasSenderLeft: boolean
  hasRecipientLeft: boolean
  now: number
}

export function KudosCard({ kudos, hasSenderLeft, hasRecipientLeft, now }: KudosCardProps) {
  const headingId = useId()

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <header className={styles.header}>
        <div className={styles.recipient}>
          <span className={styles.avatar} aria-hidden="true">
            {kudos.toFirstName.slice(0, 1).toLocaleUpperCase('en')}
          </span>
          <div className={styles.recipientDetails}>
            <h3 className={styles.name} id={headingId}>
              <span className={styles.label}>To</span>
              {kudos.toFirstName}{' '}
              {hasRecipientLeft && <span className={styles.departure}>No longer works here</span>}
            </h3>
          </div>
        </div>
        <span className={styles.category}>{kudosCategoryLabels[kudos.category]}</span>
      </header>

      <p className={styles.message}>{kudos.message}</p>

      <footer className={styles.footer}>
        <div className={styles.sender}>
          <p className={styles.senderName}>
            From <strong>{kudos.fromFirstName}</strong>{' '}
            {hasSenderLeft && <span className={styles.departure}>No longer works here</span>}
          </p>
        </div>
        <KudosTimestamp createdAt={kudos.createdAt} now={now} />
      </footer>
    </article>
  )
}
