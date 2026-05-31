export type BookingState = 'awaitingConfirmation' | 'confirmed' | 'cancelled'

export type TimeSlot = {
  start: string
  end: string
}

export type Booking = {
  id: string
  state: BookingState
  timeSlots: TimeSlot
  bookerId: string
  createdAt: Date
}
