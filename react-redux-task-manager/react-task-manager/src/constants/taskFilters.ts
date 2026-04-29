/**
 * Options for manager toolbar filters. Used by the shared FilterSelect.
 */
export const PRIORITY_FILTER_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
] as const

export type PriorityFilterValue = (typeof PRIORITY_FILTER_OPTIONS)[number]['value']

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
] as const

export type StatusFilterValue = (typeof STATUS_FILTER_OPTIONS)[number]['value']
