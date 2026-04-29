import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/** Converts stored display dates (`MMM D`, from {@link dueDateFromInput}) back to `YYYY-MM-DD` for date inputs. */
export function dueDateDisplayToInput(display: string | undefined): string {
  if (!display?.trim()) return ''
  const d = dayjs(display.trim(), 'MMM D', true)
  if (!d.isValid()) return ''
  return d.format('YYYY-MM-DD')
}

/** Converts an HTML date input value (YYYY-MM-DD) to a short display date, or undefined if empty/invalid. */
export function dueDateFromInput(isoDate: string): string | undefined {
  const trimmed = isoDate.trim()
  if (!trimmed) return undefined
  const d = dayjs(`${trimmed}T12:00:00`)
  if (!d.isValid()) return undefined
  return d.format('MMM D')
}
