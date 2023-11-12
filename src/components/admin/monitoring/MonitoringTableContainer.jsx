
import { monitoringTableArea } from "./monitoring.css";
import {useDispatch} from 'react-redux';

import { selectProperty } from "../../../actions/monitoring";

import moment from "moment";

const MonitoringTableContainer = ({ name = 'properties', className, data = [], reloadData = () => {}, defaultFilters = [], headers= []}) => {

  const dispatch = useDispatch();

  console.log("laa", name);

  const _selectOneProperty = async (data) => {
     await dispatch(selectProperty(data));
  }

  const _handleSelectRow = (oneData) => {
    let _select = () => {};
    // console.log('laaa', oneData, "name", name);
    switch (name) {
      case "properties":
       _select = () => _selectOneProperty(oneData);
       break;
      case "owners" :
        // _select = () => selectBestRaterOwner(data);
        break;
      case "arrivals":
        // _select = () => selectRecentArrivals(data);
        break;
      case "departures" :
        // _select = () => selectImminentDepartures(data);
        break;
      default :
      break;
    }
    return _select();
  }

  return (
    <table className={monitoringTableArea}>
      <thead><tr>{headers.map((header) => <th>{header.label}</th>)}</tr></thead>
      <tbody>{data.map((oneData) => <tr style={{cursor: 'pointer', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} onClick={() => _handleSelectRow(oneData)}>{headers.map((header) => {
      let content = oneData[header.id];
      switch (header.id) {
        case 'address':
        case "user":
        case "housingCapacity":
          break;
        case "bookedSpan":
          const {start, end} = content;
          content = <span>{`${moment(start).format("DD-MM-YYYY")} - ${moment(end).format("DD-MM-YYYY")}`}</span>;
          break;
        default :
        content = <div></div>
      }
      return (<td>{content}</td>)
      }
      )}</tr> )}</tbody>
      </table>
  )

}

export default MonitoringTableContainer;