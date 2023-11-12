import axios from "axios";
import moment from "moment";
import { URLS } from "../axios";

export const filterOptionsLabels = [
  { label: 'unpaid', name: "Voir les réservations qui n'ont pas encore été payées", tab: 0 },
  { label: 'best-sellers', name: "Voir les propriétaires les mieux notés", tab: 1 },
  { label: 'arrival', name: 'Voir les arrivées récentes', tab: 2 },
  { label: 'leaving', name: 'Voir les départs imminents', tab: 3 },
]

export const loadUnpaidBookings = async (...rest) => {
  let baseUrl = URLS.addresses;
  const fullUrl = baseUrl + "loadUnpaidBookings";
  // const {res, error} = await axios.post("loadUnpaidBookings", {payload: rest});
  return { name: "coucou" };
}

export const loadImminentDepartures = (...rest) => {
  console.log('rest', rest);
}

export const loadRecentArrivals = (...rest) => {
  console.log('rest', rest);
}

export const loadBestRatedOwners = (...rest) => {
  // console.log('rest', rest);
}


export const getDbResPath = (dbRes) => {
  return (dataType) => {
    let pathInsideObj = "data" + "." + dataType;
    data = pathInsideObj.split('.').reduce((res, prop) => res?.[prop], dbRes);
  }
}


export const generateDataForTest = async (user) => {
  let baseUrl = URLS.bookings;
  const fullUrl = baseUrl + "/generateTestData";
  const dbRes = await axios.post(fullUrl, { user });
}


export const loadProperties = async () => {
  let baseUrl = URLS.properties;
  // not sure why it does time out like this .... 
  const fullUrl = baseUrl + "/loadProperties";
  const dbRes = await axios.get(fullUrl);
  let userData = [{
    name: "Alice Martin", cc: 10,
  }, { name: "Another Martin", cc: 8 }];

  let data = [
    { user: "Emilie Martin", address: "41 rue de la belgique", isMainHousing: true, housingCapacity: 4, isBooked: true, bookedSpan: { start: moment().add(2, 'd').format('MM-DD-YYYY'), end: moment().add(40, 'd').format('MM-DD-YYYY') } },
    { user: "Camille Martin", address: "43 rue de la belgique", isMainHousing: true, housingCapacity: 3, isBooked: false, bookedSpan: { start: moment().add(3, 'd').format('MM-DD-YYYY'), end: moment().add(40, 'd').format('MM-DD-YYYY') } },
    { user: "Another Martin", address: "47 rue de la belgique 92190 Meudon", isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(45, 'd').format('MM-DD-YYYY') } },
    { user: "Alice Martin", address: "20 rue de la belgique", isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(38, 'd').format('MM-DD-YYYY') } },
    { user: "Alice Martin", address: "10 rue de la belgique", isMainHousing: true, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(33, 'd').format('MM-DD-YYYY') } },
    { user: "Alice Martin", address: "43 rue de la belgique 92190 Meudon", isMainHousing: false, housingCapacity: 6, isBooked: false, bookedSpan: { start: moment().add(31, 'd').format('MM-DD-YYYY'), end: moment().add(45, 'd').format('MM-DD-YYYY') } },
  ]

  const _sortByHousingCapacity = (a, b, ...fallbackFunctions) => {
    if (a.housingCapacity > b.housingCapacity) return -1;
    if (a.housingCapacity < b.housingCapacity) return 1;
    if (a.housingCapacity === b.housingCapacity) {
      let nextFallbackFunction = fallbackFunctions.shift();
      return !nextFallbackFunction ? 0 : nextFallbackFunction(a, b, ...fallbackFunctions);
    }
  }

  const _sortBySpan = (mode = "start", a, b, ...fallbackFunctions) => {
    if (new Date(a.bookedSpan[mode]).getTime() < new Date(b.bookedSpan[mode]).getTime()) return - 1;
    if (new Date(a.bookedSpan[mode]).getTime() > new Date(b.bookedSpan[mode]).getTime()) return 1;
    if (new Date(a.bookedSpan[mode]).getTime() === new Date(b.bookedSpan[mode]).getTime()) {
      let nextFallbackFunction = fallbackFunctions.shift();
      return !nextFallbackFunction ? 0 : nextFallbackFunction(a, b, ...fallbackFunctions);
    }
  }

  const _sortBySpanEnd = (a, b, ...rest) => {
    return _sortBySpan("end", a, b, ...rest);
  }

  const _sortBySpanStart = (a, b, ...rest) => {
    return _sortBySpan("start", a, b, ...rest);
  }

  const fallbackSortFunctions = [
    function (...rest) { return _sortByHousingCapacity(...rest) },
    function (...rest) { return _sortBySpanStart(...rest) },
    function (...rest) { return _sortBySpanEnd(...rest) },
    function (...rest) { return _sortByUserCC(...rest) },
  ]

  const _sortByUserCC = (a, b, ...fallbackFunctions) => {
    const ccA = userData.find((oneData) => oneData.name === a.user)?.cc || 0;
    const ccB = userData.find((oneData) => oneData.name === b.user)?.cc || 0;
    if (ccA > ccB) return - 1;
    if (ccA < ccB) return 1;
    let nextFallbackFunction = fallbackFunctions.shift();
    return !nextFallbackFunction ? 0 : nextFallbackFunction(a, b, ...fallbackFunctions);
  }

  const _sortWithFallback = (data, ...fns) => {
    let firstFunction = fns.shift();
    return data.sort((a, b) => firstFunction(a, b, ...fns));
  }

  return _sortWithFallback(data, ...fallbackSortFunctions);
}


const composes = (...fns) => (inputValue) = fns.reduce((acc, fn) => fn(acc), inputValue);


export const selectProperty = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "TOGGLE_MONITORING_MODAL",
      isMonitoringModalOpen: true,
    })
    dispatch({
      type: "PROPERTY_LOADED_FOR_MODAL",
      selectedProperty: data,
    })
  }
}

const flattenArrayRecursively = (array) => {
  if (!Array.isArray(array[0])) {
    return array;
  }
  const newArray = array.reduce((prev, curr) => prev.concat(curr));
  return flattenArrayRecursively(newArray);
}




/** preload image before component mounts to reduce perceived loading time
 */
export const preloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    fetch(imageUrl)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          reject(new Error('Failed to load image'));
        }
      })
      .then(blob => resolve(blob))
      .catch(error => reject(error));
  });
};

export const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};

export const isValidBase64 = (base64String) => {
  if (typeof base64String !== 'string' || base64String.length === 0) {
    return false;
  }

		const prefix = 'data:image/png;base64,';
		if (base64String.startsWith(prefix)) {
			base64String = base64String.slice(prefix.length);
		}

  if (base64String.length % 4 !== 0) {
    return false;
  }

  var validChars = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!validChars.test(base64String)) {
    return false;
  }

  try {
    var decodedData = atob(base64String);
    // Check if the decoding produces valid UTF-8 data
    return (decodedData && /^[\x00-\ufffd]*$/.test(decodedData));
  } catch (e) {
    return false;
  }
}