
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import moment from "moment";

const useStyles = createUseStyles((theme) => ({
  nextPrevMonth: {
    opacity: 0.7,
    backgroundColor: "lightGray",
  },
  tableCell: {
    margin: 0,
    width: '100 !important',
    height: '60px !important',
    maxHeight: '60px !important',
    minHeight: '60px !important',
    textOverflow: 'ellipsis',
    border: "1px solid gray",
  },
  inRangeSelection: {
    background: "slateblue",
    color: "white",
  },
  endStartRangeSelection: {
    background: "navy",
    color: 'lightgray',
  },
}))

const CalendarBody = ({ weeksInMonth, onClickDay, rangeSelection = [] }) => {

  const classes = useStyles();

  const rearrangeDate = date => {
    let newArr = [];
    const originalArr = date.split('-');
    const year = originalArr.at(0);
    const month = originalArr.at(1);
    const day = originalArr.at(2);
    newArr.push(`${day} `, `${month} `,`${year} `);
    return newArr.join(' ');
  }

  const _isDateInBetween = (date) => {
    let startDay = rangeSelection.start?.day, endDay = rangeSelection.end?.day;
    if (!endDay || !startDay) return false;
    return (moment(date.day).isBefore(moment(endDay)) && moment(date.day).isAfter(moment(startDay)));
  }

  return (<tbody>
        {weeksInMonth.length !== 0 && weeksInMonth.map((week, index) => {
          return (
            <tr key={index}>
              {week.weekDays.map((day, index) => {
                const classnames = [classes.tableCell];
                if (day.isNextMonth || day.isPrevMonth) {
                  classnames.push(classes.nextPrevMonth);
                }
                if (Object.values(rangeSelection).some((dateInRange) => dateInRange === day)) {
                  classnames.push(classes.endStartRangeSelection);
                }
                if (_isDateInBetween(day)) {
                  classnames.push(classes.inRangeSelection);
                }
                return (
                  <td
                  key={index}
                    className={classNames(classnames)}
                    onClick={() => onClickDay(day)}
                  >
                    {rearrangeDate(day.day)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>);
}

export default CalendarBody;