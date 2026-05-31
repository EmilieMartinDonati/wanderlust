export const BOOKINGSDATA = [
    {
        id: 'B1',
        state: "awaitingConfirmation",
        timeSlots: {
            start: "2023-11-04",
            end: "2023-11-07",
        },
        bookerId: 'U3',
        createdAt: new Date(),
    },
    {
        id: 'B2',
        state: 'cancelled',
        timeSlots: {
            start: "2023-10-04",
            end: "2023-10-07",
        },
        bookerId: 'U4',
        createdAt: new Date(),
    },
    {
        id: 'B3',
        state: "confirmed",
        timeSlots: {
            start: "2023-10-08",
            end: "2023-11-13",
        },
        bookerId: 'U3',
        createdAt: new Date(),
    },
    {
        id: 'B4',
        state: "awaitingConfirmation",
        timeSlots: {
            start: "2023-10-08",
            end: "2023-11-13",
        },
        bookerId: 'U4',
        createdAt: new Date(),
    },
]

