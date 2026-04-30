import { useEffect, useState } from 'react'

/**
 * Returns `value` only after it has stayed unchanged for `delayMs`.
 * Used by both filtering and URL synchronization.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
