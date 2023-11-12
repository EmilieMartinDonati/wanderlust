import React, { useState, useEffect } from "react";
import GenericCalendar from "../../commons/GenericCalendar";

import { createUseStyles } from "react-jss";
import { CENTRAL_MODAL_HEADER_HEIGHT } from "../../../actions/layout";

/** for testing purposes only */
import { bogusCalendars } from "../../../bogusData/calendar";

const useStyles = createUseStyles((theme) => ({
  root: {
    marginTop: CENTRAL_MODAL_HEADER_HEIGHT,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  date: {
    textTransform: "capitalize",
  },
}));

const OwnerCalendar = () => {
  const classes = useStyles();

  const [dateRange, setDateRange] = useState(null);
  const [currentCalendars, setCurrentCalendars] = useState([]);
  const [cancelledSelection, setCancelledSelection] = useState([]);
	const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchUserCalendars = async () => {
      setCurrentCalendars(bogusCalendars);
    };
    fetchUserCalendars();
  }, []);


  return (
    <div className={classes.root}>
      <GenericCalendar
        bookedTimeSpans={currentCalendars}
        dateRange={dateRange}
        setDateRange={setDateRange}
				cancelledSelection={cancelledSelection}
				setCancelledSelection={setCancelledSelection}
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};

export default OwnerCalendar;
