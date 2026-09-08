import { useId, useState } from 'react'
import type { Colleague } from '../colleagues/colleague'
import { kudosCategoryLabels, type Kudos, type KudosCategory } from './kudos'
import styles from './KudosComposer.module.css'

interface KudosComposerProps {
  colleagues: readonly Colleague[]
  currentUserId: Colleague['id'] | null
  onSend: (kudos: Kudos) => void
}

export function KudosComposer({ colleagues, currentUserId, onSend }: KudosComposerProps) {
  const id = useId()
  const [recipientId, setRecipientId] = useState<Colleague['id']>('')
  const [category, setCategory] = useState<KudosCategory | ''>('')
  const hasColleagues = colleagues.length > 0
  const sender = colleagues.find((colleague) => colleague.id === currentUserId)
  const recipient = colleagues.find((colleague) => colleague.id === recipientId)
  const canSend = Boolean(sender && recipient && category)

  function handleSend() {
    if (!sender || !recipient || !category) return

    onSend({
      id: crypto.randomUUID(),
      from: sender.id,
      to: recipient.id,
      fromFirstName: sender.name.split(' ')[0],
      toFirstName: recipient.name.split(' ')[0],
      message: '',
      category,
      createdAt: new Date().toISOString(),
    })
    setRecipientId('')
    setCategory('')
  }

  return (
    <form
      className={styles.composer}
      aria-labelledby={`${id}-heading`}
      onSubmit={(event) => {
        event.preventDefault()
        handleSend()
      }}
    >
      <h2 className={styles.heading} id={`${id}-heading`}>Give kudos</h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${id}-recipient`}>To</label>
          <select
            id={`${id}-recipient`}
            value={recipientId}
            disabled={!hasColleagues}
            onChange={(event) => setRecipientId(event.currentTarget.value)}
          >
            <option value="" disabled>
              {hasColleagues ? 'Choose a colleague' : 'No colleagues available'}
            </option>
            {colleagues.map((colleague) => (
              <option key={colleague.id} value={colleague.id}>{colleague.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-category`}>Category</label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value as KudosCategory)}
          >
            <option value="" disabled>Choose a category</option>
            {Object.entries(kudosCategoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.sendButton} type="submit" disabled={!canSend}>Send kudos</button>
      </div>
    </form>
  )
}
