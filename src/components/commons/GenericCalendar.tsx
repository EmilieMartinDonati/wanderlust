import classNames from "classnames";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createUseStyles } from "react-jss";
import {
  reorderDate,
  orderBookedSpansByMonth,
} from "../../actions/dateFormatting";
import MotionText from "./MotionText";

type DateValue = Date | Date[] | null

interface BookedTimeSpan {
  startDate: string
  endDate: string
}

interface GenericCalendarProps {
  dateRange: DateValue
  setDateRange: (value: DateValue) => void
  bookedTimeSpans?: BookedTimeSpan[]
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}

/** je vais m'amuser avec les pseudo selectors moi pour le coup */

const useStyles = createUseStyles((theme) => ({
  calendarRoot: {},
  currentDateSelection: {
    color: "green",
    transform: "scale(1.2)",
    border: "2px red solid !important",
  },
  bookedSelection: {
    backgroundColor: "slateblue",
  },
}));

const GenericCalendar = ({
  dateRange,
  setDateRange,
  bookedTimeSpans = [],
  isOpenModal,
  setIsOpenModal,
}: GenericCalendarProps) => {
  const classes = useStyles();

  /** transform date format */
  let reformattedTimeSpans = useRef(new Map());

  useEffect(() => {
    let timeSpans: Array<{ startDate: Date; endDate: Date }> = [];
    for (const span of bookedTimeSpans) {
      let obj = {
        startDate: new Date(reorderDate(span.startDate)),
        endDate: new Date(reorderDate(span.endDate)),
      };
      timeSpans.push(obj);
    }
    reformattedTimeSpans.current = orderBookedSpansByMonth({ timeSpans });
  }, [bookedTimeSpans]);

  const _handleChange = (e: Date | Date[]) => {
    /** it's a range */
    if (Array.isArray(e)) {
      setDateRange(e);
      if (e.some((date) => _isBookedDate({ selectedDate: date }))) {
        setIsOpenModal(true);
      } else {
        setIsOpenModal(false);
      }
    } else {
      /** it's a single selection */
      if (_isBookedDate({ selectedDate: e })) {
        setIsOpenModal(true);
      } else {
        setIsOpenModal(false);
      }
      setDateRange(e);
    }
  };

  const _isDateInCurrentSelection = ({ selectedDate }: { selectedDate: Date }) => {
    if (!Array.isArray(dateRange)) return false;
    let startDate = dateRange[0];
    let endDate = dateRange[1];
    return (
      selectedDate.getTime() <= endDate.getTime() &&
      selectedDate.getTime() >= startDate.getTime()
    );
  };

  /** check if tile is selected booked, otherwise etc
   * return value must be string, see lib
   */
  const _getTileClassName = ({ selectedDate }: { selectedDate: Date }) => {
    let usedClassName = "";
    if (_isDateInCurrentSelection({ selectedDate })) {
      return classes.currentDateSelection;
    }
    if (_isBookedDate({ selectedDate })) {
      return classes.bookedSelection;
    }
    return usedClassName;
  };

  /** handle disabled date */
  const _isBookedDate = ({ selectedDate }: { selectedDate: Date }) => {
    let bookedSpansMap = reformattedTimeSpans.current;
    const selectedMonth = selectedDate.getMonth();
    let bookedSpansOfMonth = bookedSpansMap.get(selectedMonth);
    if (!bookedSpansOfMonth) return false;
    let bookedSpanIterator = bookedSpansOfMonth.values();
    let array: Array<{ startDate: Date; endDate: Date }> = [];
    let result = bookedSpanIterator.next();
    while (!result.done) {
      array.push(result.value);
      result = bookedSpanIterator.next();
    }
    return array.some((elem) => {
      let startDate = elem.startDate;
      let endDate = elem.endDate;
      return (
        selectedDate.getTime() <= endDate.getTime() &&
        selectedDate.getTime() >= startDate.getTime()
      );
    });
  };

  return (
    <>
      <Calendar
        value={dateRange as Date | [Date, Date] | null}
        onChange={(e) => _handleChange(e as Date | Date[])}
        selectRange={true}
        tileClassName={({ date }: { date: Date }) => _getTileClassName({ selectedDate: date })}
      />
      {!isOpenModal && dateRange && (
          <h6>Vous n'avez aucune réservation aux dates sélectionnées</h6>
      )}
      {isOpenModal && dateRange && Array.isArray(dateRange) && (
        // <MotionText>
          <h6>
            Annuler ma réservation {" "}
            {dateRange.map((elem, i) => (
              <span key={i}>{elem.toLocaleDateString()}{i === 0 && ' - '}</span>
            ))}{" "}
          </h6>
        // </MotionText>
      )}
    </>
  );
};

export default GenericCalendar;
