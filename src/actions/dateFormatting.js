/** from dd/mm/yyy to mm/dd/yyyy, necessary before calling new date(something) */

import moment from "moment";

export const reorderDate = (date) => {
	let splittedDate = date.split('/');
	let temp = splittedDate[0];
	splittedDate[0] = splittedDate[1];
	splittedDate[1] = temp;
	return splittedDate.join("/");
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */

export const orderBookedSpansByMonth = ({ timeSpans }) => {
	let monthsMap = new Map();
	timeSpans.forEach((timeSpan) => {
		let startMonth = timeSpan.startDate.getMonth();
		let endMonth = timeSpan.endDate.getMonth();
		if (monthsMap.has(startMonth)) {
			monthsMap.set(startMonth, [...monthsMap.get(startMonth), timeSpan]);
		}
		if (!monthsMap.has(startMonth)) {
			monthsMap.set(startMonth, [timeSpan]);
		}
		if (monthsMap.has(endMonth)) {
			monthsMap.set(endMonth, [...monthsMap.get(endMonth), timeSpan])
		}
		if (!monthsMap.has(endMonth)) {
			monthsMap.set(endMonth, [timeSpan]);
		}
	})
	return monthsMap;
}

/**
 * 
 */

const getDateInLang = (date, { lang = 'fr' }) => {
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString('fr', options);
}

/**
 * get start of each possible timespan (y, m, d, h);
 * @param {date | string} date 
 * @param {object} param1 
 * @returns 
 */

const getStartOfDate = (date, { span = "day", useMoment = false }) => {
	if (typeof date === "string") {
		date = new Date(date);
	}
	switch (span) {
		case "day":
			if (useMoment) {
				return moment.utc(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
			}
			else {
				return new Date(date).setHours(0, 0, 0, 0);
			}
		default:
			return null;
	}
}

/**
 * get end of each possible timespan (y, m, d, h);
 * @param {*} date 
 * @param {*} param1 
 * @returns 
 */

const getEndOfDate = (date, { span = "day", useMoment = false }) => {
	switch (span) {
		case "day":
			if (useMoment) {
				return moment.utc(date).set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
			}
			else {
				return new Date(date).setHours(23, 59, 59, 999);
			}
		default:
			return null;
	}
}

export const buildDateFromString = (string) => {
	const splitString = string.split('-');
	const year = splitString(0);
	const month = splitString(1);
	const monthToNumber = Number(month);
	const day = splitString(2);
	return new Date(year, monthToNumber - 1, day, 0, 0, 0, 0);
}