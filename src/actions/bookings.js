import { HOMESDATA } from "../bogusData/homes";
import { BOOKINGSDATA } from "../bogusData/bookings";
import { USERSDATA } from "../bogusData/users";

// Send a mail with mailJet.

const hasAlarmingRatings = (elem) => {
  let redAlert = elem.ratings < 2 && elem.numberOfRatings > 50;
  let yellowAlert =
    (elem.ratings < 2 && elem.numberOfRatings <= 50) ||
    (elem.ratings < 3 && elem.numberOfRatings > 50);
  return redAlert || yellowAlert;
};

export const warnPotentialUsersOfDisgrace = (bookings, homes, users) => {
  const usersToWarn = bookings.reduce((usersArray, booking) => {
    if (booking.state === "awaitingConfirmation") {
      const badOwner = users.reduce((finalUser, user) => {
        let foundHome = homes.find((home) =>
          home.bookingIds.includes(booking.id)
        ).id;
        if (
          user.role === "owner" &&
          hasAlarmingRatings(user) &&
          user.homeIds.includes(foundHome)
        )
          finalUser = user;
        return finalUser;
      }, {});
      if (Object.keys(badOwner).length !== 0)
        usersArray.push({
          user: users.find((user) => user.id === booking.bookerId),
          corruptedBooking: booking
        });
    }
    return usersArray;
  }, []);
  return usersToWarn.sort((u1, u2) =>
    Number(u1.user.CCLevel) > Number(u2.user.CCLevel) ? 1 : -1
  );
};

// Récupérer les hôtes qui ne répondent plus à leurs matchs, pour les réveiller; 
export const getDormantHosts = (bookings, users, homes) => {
   return bookings.filter((booking) => booking.state === 'awaitingConfirmation');
   // Compare created at object with Date.now et faire la différence.
   // Le propriétaire et le booking en question.
}