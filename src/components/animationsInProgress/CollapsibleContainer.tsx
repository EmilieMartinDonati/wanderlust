
import { motion} from 'framer-motion';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    '& > :not(:last-child)': {
     marginBottom: '8px',
    }
  },
  eachOption: {
    backgroundColor: 'papayaWhip',
    color: "darkgray",
    padding: 8,
    borderRadius: '8px',
  }
}));
  
const children = [
  {name: 'Stromae', action: () => {}},
  {name: 'November Ultra', action: () => {}},
  {name: 'Angèle', action: () => {}},
  {name: 'Pierre de Maëre', action: () => {}}
 ];


const CollapsibleContainer = ({isVisible = false, options = children, backgroundColor = 'navy'}) => {


  if (!isVisible) return null;

  const classes = useStyles();

  const container = {
    hidden: { opacity: 0, transform: "scale(0.6), translateY(-8px)" },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 3,
        repeat: 'Infinity',
        repeatDelay: 3,
        // delay: 7,
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    // transition: {delay: 7}
  }
  

  return (
    <div className={classes.root} style={{backgroundColor: backgroundColor}}>
     <motion.div
     variants={container}
     initial="hidden"
     animate="show"
     style={{display: "flex", flexDirection: "column"}}
     className={classes.root}
     >{options.map((child) => (<motion.div className={classes.eachOption} variants={item}>{child.name}</motion.div>))}</motion.div>
    </div>
  )
}
[]

export default CollapsibleContainer;