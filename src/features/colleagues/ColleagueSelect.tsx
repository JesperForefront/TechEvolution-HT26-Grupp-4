import { useEffect, useRef, useState } from 'react'
import type { Colleague } from './colleague'
import styles from './ColleagueSelect.module.css'

interface ColleagueSelectProps {
  id: string
  labelId: string
  descriptionId?: string
  colleagues: readonly Colleague[]
  kudosStarvedIds?: ReadonlySet<Colleague['id']>
  value: Colleague['id'] | null
  placeholder: string
  onChange: (colleagueId: Colleague['id']) => void
}

export function ColleagueSelect({
  id, labelId, descriptionId, colleagues, kudosStarvedIds, value, placeholder, onChange,
}: ColleagueSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const selectedColleague = colleagues.find((colleague) => colleague.id === value)
  const isStarved = Boolean(selectedColleague && kudosStarvedIds?.has(selectedColleague.id))

  useEffect(() => {
    if (isOpen) optionRefs.current[activeIndex]?.focus()
  }, [isOpen, activeIndex])

  function openOptions(startFromEnd = false) {
    const selectedIndex = colleagues.findIndex((colleague) => colleague.id === value)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : startFromEnd ? colleagues.length - 1 : 0)
    setIsOpen(true)
  }

  function closeOptions() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      className={styles.dropdown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault()
          event.stopPropagation()
          closeOptions()
        }
      }}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`${styles.trigger} ${isStarved ? styles.starved : ''}`}
        disabled={colleagues.length === 0}
        aria-labelledby={`${labelId} ${id}-value`}
        aria-describedby={descriptionId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${id}-options` : undefined}
        title={isStarved ? 'kudos starved' : undefined}
        onClick={() => isOpen ? setIsOpen(false) : openOptions()}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            openOptions(event.key === 'ArrowUp')
          }
        }}
      >
        <span className={styles.name} id={`${id}-value`}>
          {selectedColleague?.name ?? (colleagues.length ? placeholder : 'No colleagues available')}
        </span>
        {isStarved && <span className={styles.hourglass} role="img" aria-label="kudos starved">⌛</span>}
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={`${id}-options`}
          className={styles.options}
          role="listbox"
          aria-labelledby={labelId}
          onKeyDown={(event) => {
            const lastIndex = colleagues.length - 1
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
            event.preventDefault()
            if (event.key === 'Home') setActiveIndex(0)
            if (event.key === 'End') setActiveIndex(lastIndex)
            if (event.key === 'ArrowDown') setActiveIndex((current) => (current + 1) % colleagues.length)
            if (event.key === 'ArrowUp') setActiveIndex((current) => (current + lastIndex) % colleagues.length)
          }}
        >
          {colleagues.map((colleague, index) => {
            const isOptionStarved = kudosStarvedIds?.has(colleague.id)

            return (
              <button
                key={colleague.id}
                ref={(element) => { optionRefs.current[index] = element }}
                type="button"
                role="option"
                aria-selected={colleague.id === value}
                aria-label={`${colleague.name}${isOptionStarved ? ', kudos starved' : ''}`}
                tabIndex={index === activeIndex ? 0 : -1}
                className={`${styles.option} ${isOptionStarved ? styles.starved : ''}`}
                title={isOptionStarved ? 'kudos starved' : undefined}
                onClick={() => {
                  onChange(colleague.id)
                  closeOptions()
                }}
              >
                <span className={styles.name}>{colleague.name}</span>
                {isOptionStarved && <span className={styles.hourglass} aria-hidden="true">⌛</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
