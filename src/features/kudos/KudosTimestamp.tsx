import { formatKudosTime } from './format-kudos-time'
import styles from './KudosTimestamp.module.css'

interface KudosTimestampProps {
  createdAt: string
  now: number
}

export function KudosTimestamp({ createdAt, now }: KudosTimestampProps) {
  const { relativeTime, exactTime } = formatKudosTime(createdAt, now)

  return (
    <details className={styles.timestamp}>
      <summary className={styles.summary} aria-label={`${relativeTime}. Show exact date and time`}>
        <time dateTime={createdAt} title={exactTime}>{relativeTime}</time>
      </summary>
      <p className={styles.exactTime}>{exactTime}</p>
    </details>
  )
}
