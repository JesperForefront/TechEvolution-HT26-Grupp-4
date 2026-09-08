import { useId, useState } from 'react'
import type { Colleague } from '../colleagues/colleague'
import type { Kudos } from './kudos'
import { KudosCard } from './KudosCard'
import { KudosFilters, type KudosFilterValues } from './KudosFilters'
import styles from './KudosFeed.module.css'

interface KudosFeedProps {
  kudos: readonly Kudos[]
  colleagues: readonly Colleague[]
  now: number
}

export function KudosFeed({ kudos, colleagues, now }: KudosFeedProps) {
  const headingId = useId()
  const [filters, setFilters] = useState<KudosFilterValues>({ name: '', role: '', category: '' })
  const colleaguesById = new Map(colleagues.map((colleague) => [colleague.id, colleague]))
  const roles = [...new Set(colleagues.map(({ role }) => role))].sort((a, b) => a.localeCompare(b))
  const nameQuery = filters.name.trim().toLowerCase()
  const filteredKudos = kudos.filter((kudos) => {
    const recipient = colleaguesById.get(kudos.to)
    const matchesName = [kudos.toFirstName, recipient?.name ?? '']
      .some((name) => name.toLowerCase().includes(nameQuery))

    return matchesName
      && (!filters.role || recipient?.role === filters.role)
      && (!filters.category || kudos.category === filters.category)
  }).sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt))

  return (
    <section className={styles.feed} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h2 className={styles.heading} id={headingId}>Latest kudos</h2>
        <p className={styles.order}>Newest first</p>
      </header>

      <KudosFilters roles={roles} filters={filters} onChange={setFilters} />
      <p className={styles.resultCount} role="status">
        Showing {filteredKudos.length} of {kudos.length} kudos
      </p>

      {filteredKudos.length === 0 ? (
        <div className={styles.empty}>
          <h3 className={styles.emptyHeading}>
            {kudos.length === 0 ? 'No kudos yet.' : 'No kudos match your filters.'}
          </h3>
          <p className={styles.emptyMessage}>
            {kudos.length === 0 ? 'A little appreciation goes a long way.' : 'Try another name, role, or category, or clear the filters.'}
          </p>
        </div>
      ) : (
        <ol className={styles.list} role="list">
          {filteredKudos.map((kudos) => (
            <li key={kudos.id}>
              <KudosCard
                kudos={kudos}
                hasSenderLeft={!colleaguesById.has(kudos.from)}
                hasRecipientLeft={!colleaguesById.has(kudos.to)}
                now={now}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
