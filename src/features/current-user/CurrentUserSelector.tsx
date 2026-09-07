import { useId } from 'react'
import type { Colleague } from '../colleagues/colleague'
import styles from './CurrentUserSelector.module.css'

interface CurrentUserSelectorProps {
  colleagues: readonly Colleague[]
  currentUserId: Colleague['id'] | null
  onCurrentUserChange: (colleagueId: Colleague['id']) => void
}

export function CurrentUserSelector({
  colleagues,
  currentUserId,
  onCurrentUserChange,
}: CurrentUserSelectorProps) {
  const selectorId = useId()
  const headingId = `${selectorId}-heading`
  const hasColleagues = colleagues.length > 0
  const selectedColleague = colleagues.find((colleague) => colleague.id === currentUserId)

  return (
    <section className={styles.picker} aria-labelledby={headingId}>
      <h2 className={styles.heading} id={headingId}>Who’s here today?</h2>
      <label className={styles.label} htmlFor={selectorId}>Your name</label>
      <div className={styles.selectWrapper}>
        <select
          id={selectorId}
          className={styles.select}
          value={selectedColleague?.id ?? ''}
          disabled={!hasColleagues}
          onChange={(event) => onCurrentUserChange(event.currentTarget.value)}
        >
          <option value="" disabled>
            {hasColleagues ? 'Choose your name' : 'No colleagues available'}
          </option>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>{colleague.name}</option>
          ))}
        </select>
      </div>
      <p className={styles.selectionDetails} role="status" aria-atomic="true">
        {selectedColleague
          ? `${selectedColleague.name} · ${selectedColleague.role}`
          : hasColleagues ? 'Choose your name to get started.' : 'No colleagues available'}
      </p>
    </section>
  )
}
