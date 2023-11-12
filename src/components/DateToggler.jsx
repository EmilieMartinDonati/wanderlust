import { createUseStyles } from "react-jss";


const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: "row",
  },
  arrowsContainer: {
    display: 'flex',
  },
  arrow: {
    cursor: 'pointer',
  },
  dateContainer: {
    flexBasis: '40%',
  }
}))


const DateToggler = ({ month, year, changeMonth, changeYear }) => {

  const classes = useStyles();

  const correlation = { 0: "Janvier", 1: 'Février', 2: "Mars", 3: 'Avril', 4: "Mai", 5: 'Juin', 6: 'Juillet', 7: 'Août', 8: "Septembre", 9: 'Octobre', 10: 'Novembre', 11: 'Décembre' }

  const _changeYear = (mode = 'prev') => {
    if (mode === 'prev') {
      changeYear(year - 1);
    }
    else { changeYear(year + 1) };
  }

  const _changeMonth = (mode = "prev") => {
    if (mode === "prev") {
      let newMonth = month - 1 >= 0 ? month - 1 : 11;
      if (newMonth === 11) {
        _changeYear('prev');
      }
      changeMonth(newMonth);
    }
    else {
      let newMonth = month + 1 <= 11 ? month + 1 : 0;
      if (month + 1 > 11) _changeYear("next");
      changeMonth(newMonth);
    }
  }

  return <div className={classes.root}>
    <div className={classes.arrowsContainer}><div onClick={() => _changeYear("prev")}>flèche back year</div><div onClick={(e) => _changeMonth('prev')}>flèche back month</div></div>
    <div className={classes.dateContainer}>{correlation[month]} {year}</div>
    <div className={classes.arrowsContainer}><div onClick={(e) => _changeMonth("next")}>flèche next month</div><div onClick={() => _changeYear("next")}>flèche next year</div></div>
  </div>
}


export default DateToggler;