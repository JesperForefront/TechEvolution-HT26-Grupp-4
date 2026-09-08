import { useId, useRef, useState } from 'react'
import { MAX_MESSAGE_LENGTH } from './kudos'
import styles from './EditableKudosMessage.module.css'

interface EditableKudosMessageProps {
  message: string
  onSave: (message: string) => void
}

export function EditableKudosMessage({ message, onSave }: EditableKudosMessageProps) {
  const id = useId()
  const [draft, setDraft] = useState<string | null>(null)
  const editButtonRef = useRef<HTMLButtonElement>(null)

  function closeEditor() {
    setDraft(null)
    requestAnimationFrame(() => editButtonRef.current?.focus())
  }

  if (draft === null) {
    return (
      <>
        {message && <p className={styles.message}>{message}</p>}
        <button
          ref={editButtonRef}
          className={styles.editButton}
          type="button"
          aria-label="Edit kudos message"
          onClick={() => setDraft(message)}
        >
          Edit
        </button>
      </>
    )
  }

  return (
    <form
      className={styles.editor}
      aria-label="Edit kudos message"
      onSubmit={(event) => {
        event.preventDefault()
        if (draft.length > MAX_MESSAGE_LENGTH) return
        onSave(draft)
        closeEditor()
      }}
    >
      <label htmlFor={id}>Message (optional)</label>
      <textarea
        id={id}
        value={draft}
        maxLength={MAX_MESSAGE_LENGTH}
        rows={3}
        autoFocus
        aria-describedby={`${id}-count`}
        onChange={(event) => setDraft(event.currentTarget.value)}
      />
      <p className={styles.characterCount} id={`${id}-count`}>
        {draft.length}/{MAX_MESSAGE_LENGTH} characters
      </p>
      <div className={styles.actions}>
        <button className={styles.cancelButton} type="button" onClick={closeEditor}>Cancel</button>
        <button className={styles.saveButton} type="submit" disabled={draft.length > MAX_MESSAGE_LENGTH}>Save</button>
      </div>
    </form>
  )
}
