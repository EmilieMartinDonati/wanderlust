import axios from 'axios'
import moment from 'moment'
import { URLS } from '../axios'

type FilterOption = {
  label:  string
  name:   string
  tab:    number
}

type Property = {
  user:           string
  address:        string
  isMainHousing:  boolean
  housingCapacity: number
  isBooked:       boolean
  bookedSpan:     { start: string; end: string }
}

type UserData = {
  name: string
  cc:   number
}

export const filterOptionsLabels: FilterOption[] = [
  { label: 'unpaid',       name: "Voir les réservations qui n'ont pas encore été payées", tab: 0 },
  { label: 'best-sellers', name: 'Voir les propriétaires les mieux notés',                tab: 1 },
  { label: 'arrival',      name: 'Voir les arrivées récentes',                            tab: 2 },
  { label: 'leaving',      name: 'Voir les départs imminents',                            tab: 3 },
]

export const loadUnpaidBookings    = async (...rest: unknown[]): Promise<unknown> => {
  return { name: 'coucou' }
}
export const loadImminentDepartures = (...rest: unknown[]): void => {}
export const loadRecentArrivals     = (...rest: unknown[]): void => {}
export const loadBestRatedOwners    = (...rest: unknown[]): void => {}

export const generateDataForTest = async (user: unknown): Promise<void> => {
  const fullUrl = URLS.bookings + '/generateTestData'
  await axios.post(fullUrl, { user })
}

export const loadProperties = async (): Promise<Property[]> => {
  const userData: UserData[] = [
    { name: 'Alice Martin',   cc: 10 },
    { name: 'Another Martin', cc: 8  },
  ]

  const data: Property[] = [
    { user: 'Emilie Martin',   address: '41 rue de la belgique',            isMainHousing: true,  housingCapacity: 4, isBooked: true,  bookedSpan: { start: moment().add(2,  'd').format('MM-DD-YYYY'), end: moment().add(40, 'd').format('MM-DD-YYYY') } },
    { user: 'Camille Martin',  address: '43 rue de la belgique',            isMainHousing: true,  housingCapacity: 3, isBooked: false, bookedSpan: { start: moment().add(3,  'd').format('MM-DD-YYYY'), end: moment().add(40, 'd').format('MM-DD-YYYY') } },
    { user: 'Another Martin',  address: '47 rue de la belgique 92190',      isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(45, 'd').format('MM-DD-YYYY') } },
    { user: 'Alice Martin',    address: '20 rue de la belgique',            isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(38, 'd').format('MM-DD-YYYY') } },
    { user: 'Alice Martin',    address: '10 rue de la belgique',            isMainHousing: true,  housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(33, 'd').format('MM-DD-YYYY') } },
    { user: 'Alice Martin',    address: '43 rue de la belgique 92190',      isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(45, 'd').format('MM-DD-YYYY') } },
  ]

  type SortFn = (a: Property, b: Property, ...fns: SortFn[]) => number

  const _sortByHousingCapacity: SortFn = (a, b, ...fns) => {
    if (a.housingCapacity !== b.housingCapacity)
      return a.housingCapacity > b.housingCapacity ? -1 : 1
    return fns[0]?.(a, b, ...fns.slice(1)) ?? 0
  }

  const _sortBySpan = (mode: 'start' | 'end', a: Property, b: Property, ...fns: SortFn[]): number => {
    const ta = new Date(a.bookedSpan[mode]).getTime()
    const tb = new Date(b.bookedSpan[mode]).getTime()
    if (ta !== tb) return ta < tb ? -1 : 1
    return fns[0]?.(a, b, ...fns.slice(1)) ?? 0
  }

  const _sortByUserCC: SortFn = (a, b, ...fns) => {
    const ccA = userData.find((d) => d.name === a.user)?.cc ?? 0
    const ccB = userData.find((d) => d.name === b.user)?.cc ?? 0
    if (ccA !== ccB) return ccA > ccB ? -1 : 1
    return fns[0]?.(a, b, ...fns.slice(1)) ?? 0
  }

  const fallbackSortFunctions: SortFn[] = [
    _sortByHousingCapacity,
    (a, b, ...r) => _sortBySpan('start', a, b, ...r),
    (a, b, ...r) => _sortBySpan('end',   a, b, ...r),
    _sortByUserCC,
  ]

  const first = fallbackSortFunctions[0]
  return data.sort((a, b) => first(a, b, ...fallbackSortFunctions.slice(1)))
}

export const selectProperty = (data: unknown) => async (dispatch) => {
  dispatch({ type: 'TOGGLE_MONITORING_MODAL', isMonitoringModalOpen: true })
  dispatch({ type: 'PROPERTY_LOADED_FOR_MODAL', selectedProperty: data })
}

export const preloadImage = (imageUrl: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    fetch(imageUrl)
      .then((response) => {
        if (response.ok) return response.blob()
        reject(new Error('Failed to load image'))
      })
      .then((blob) => blob && resolve(blob))
      .catch(reject)
  })
}

export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror   = reject
    reader.readAsDataURL(blob)
  })
}

export const isValidBase64 = (base64String: string): boolean => {
  if (!base64String) return false
  const prefix = 'data:image/png;base64,'
  if (base64String.startsWith(prefix)) base64String = base64String.slice(prefix.length)
  if (base64String.length % 4 !== 0) return false
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64String)) return false
  try {
    const decoded = atob(base64String)
    return /^[\x00-�]*$/.test(decoded)
  } catch {
    return false
  }
}
