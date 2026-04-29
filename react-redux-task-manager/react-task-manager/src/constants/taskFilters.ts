/**
 * Options for manager toolbar filters. Used by the shared FilterSelect.
 */
export const PRIORITY_FLAG_COLORS = {
  urgent: '#C62828',
  high: '#EF6C00',
  medium: '#F9A825',
  low: '#2E7D32',
} as const

export const PRIORITY_FILTER_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  {
    value: 'urgent',
    label: 'Urgent',
    flagColor: PRIORITY_FLAG_COLORS.urgent,
  },
  { value: 'high', label: 'High', flagColor: PRIORITY_FLAG_COLORS.high },
  { value: 'medium', label: 'Medium', flagColor: PRIORITY_FLAG_COLORS.medium },
  { value: 'low', label: 'Low', flagColor: PRIORITY_FLAG_COLORS.low },
] as const

export type PriorityFilterValue = (typeof PRIORITY_FILTER_OPTIONS)[number]['value']

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
] as const

export type StatusFilterValue = (typeof STATUS_FILTER_OPTIONS)[number]['value']
