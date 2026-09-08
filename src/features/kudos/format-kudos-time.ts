const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'always' })
const exactTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'long',
})

const timeUnits = [
  { unit: 'year', seconds: 365 * 24 * 60 * 60 },
  { unit: 'month', seconds: 30 * 24 * 60 * 60 },
  { unit: 'week', seconds: 7 * 24 * 60 * 60 },
  { unit: 'day', seconds: 24 * 60 * 60 },
  { unit: 'hour', seconds: 60 * 60 },
  { unit: 'minute', seconds: 60 },
] as const

export function formatKudosTime(createdAt: string, now: number) {
  const sentAt = new Date(createdAt)
  const differenceInSeconds = (sentAt.getTime() - now) / 1000
  const timeUnit = timeUnits.find(({ seconds }) => Math.abs(differenceInSeconds) >= seconds)

  return {
    relativeTime: timeUnit
      ? relativeTimeFormatter.format(Math.trunc(differenceInSeconds / timeUnit.seconds), timeUnit.unit)
      : 'Just now',
    exactTime: exactTimeFormatter.format(sentAt),
  }
}
