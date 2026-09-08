import { MAX_MESSAGE_LENGTH, kudosCategoryLabels, type Kudos } from './kudos.ts'

function isKudos(value: unknown): value is Kudos {
  if (!value || typeof value !== 'object') return false
  const kudos = value as Record<string, unknown>

  return ['id', 'from', 'to', 'fromFirstName', 'toFirstName'].every((field) => (
    typeof kudos[field] === 'string' && kudos[field].trim().length > 0
  ))
    && typeof kudos.message === 'string' && kudos.message.length <= MAX_MESSAGE_LENGTH
    && typeof kudos.category === 'string' && Object.hasOwn(kudosCategoryLabels, kudos.category)
    && typeof kudos.createdAt === 'string' && Number.isFinite(Date.parse(kudos.createdAt))
}

export function parseKudos(contents: string): readonly Kudos[] {
  const records: unknown = JSON.parse(contents.replace(/^\uFEFF/, ''))
  if (!Array.isArray(records) || !records.every(isKudos)
    || new Set(records.map(({ id }) => id)).size !== records.length) {
    throw new Error('Invalid kudos data.')
  }
  return records
}
