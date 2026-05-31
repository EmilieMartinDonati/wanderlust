const createUrl = (baseUrl: string) => (path: string): string => {
  const url = 'https' + '/' + baseUrl
  return path ? url + '/' + path : url
}

/** account */
const getAccountUrl  = createUrl('account')
export const myAccountUrl       = getAccountUrl('')
export const myPaymentsUrl      = getAccountUrl('payments')
export const myCalendarUrl      = getAccountUrl('calendar')
export const myRatingsUrl       = getAccountUrl('ratings')
export const myCommentariesUrl  = getAccountUrl('commentaries')

/** listings */
const getListingsUrl = createUrl('listings')
export const listingsUrl           = getListingsUrl('')
export const farmListingsUrl       = getListingsUrl('farm')
export const restaurantListingsUrl = getListingsUrl('restaurants')
