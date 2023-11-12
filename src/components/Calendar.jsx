import { createUseStyles } from "react-jss";
import moment from "moment";
import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = createUseStyles({
  table: {
    width: "100%",
    padding: '40px',
    height: `calc(100vh + 100px)`,
    marginTop: '40px',
    background: "PeachPuff",
    paddingTop: "100px",
  },
  tableHeader: {
    width: "100%",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    background: "slateblue",
    color: "white",
    fontWeight: "400",
  },
  filler: {
    background: "green",
    minHeight: "50px",
    opacity: 0.4,
    border: "4px PeachPuff solid",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
      color: "white",
    },
  },
  blocked: {
    background: "grey",
    opacity: 0.4,
    minHeight: "50px",
    border: "4px PeachPuff solid",
  },
  monthList: {
    width: '100% !important',
    padding: '20px',
    opacity: 0.8,
  },
  eachMonth: {
    display: 'inline-block',
    color: 'bisque',
    cursor: 'pointer',
    padding: '10px',
    margin: '10px',
    background: 'navy',
    borderRadius: '10px',
  },
  daysList: {
    // background: 'green',
  },
  daysOfWeek: {
    background: " PeachPuff",
    minHeight: "50px",
    opacity: '0.4',
    border: '4px solid green',
    fontWeight: 500,
  }
});

const Calendar = (props) => {
  const classes = useStyles();

  const months = [
    { num: '01', days: "31" },
    { num: '02', days: "30" },
    { num: '03', days: "31" },
    { num: "04", days: "30" },
    { num: "05", days: "31" },
    { num: "06", days: "30" },
    { num: "07", days: "31" },
    { num: "08", days: "31" },
    { num: "09", days: "30" },
    { num: "10", days: "31" },
    { num: "11", days: "30" },
    { num: "12", days: "31" },
  ];

  const [chosenMonth, setChosenMonth] = useState(3);

  const firstDay = moment(`${months[chosenMonth].num}-01-2023`)
  .format("dddd")
  .toUpperCase();

  const lastDay = moment(`${months[chosenMonth].num}-${months[chosenMonth].days}-2023`)
  .format("dddd")
  .toUpperCase();

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(firstDay);

  useEffect(() => {
    console.log("herreeeee", chosenMonth);
    setFirstDayOfMonth(moment(`${months[chosenMonth].num}-01-2023`)
    .format("dddd")
    .toUpperCase());
    () => {}
  }, [chosenMonth])

  useEffect(() => {
    console.log('_____________________________', 'firstDayOfMonth', firstDayOfMonth, 'givenMonth', months[chosenMonth].num);
  }, [firstDayOfMonth])

  const year = 2023;

  const hashTableDays = [
    "MONDAY",
    "TUESDAY",
    "WESNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const handleMonthClick = (e, index) => {
    setChosenMonth(index);
  }

  // Here I will do a new hashTable, pour le coup.
  // Il faut que on the fly, je fasse un truc du genre :
  // Donner à chaque case, son index, son jour, son mois, sa date qu'il a;
  // Et du coup après je peux pousser. Ce qu'il se passe quand on clicke dessus.
  // Et du coup je peux le retrouver par identifier unique.
  // ç'aurait été plus simple de faire autrement. 
  // A la limite. Allez, je me fais une map, tranquillement. 

  const handleClickDate = (e, date) => {

  }

  let date = 0;

  let nbrRows = 5;
  let arr = [];
  arr.length = nbrRows;
  arr.fill("");

  return (
    <>
      <table className={classes.table}>
        <thead style={{ width: "100%" }}>
          <tr style={{ width: "100%" }}>
            <th colSpan={'7'} className={classes.monthList}>
              {months.map((month, index) => {
                return (
                <div
                className={classes.eachMonth}
                  key={index}
                  onClick={(e) => handleMonthClick(e, index)}
                  style={{color: index === chosenMonth ? 'orange' : 'pink', transform: index === chosenMonth && 'scale(1.2)'}}
                >
                  {moment(month.num).format("MMMM").toUpperCase()}
                </div>
              )})}
            </th>
          </tr>
        </thead>
        <tbody>
          <>
          <tr className={classes.daysList}>
          {hashTableDays.map((el) => <td className={classes.daysOfWeek}>{el}</td>)}
          </tr>
          {arr.map((el, indexWeek) => {
            let firstDayIndex = hashTableDays.indexOf(firstDay);
            return (
              <tr label={`week ${indexWeek + 1}`}>
                {hashTableDays.map((elem, indexDay) => {
                  let vacuum =
                    (indexWeek === 0 &&
                      (indexWeek + 1) * (indexDay + 1) < firstDayIndex + 1) ||
                    date >= months[chosenMonth].days;
                  if (!vacuum) date++;
                  return (
                    <td
                      key={vacuum ? `void-${indexDay}` : date}
                      onClick={vacuum ? null : (e) => handleClickDate(e, date)}
                      className={vacuum ? classes.blocked : classes.filler}
                    >
                      {!vacuum && date}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr></tr>
          </>
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
