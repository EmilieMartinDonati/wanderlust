
import { useEffect, useLayoutEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
   container: {
    width: 60,
    height: 20,
    display: 'flex',
    borderRadius: '10px',
    willChange: 'justifyContent',
   },
   darkThemed: {
    backgroundColor: 'lightGray',
    "& > *":{
      backgroundColor: 'black',
    }
    },
   lightThemed: {
    backgroundColor: 'bisque',
    "& > *":{
      backgroundColor: 'navy',
    }
   },
   containerStart: {
     justifyContent: 'start',
   },
   containerEnd: {
    justifyContent: 'end',
   },
   checkbox: {
   borderRadius: '50%',
   width: 20,
   height: 20,
   },
   transparentCheckbox: {
     opacity: 0.5,
   },
   hide: {
    display: "none",
    }
}))


const SwitchItem = ({ value = false, onComplete, type = 'checkbox', name = '' }) => {

  const styleRef = useRef(!value ? "start" : 'end');

  const classes = useStyles();

  const _onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); /** necessary to retrieve it well we could put it into local storage etc */
    setTimeout(() => {
      e.target.classList.add(classes.hide);
  }, 0);
  }

  const _onDragEnter = (e) => {
    e.preventDefault(); /** necessary to make the target valid */
  }
  const _onDragOver = (e) => {
    e.preventDefault(); /** necessary to make the target valid */
  }

  const _onDragLeave = (e) => {
    /** unused so far */
  }

  const _onDrop = (e) => {
    /** we change justifyContent of container from start to end or the contrary to make it seem like it has moved */
    const container = document.getElementById('drop-target');
    const classesToToggle = [classes.containerStart, classes.darkThemed, classes.containerEnd, classes.lightThemed];
    classesToToggle.forEach((className) => {
     container.classList.toggle(className);
    })
    /** we also append the right image the to the dragged circle */
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.classList.remove(classes.hide);

    onComplete && onComplete(name);
  }

  useEffect(() => {
    /** draggable element */

    const button = document.getElementById('drag-checkbox');
    button.setAttribute('draggable', true);
    button.addEventListener('dragstart', _onDragStart);
    /** droppable block */
    const container = document.getElementById('drop-target');
    const classesToAdd = value === false ? [classes.containerStart, classes.darkThemed] : [classes.containerEnd, classes.lightThemed];
    if (value === false) {
      styleRef.current = 'start';
    }
    else {
      styleRef.current = "end";
    }
    classesToAdd.forEach((classToAdd) => {
      container.classList.add(classToAdd);
    })
    
    const dragDropEventListeners = [
      {name: "dragenter", function: _onDragEnter},
      {name: "dragleave", function: _onDragLeave},
      {name: 'dragover', function: _onDragOver},
      {name: "drop", function: _onDrop}];

      dragDropEventListeners.forEach((listener) => {
      container.addEventListener(listener.name, listener.function);
    })

  }, []);

  return (
    <div className={classes.container} id='drop-target'><div className={classes.checkbox} id='drag-checkbox'></div></div>)
}

export default SwitchItem;

SwitchItem.proptypes = {
  value: PropTypes.bool,
  onComplete: PropTypes.func,
  type: PropTypes.oneOf(['checkbox']),
  name: PropTypes.string,
}