import type { Colleague } from '../colleagues/colleague'

export const kudosCategoryLabels = {
  TEAMWORK: 'Teamwork',
  EXTRA_MILE: 'Extra mile',
  MENTORSHIP: 'Mentorship',
  CRAFT: 'Craft',
  CUSTOMER_IMPACT: 'Customer impact',
} as const

export type KudosCategory = keyof typeof kudosCategoryLabels

export interface Kudos {
  readonly id: string
  readonly from: Colleague['id']
  readonly to: Colleague['id']
  readonly fromFirstName: string
  readonly toFirstName: string
  readonly message: string
  readonly category: KudosCategory
  readonly createdAt: string
}
