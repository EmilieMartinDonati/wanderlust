const createUrl = (baseUrl) => {
  return (path) => {
    let protocol = "https";
    let separator = "/";
    let url = protocol + separator + baseUrl;
    if (!!path) {
      let suffix = separator + path
      url += suffix;
    }
    return url;
  };
};

/** account */
const getAccountUrl = createUrl("account");
const myAccountUrl = getAccountUrl('');
const myPaymentsUrl = getAccountUrl('payments');
const myCalendarUrl = getAccountUrl('calendar');
const myRatingsUrl = getAccountUrl('ratings');
const myCommentariesUrl = getAccountUrl('commentaries');

/** listings */
const getListingsUrl = createUrl('listings');
const listingsUrl = getListingsUrl('');
const farmListingsUrl = getListingsUrl('farm');
const restaurantListingsUrl = getListingsUrl('restaurants');