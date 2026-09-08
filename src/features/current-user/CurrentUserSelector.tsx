import { useId } from 'react'
import type { Colleague } from '../colleagues/colleague'
import { ColleagueSelect } from '../colleagues/ColleagueSelect'
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
      <p className={styles.tagline}>Shared visions. Greater ambitions.</p>
      <h2 className={styles.heading} id={headingId}>Who’s here today?</h2>
      <label className={styles.label} id={`${selectorId}-label`} htmlFor={selectorId}>Your name</label>
      <ColleagueSelect
        id={selectorId}
        labelId={`${selectorId}-label`}
        colleagues={colleagues}
        value={currentUserId}
        placeholder="Choose your name"
        onChange={onCurrentUserChange}
      />
      <p className={styles.selectionDetails} role="status" aria-atomic="true">
        {selectedColleague
          ? `${selectedColleague.name} · ${selectedColleague.role}`
          : hasColleagues ? 'Choose your name to get started.' : 'No colleagues available'}
      </p>
    </section>
  )
}
