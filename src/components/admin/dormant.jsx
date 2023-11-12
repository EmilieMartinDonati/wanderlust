import { createUseStyles } from "react-jss";
import { Moment } from "moment";

import { HOMESDATA } from "../../bogusData/homes";
import { BOOKINGSDATA } from "../../bogusData/bookings";
import { USERSDATA } from "../../bogusData/users";
import { getDormantHosts } from "../../actions/bookings";

const useStyles = createUseStyles((theme) => ({
    root: {
      padding: "20px",
    },
    title: {
      color: "slateblue",
      background: "bisque",
      paddingTop: "10px",
      paddingBottom: "15px",
      borderRadius: "15px",
      border: "2px slateblue solid",
      textAlign: "justify",
      paddingLeft: '10px',
      fontWeight: 600,
    },
    warnDisgraceContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      background: "navy",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "10px",
      color: 'white'
    },
    usersToBeWarned: {
      border: "2px red solid",
      borderRadius: "10px",
      padding: "5px",
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
      width: "30%",
      margin: "10px",
      background: "bisque",
    },
    profileContainer: {
      position: "relative",
      display: "flex",
    },
    name: {
      position: "absolute",
      top: "0",
      textTransform: "capitalize",
      color: "slateblue",
      fontWeight: 800,
    },
    text: {
      display: "flex",
      width: '100%',
      justifyContent: "space-between",
    },
    image: {
      maxWidth: "120px !important",
      borderRadius: "70px",
      "&:hover": {
          transform: `scale(1.5)`,
          zIndex: 3,
        },
    },
    star: {
      maxWidth: "40px",
      "&:hover": {
          transform: `scale(2)`,
          zIndex: 3,
        },
    },
  }));

const Dormant = () => {

    const dormantHosts = getDormantHosts(BOOKINGSDATA, USERSDATA, HOMESDATA);

    const classes = useStyles();

    return (
        <div className={classes.root}>
      <p className={classes.title}>
        THOSE HOSTS HAVE BOOKINGS IN WAITING FOR MORE THAN 1 WEEK
      </p>
      <div className={classes.warnDisgraceContainer}>
        {dormantHosts.map((booky) => <p>{booky.createdAt.toString()}</p>)}
      </div>
    </div>
    )
    
}

export default Dormant;