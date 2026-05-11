import type { User, Booking, Home } from '../types'

type WarnedUser = {
  user: User | undefined
  corruptedBooking: Booking
}

const hasAlarmingRatings = (user: User): boolean => {
  const redAlert    = user.ratings < 2 && user.numberOfRatings > 50
  const yellowAlert = (user.ratings < 2 && user.numberOfRatings <= 50) ||
                      (user.ratings < 3 && user.numberOfRatings > 50)
  return redAlert || yellowAlert
}

export const warnPotentialUsersOfDisgrace = (
  bookings: Booking[],
  homes: Home[],
  users: User[]
): WarnedUser[] => {
  const usersToWarn = bookings.reduce<WarnedUser[]>((usersArray, booking) => {
    if (booking.state === 'awaitingConfirmation') {
      const badOwner = users.reduce<User | Record<string, never>>((finalUser, user) => {
        const foundHome = homes.find((home) => home.bookingIds.includes(booking.id))?.id
        if (
          user.role === 'owner' &&
          hasAlarmingRatings(user) &&
          foundHome &&
          user.homes?.includes(foundHome)
        ) finalUser = user
        return finalUser
      }, {})
      if (Object.keys(badOwner).length !== 0)
        usersArray.push({
          user: users.find((user) => user.id === booking.bookerId),
          corruptedBooking: booking,
        })
    }
    return usersArray
  }, [])

  return usersToWarn.sort((u1, u2) =>
    Number(u1.user?.CCLevel) > Number(u2.user?.CCLevel) ? 1 : -1
  )
}

export const getDormantHosts = (bookings: Booking[], users: User[], homes: Home[]): Booking[] => {
  return bookings.filter((booking) => booking.state === 'awaitingConfirmation')
}
