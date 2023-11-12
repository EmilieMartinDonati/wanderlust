import classNames from "classnames";
import React from "react";
import { createUseStyles } from "react-jss";
import deleteIcon from "../../public/images/profile/close.png";
import addIcon from '../../public/images/eye.png';

const useStyles = createUseStyles((theme) => ({
  contained: {
    width: 100,
    height: 50,
  },
  sized: {
    width: 70,
    height: 50,
    margin: [10, 10],
    fontSize: 12,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [10, 10],
    background: 'navy',
    border: '1px solid lightgrey',
    color: 'lightgrey'
  },
  xs: {
    transform: 'scale(0.3)'
  },
  xl: {
    transform: 'scale(1.7)'
  },
  rounded: {
    borderRadius: '50%',
  },
  oval: {
    borderRadius: '70%',
  },
  green: {
    background: 'green',
    border: '1px solid white',
    color: 'white'
  },
  black: {
    background: 'black',
    border: '1px solid lightgrey',
    color: 'lightgrey'
  },
  logo: {
    width: 20,
    height: 20,
  }
}))

const Button = ({ title = null, size, variant, onClick, mode = 'delete', parentClassName, color = 'navy', type='button' }) => {

  let chainedClassNames = [];

  const classes = useStyles();

  const _getClassNames = () => {
    if (parentClassName) {
      chainedClassNames.push(parentClassName);
    }
    let baseClassName = classes.sized;
    chainedClassNames.push(baseClassName)
    if (size === "xs") {
      chainedClassNames.push(classes.xs)
    }
    if (size === 'xl') {
      chainedClassNames.push(classes.xl)
    }
    switch (variant) {
      case "contained":
        chainedClassNames.push(classes.contained)
        break;
      case "oval":
        chainedClassNames.push(classes.oval)
        break;
      case "rounded":
        chainedClassNames.push(classes.rounded)
        break;
      default:
        break;
    }
    switch (color) {
      case "green":
        chainedClassNames.push(classes.green)
        break;
      case "black":
        chainedClassNames.push(classes.black)
        break;
      default:
        break;
    }
    return chainedClassNames;
  }

  const _getIcon = () => {
    if (title) return null;
    switch (mode) {
      case "delete":
        return <img className={classes.logo} alt='delete' src={deleteIcon}></img>
      case "add":
        return <img className={classes.logo} alt='add' src={addIcon}></img>
      default:
        return null;
    }
  }

  return <button type={type} onClick={onClick} className={classNames(_getClassNames())}>{title || _getIcon()}</button>
}

export default Button;