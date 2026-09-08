import { useId } from 'react'
import { kudosCategoryLabels, type KudosCategory } from './kudos'
import styles from './KudosFilters.module.css'

export interface KudosFilterValues {
  role: string
  category: KudosCategory | ''
  name: string
}

interface KudosFiltersProps {
  roles: readonly string[]
  filters: KudosFilterValues
  onChange: (filters: KudosFilterValues) => void
}

export function KudosFilters({ roles, filters, onChange }: KudosFiltersProps) {
  const id = useId()
  const hasFilters = Boolean(filters.role || filters.category || filters.name)

  return (
    <div className={styles.filters} role="group" aria-label="Filter kudos">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Recipient name</label>
          <input
            id={`${id}-name`}
            type="search"
            placeholder="Search by name"
            value={filters.name}
            onChange={(event) => onChange({ ...filters, name: event.currentTarget.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-role`}>Recipient role</label>
          <select
            id={`${id}-role`}
            value={filters.role}
            onChange={(event) => onChange({ ...filters, role: event.currentTarget.value })}
          >
            <option value="">All roles</option>
            {roles.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-category`}>Category</label>
          <select
            id={`${id}-category`}
            value={filters.category}
            onChange={(event) => onChange({ ...filters, category: event.currentTarget.value as KudosCategory | '' })}
          >
            <option value="">All categories</option>
            {Object.entries(kudosCategoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className={styles.clearButton}
        type="button"
        disabled={!hasFilters}
        onClick={() => onChange({ name: '', role: '', category: '' })}
      >
        Clear filters
      </button>
    </div>
  )
}
