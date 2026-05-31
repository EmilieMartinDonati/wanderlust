import moment from 'moment'

type CalendarMode = 'prev' | 'next'

type CalendarDay = {
  dayLabel: string
  dayIndex: number
  day: string
  isPrevMonth: boolean
  isNextMonth: boolean
  isNextYear: boolean
  isPrevYear: boolean
  month?: string
}

type WeekRow = {
  rowIndex: string
  weekDays: CalendarDay[]
}

export const _getDaysInMonth = ({
  daysInMonth = 30,
  selectedMonth,
  selectedYear,
}: {
  daysInMonth?: number
  selectedMonth: number
  selectedYear: number
}): CalendarDay[] => {
  let daysInMonthMatrix: CalendarDay[] = []
  for (let index = 0; index < daysInMonth; index++) {
    const dayIndex = index + 1
    let date = moment(new Date(selectedYear, selectedMonth, dayIndex, 0, 0, 0, 0))
    daysInMonthMatrix.push({
      dayLabel:    date.format('dddd'),
      dayIndex:    date.day(),
      day:         date.format('YYYY-MM-DD'),
      isPrevMonth: false,
      isNextMonth: false,
      isNextYear:  false,
      isPrevYear:  false,
    })
  }
  return daysInMonthMatrix
}

export const _groupByWeekRows = (array: CalendarDay[]): WeekRow[] => {
  let weekMap = new Map<string, CalendarDay[]>()
  let clonedArray = [...array]
  let index = 0
  while (clonedArray.length) {
    const splice = clonedArray.splice(0, 7)
    weekMap.set(`${index + 1}`, splice)
    index++
  }
  return Array.from(weekMap.entries()).map((el) => ({ rowIndex: el[0], weekDays: el[1] }))
}

export const _getMonthOverlap = ({
  mode = 'prev',
  daysArray = [],
  monthToInspect,
  yearToInspect,
  isPrevOrNextYear,
}: {
  mode?: CalendarMode
  daysArray?: CalendarDay[]
  monthToInspect: number
  yearToInspect: number
  isPrevOrNextYear: boolean
}): CalendarDay[] => {
  const month        = moment(new Date(yearToInspect, monthToInspect, 1, 0, 0, 0, 0))
  const daysInMonth  = month.daysInMonth()
  const firstDay     = daysArray.at(0)?.dayIndex
  const lastDay      = daysArray.at(-1)?.dayIndex

  if (mode === 'prev' && firstDay === 1)  return []
  if (mode === 'next' && lastDay  === 0)  return []

  let daysExcedent: CalendarDay[] = []

  if (mode === 'prev') {
    let generatedDay = moment(new Date(yearToInspect, monthToInspect, daysInMonth, 0, 0, 0, 0))
    daysExcedent.push({
      dayLabel: generatedDay.format('dddd'), dayIndex: generatedDay.day(),
      day: generatedDay.format('YYYY-MM-DD'), isPrevMonth: true, isNextMonth: false,
      isNextYear: false, isPrevYear: isPrevOrNextYear, month: generatedDay.format('MMMM'),
    })
    while (generatedDay.day() !== 1) {
      generatedDay = generatedDay.subtract(1, 'day')
      daysExcedent.push({
        dayLabel: generatedDay.format('dddd'), dayIndex: generatedDay.day(),
        day: generatedDay.format('YYYY-MM-DD'), isPrevMonth: true, isNextMonth: false,
        isNextYear: false, isPrevYear: isPrevOrNextYear, month: generatedDay.format('MMMM'),
      })
    }
  }

  if (mode === 'next' && lastDay !== 0) {
    let generatedDay = moment(new Date(yearToInspect, monthToInspect, 1, 0, 0, 0, 0))
    daysExcedent.push({
      dayLabel: generatedDay.format('dddd'), dayIndex: generatedDay.day(),
      day: generatedDay.format('YYYY-MM-DD'), isPrevMonth: false, isNextMonth: true,
      isNextYear: isPrevOrNextYear, isPrevYear: false, month: generatedDay.format('MMMM'),
    })
    while (generatedDay.day() !== 0) {
      generatedDay = generatedDay.add(1, 'day')
      daysExcedent.push({
        dayLabel: generatedDay.format('dddd'), dayIndex: generatedDay.day(),
        day: generatedDay.format('YYYY-MM-DD'), isPrevMonth: false, isNextMonth: true,
        isNextYear: isPrevOrNextYear, isPrevYear: false, month: generatedDay.format('MMMM'),
      })
    }
  }

  return mode === 'prev' ? daysExcedent.reverse() : daysExcedent
}

export const _renderDaysInMonth = ({
  selectedMonth,
  selectedYear,
}: {
  selectedMonth: number
  selectedYear: number
}): WeekRow[] => {
  const month       = moment(new Date(selectedYear, selectedMonth, 1, 0, 0, 0, 0))
  const daysInMonth = month.daysInMonth()
  const prevMonth   = selectedMonth === 0  ? 11 : selectedMonth - 1
  const nextMonth   = selectedMonth === 11 ? 0  : selectedMonth + 1

  let yearToInspectPrev = selectedYear
  let yearToInspectNext = selectedYear
  let isPrevYear = false
  let isNextYear = false

  if (prevMonth === 11) { yearToInspectPrev = selectedYear - 1; isPrevYear = true }
  if (nextMonth === 0)  { yearToInspectNext = selectedYear + 1; isNextYear = true }

  const daysOfOneMonth    = _getDaysInMonth({ daysInMonth, selectedMonth, selectedYear })
  const prevMonthOverlap  = _getMonthOverlap({ mode: 'prev', daysArray: daysOfOneMonth, monthToInspect: prevMonth, yearToInspect: yearToInspectPrev, isPrevOrNextYear: isPrevYear })
  const nextMonthOverlap  = _getMonthOverlap({ mode: 'next', daysArray: daysOfOneMonth, monthToInspect: nextMonth, yearToInspect: yearToInspectNext, isPrevOrNextYear: isNextYear })

  return _groupByWeekRows([...prevMonthOverlap, ...daysOfOneMonth, ...nextMonthOverlap])
}
