
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'grid',
    gridTemplateAreas: `'sky sky sky' 'flower space cat'`,
    gridTemplateColumns: ["3fr", "1fr", "3fr"].join(' '),
    gridTemplateRows: ["1fr", "4fr"].join(' '),
    height: 300,
    width: 600,
    border: '2px solid black',
    marginBottom: 200,
    marginTop: 100,
    marginLeft: 100,
  },
  skyContainer: {
    gridArea: "sky",
    backgroundColor: 'gray',
  },
  spaceContainer: {
    gridArea: "space",
    backgroundColor: 'gray',
  },
  catContainer: {
    gridArea: "cat",
  },
  flowerContainer: {
    gridArea: 'flower',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    flexDirection: 'column',
  },
  flowerStalk: {
    flexBasis: "55%",
    backgroundColor: 'green',
    width: 4,
  },
  flowerBud: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
  },
  weed: {
    gridArea: 'weed',
  }   
}))



const FlowerAndCat = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.skyContainer} />
      <div className={classes.flowerContainer}>
        <div className={classes.flowerBud} />
        <div className={classes.flowerStalk}></div>
        <div className={classes.weed} />
      </div>
      <div className={classes.spaceContainer} />
      <div className={classes.catContainer} />

    </div>
  )
}


export default FlowerAndCat;