const createUrl = (baseUrl) => {
  return (path) => {
    let url = "https" + "/" + baseUrl;
    if (!!path) {
      let suffix = "/" + path
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