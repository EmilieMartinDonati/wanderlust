import dayjs from "dayjs";
import moment from "moment";


export const _getDaysInMonth = ({
	daysInMonth = 30,
	selectedMonth,
	selectedYear,
}) => {
	let daysInMonthMatrix = [];
	/** generates the day pertaining to this month */
	for (let index = 0; index < daysInMonth; index++) {
		/**
		 * beware that month begins at 0 but day at one
		 * */
		const dayIndex = index + 1;
		let date = moment(
			new Date(selectedYear, selectedMonth, dayIndex, 0, 0, 0, 0, 0)
		);

		let obj = {
			dayLabel: date.format("dddd"),
			dayIndex: date.day(),
			day: date.format("YYYY-MM-DD"),
			isPrevMonth: false,
			isNextMonth: false,
			isNextYear: false,
			isPrevYear: false,
		};
		daysInMonthMatrix.push(obj);
	}
	return daysInMonthMatrix;
};

/** step 1 : generate all dates in a month
 * if the first day is not a monday (dayIndex === 1) (moment indexing convention)
 * we generate also the days from previous month until we reach a monday
 * if the last day is not a sunday (dayIndex === 0) (moment indexing convention)
 * we generate also the days from next month until we reach a sunday
 * we might have to switch the year here too.
 * depending on the month we will end up with 4 or 5 rows
 * We then use a new map to divide everything by seven and get the table body
 */

export const _groupByWeekRows = (array) => {
	let weekMap = new Map();
	let clonedArray = [...array];
	let index = 0;
	while (!!clonedArray.length) {
    const splice = clonedArray.splice(0, 7);
		weekMap.set(`${index + 1}`, splice);
		index ++;
	}
	return Array.from(weekMap.entries()).map((el) => ({rowIndex: el[0], weekDays: el[1]}));

}


export const _getMonthOverlap = ({
	mode = "prev",
	daysArray = [],
	monthToInspect,
	yearToInspect,
	isPrevOrNextYear,
}) => {
	/** we need to find the new month and its number of days */
	const month = moment(new Date(yearToInspect, monthToInspect, 1, 0, 0, 0, 0));
	const daysInMonth = month.daysInMonth();

	let firstDay = daysArray.at(0).dayIndex;
	let lastDay = daysArray.at(-1).dayIndex;
	/** [0, 1, 2, 3, 4, 5, 6] sunday -- saturday */
	if (mode == "prev" && firstDay === 1) return [];
	if (mode === "next" && lastDay === 0) return [];

	let daysExcedent = [];
	if (mode === "prev") {
		let generatedDay = moment(new Date(yearToInspect, monthToInspect, daysInMonth, 0, 0, 0, 0));
		const obj = {
			dayLabel: generatedDay.format("dddd"),
			dayIndex: generatedDay.day(),
			day: generatedDay.format("YYYY-MM-DD"),
			isPrevMonth: true,
			isNextMonth: false,
			isNextYear: false,
			isPrevYear: isPrevOrNextYear,
			month: generatedDay.format('MMMM'),
		};
		daysExcedent.push(obj);
		while (generatedDay.day() !== 1) {
       generatedDay = generatedDay.subtract(1, 'day');
			 const obj = {
				dayLabel: generatedDay.format("dddd"),
				dayIndex: generatedDay.day(),
				day: generatedDay.format("YYYY-MM-DD"),
				isPrevMonth: true,
				isNextMonth: false,
				isNextYear: false,
				isPrevYear: isPrevOrNextYear,
				month: generatedDay.format('MMMM'),
			};
			daysExcedent.push(obj);
		}
	}

	if (mode == "next" && lastDay !== 0) {
		// 
		let generatedDay = moment(new Date(yearToInspect, monthToInspect, 1, 0, 0, 0, 0, 0));
		const obj = {
			dayLabel: generatedDay.format("dddd"),
			dayIndex: generatedDay.day(),
			day: generatedDay.format("YYYY-MM-DD"),
			isPrevMonth: false,
			isNextMonth: true,
			isNextYear: isPrevOrNextYear,
			isPrevYear: false,
			month: generatedDay.format('MMMM'),
		};
		daysExcedent.push(obj);
		while (generatedDay.day() !== 0) {
       generatedDay = generatedDay.add(1, 'day');
			 const obj = {
				dayLabel: generatedDay.format("dddd"),
				dayIndex: generatedDay.day(),
				day: generatedDay.format("YYYY-MM-DD"),
				isPrevMonth: false,
				isNextMonth: true,
				isNextYear: isPrevOrNextYear,
				isPrevYear: false,
				month: generatedDay.format('MMMM'),
			};
			daysExcedent.push(obj);
		}
	}

	return mode === 'prev' ? daysExcedent.reverse() : daysExcedent;
};

export const _renderDaysInMonth = ({ selectedMonth, selectedYear }) => {

	/** expecting selectedMonth to be [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	 * selected year to be of format YYYY
	 */
	const month = moment(new Date(selectedYear, selectedMonth, 1, 0, 0, 0, 0));
	const daysInMonth = month.daysInMonth();

	const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
	const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;

	let yearToInspectPrev = selectedYear;
	let yearToInspectNext = selectedYear;
	let isNextYear = false;
	let isPrevYear = false;

	if (prevMonth === 11) {
		yearToInspectPrev = selectedYear - 1;
		isPrevYear = true;
	}
	if (nextMonth === 0) {
		yearToInspectNext = selectedYear + 1;
		isNextYear = true;
	}

	const daysOfOneMonth = _getDaysInMonth({
		daysInMonth,
		selectedMonth,
		selectedYear,
	});
	const prevMonthOverlap = _getMonthOverlap({
		mode: "prev",
		daysArray: daysOfOneMonth,
		monthToInspect: prevMonth,
		yearToInspect: yearToInspectPrev,
		isPrevOrNextYear: isPrevYear,
	});
	const nextMonthOverlap = _getMonthOverlap({
		mode: "next",
		daysArray: daysOfOneMonth,
		monthToInspect: nextMonth,
		yearToInspect: yearToInspectNext,
		isPrevOrNextYear: isNextYear,
	});
	const totalDaysInMonth = [
		...prevMonthOverlap,
		...daysOfOneMonth,
		...nextMonthOverlap,
	];

	return _groupByWeekRows(totalDaysInMonth);
};

