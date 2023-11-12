import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';

import DateToggler from "./DateToggler";
import CalendarBody from "./CalendarBody";
import moment from "moment";

const headerWeekDays = [{ label: 'monday' }, { label: "tuesday" }, { label: "wednesday" }, { label: "thursday" }, { label: "friday" }, { label: "saturday" }, { label: "sunday" }];

const useStyles = createUseStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  tableRoot: {
    border: '2px red solid',
    tableLayout: 'fixed',  /** necessary along with width to have fixed table cells */
    width: 700,
    borderCollapse: 'collapse',
    cellSpacing: 0,
  },
  nextPrevMonth: {
    opacity: 0.7,
    backgroundColor: "lightGray",
  },
  tableCell: {
    width: 40,
    height: 40,
    border: "1px solid gray",
  },
  inRangeSelection: {
    backgroundColor: 'slateblue',
  }
}));

const HandmadeCalendarContainer = ({ generateData = () => { }, }) => {

  const classes = useStyles();

  const [clickedMonth, setClickedMonth] = useState(0);
  const [clickedYear, setClickedYear] = useState(2023);

  const [weeksInMonth, setWeeksInMonth] = useState([]);

  const [dateRangeSelection, setDateRangeSelection] = useState({ start: null, end: null });

  const _renderRows = () => {
    let data = generateData && generateData({ selectedYear: clickedYear, selectedMonth: clickedMonth });
    setWeeksInMonth(data);
  }

  useEffect(() => {
    _renderRows();
  }, []);

  useEffect(() => {
    _renderRows();
  }, [clickedYear, clickedMonth]);

  const _isInBetween = (date, startRef, endRef) => {
    return (moment(date.day).isBefore(moment(endRef)) && moment(date.day).isAfter(startRef));
  }

  const _handleChangeRangeSelection = (day) => {
    let prevStart = dateRangeSelection.start;
    let prevEnd = dateRangeSelection.end;
    let newRangeSelection = { ...dateRangeSelection };
    /** nothing changed */
    if (prevStart?.day === day.day || prevEnd?.day === day.day) {
      return newRangeSelection;
    }
    /** it changed */
    else {
      if (!prevStart) {   /** there is no end either */
        newRangeSelection.start = day;
      }
      else if (!prevEnd) {
        if (moment(day.day).isBefore(moment(prevStart.day))) {
          /** we swap them */
          newRangeSelection.start = day;
          newRangeSelection.end = prevStart;
        }
        else {
          newRangeSelection.end = day;
        }
      }
      else {
        if (_isInBetween(day, prevStart.day, prevEnd.day)) {
          const intervalFromEnd = Math.abs(moment(day.day).diff(moment(prevEnd.day)));
          const intervalFromStart = Math.abs(moment(day.day).diff(moment(prevStart.day)));
          const smallerInterval = Math.min(intervalFromStart, intervalFromEnd);
          if (smallerInterval === intervalFromStart) {
            newRangeSelection.start = day;
          }
          else newRangeSelection.end = day;
        }
        else if (moment(day.day).isAfter(moment(prevEnd.day))) {
          newRangeSelection.end = day;
        }
        else if (moment(day.day).isBefore(moment(prevEnd.day))) {
          newRangeSelection.start = day;
        }
      }
    }
    return newRangeSelection;
  }

  const _handleClick = (day) => {
    let newRangeSelection = _handleChangeRangeSelection(day);
    setDateRangeSelection(newRangeSelection);
    const { start, end } = newRangeSelection;
    if (start.isPrevMonth && end?.isPrevMonth) {
      setClickedMonth(clickedMonth === 0 ? 11 : clickedMonth - 1);
      if (clickedMonth === 0) setClickedYear(clickedYear - 1);
    }
    else if (start.isNextMonth && end?.isNextMonth) {
      setClickedMonth(clickedMonth === 11 ? 0 : clickedMonth + 1);
      if (clickedMonth === 11) setClickedYear(clickedYear + 1);
    }
    else {
      return;
    }
  };

  const _changeMonth = (m) => setClickedMonth(m);
  const _changeYear = (y) => setClickedYear(y);

  const _getTHead = () => {
    return (
      <thead>
        <tr>
          {headerWeekDays.map((day, i) => {
            return <th key={i}>{day.label}</th>;
          })}
        </tr>
      </thead>
    );
  };

  return (
    <div className={classes.root}>
      <DateToggler year={clickedYear} changeYear={_changeYear} changeMonth={_changeMonth} month={clickedMonth} />
      <table className={classes.tableRoot}>
        {_getTHead()}
        <CalendarBody weeksInMonth={weeksInMonth} onClickDay={_handleClick} rangeSelection={dateRangeSelection} />
      </table>
    </div>
  );
};

export default HandmadeCalendarContainer;

