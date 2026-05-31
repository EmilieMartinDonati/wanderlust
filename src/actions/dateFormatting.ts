import moment from 'moment'

type DateSpan = 'day' | 'month' | 'year'

type TimeSpan = {
  startDate: Date
  endDate: Date
}

/** from dd/mm/yyyy to mm/dd/yyyy, necessary before calling new Date(something) */
export const reorderDate = (date: string): string => {
  let splittedDate = date.split('/')
  let temp = splittedDate[0]
  splittedDate[0] = splittedDate[1]
  splittedDate[1] = temp
  return splittedDate.join('/')
}

export const orderBookedSpansByMonth = ({ timeSpans }: { timeSpans: TimeSpan[] }): Map<number, TimeSpan[]> => {
  let monthsMap = new Map<number, TimeSpan[]>()
  timeSpans.forEach((timeSpan) => {
    const startMonth = timeSpan.startDate.getMonth()
    const endMonth   = timeSpan.endDate.getMonth()
    monthsMap.set(startMonth, [...(monthsMap.get(startMonth) ?? []), timeSpan])
    if (endMonth !== startMonth)
      monthsMap.set(endMonth, [...(monthsMap.get(endMonth) ?? []), timeSpan])
  })
  return monthsMap
}

const getDateInLang = (date: Date, { lang = 'fr' }: { lang?: string }): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(lang, options)
}

const getStartOfDate = (
  date: Date | string,
  { span = 'day', useMoment = false }: { span?: DateSpan; useMoment?: boolean }
): number | moment.Moment | null => {
  if (typeof date === 'string') date = new Date(date)
  switch (span) {
    case 'day':
      return useMoment
        ? moment.utc(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        : new Date(date).setHours(0, 0, 0, 0)
    default:
      return null
  }
}

const getEndOfDate = (
  date: Date | string,
  { span = 'day', useMoment = false }: { span?: DateSpan; useMoment?: boolean }
): number | moment.Moment | null => {
  if (typeof date === 'string') date = new Date(date)
  switch (span) {
    case 'day':
      return useMoment
        ? moment.utc(date).set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
        : new Date(date).setHours(23, 59, 59, 999)
    default:
      return null
  }
}

// NOTE: original used splitString() — fixed to splitString[]
export const buildDateFromString = (string: string): Date => {
  const splitString   = string.split('-')
  const year          = splitString[0]
  const monthToNumber = Number(splitString[1])
  const day           = splitString[2]
  return new Date(Number(year), monthToNumber - 1, Number(day), 0, 0, 0, 0)
}
