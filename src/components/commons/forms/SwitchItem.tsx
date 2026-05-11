
import { useEffect, useRef } from 'react';

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

interface SwitchItemProps {
  value?: boolean
  onComplete?: (name: string) => void
  type?: 'checkbox'
  name?: string
}

const SwitchItem = ({ value = false, onComplete, type = 'checkbox', name = '' }: SwitchItemProps) => {

  const styleRef = useRef(!value ? "start" : 'end');

  const classes = useStyles();

  const _onDragStart = (e: DragEvent) => {
    e.dataTransfer!.setData('text/plain', (e.target as HTMLElement).id);
    setTimeout(() => {
      (e.target as HTMLElement).classList.add(classes.hide);
    }, 0);
  }

  const _onDragEnter = (e: DragEvent) => {
    e.preventDefault();
  }
  const _onDragOver = (e: DragEvent) => {
    e.preventDefault();
  }

  const _onDragLeave = (e: DragEvent) => {
    /** unused so far */
  }

  const _onDrop = (e: DragEvent) => {
    const container = document.getElementById('drop-target');
    if (!container) return;
    const classesToToggle = [classes.containerStart, classes.darkThemed, classes.containerEnd, classes.lightThemed];
    classesToToggle.forEach((className) => {
     container.classList.toggle(className);
    })
    const id = e.dataTransfer!.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable?.classList.remove(classes.hide);

    onComplete && onComplete(name);
  }

  useEffect(() => {
    const button = document.getElementById('drag-checkbox');
    if (!button) return;
    button.setAttribute('draggable', 'true');
    button.addEventListener('dragstart', _onDragStart);
    const container = document.getElementById('drop-target');
    if (!container) return;
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

    const dragDropEventListeners: Array<{ name: string; function: (e: DragEvent) => void }> = [
      {name: "dragenter", function: _onDragEnter},
      {name: "dragleave", function: _onDragLeave},
      {name: 'dragover', function: _onDragOver},
      {name: "drop", function: _onDrop}];

    dragDropEventListeners.forEach((listener) => {
      container.addEventListener(listener.name, listener.function as EventListener);
    })

  }, []);

  return (
    <div className={classes.container} id='drop-target'><div className={classes.checkbox} id='drag-checkbox'></div></div>)
}

export default SwitchItem;
