import { describe, expect, it, vi } from 'vitest'
import { safeStorageGet, safeStorageRemove, safeStorageSet } from '../storage'

describe('storage utilities', () => {
  it('reads and writes values in localStorage', () => {
    expect(safeStorageSet('storage:test', 'value')).toBe(true)
    expect(safeStorageGet('storage:test')).toBe('value')
    expect(safeStorageRemove('storage:test')).toBe(true)
    expect(safeStorageGet('storage:test')).toBeNull()
  })

  it('fails gracefully when storage throws', () => {
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('denied')
    })

    expect(safeStorageSet('storage:test', 'value')).toBe(false)
    expect(safeStorageGet('storage:test')).toBeNull()
    expect(safeStorageRemove('storage:test')).toBe(false)

    setSpy.mockRestore()
    getSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
