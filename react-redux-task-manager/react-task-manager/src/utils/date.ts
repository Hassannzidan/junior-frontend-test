import dayjs from 'dayjs'

/** Converts an HTML date input value (YYYY-MM-DD) to a short display date, or undefined if empty/invalid. */
export function dueDateFromInput(isoDate: string): string | undefined {
  const trimmed = isoDate.trim()
  if (!trimmed) return undefined
  const d = dayjs(`${trimmed}T12:00:00`)
  if (!d.isValid()) return undefined
  return d.format('MMM D')
}
