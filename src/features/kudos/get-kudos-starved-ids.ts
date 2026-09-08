import type { Colleague } from '../colleagues/colleague'
import type { Kudos } from './kudos'

export function getKudosStarvedIds(colleagues: readonly Colleague[], kudos: readonly Kudos[], now: number) {
  const cutoff = now - 7 * 24 * 60 * 60 * 1000

  return new Set(colleagues
    .filter((colleague) => !kudos.some((kudos) => kudos.to === colleague.id && Date.parse(kudos.createdAt) >= cutoff))
    .map((colleague) => colleague.id))
}
