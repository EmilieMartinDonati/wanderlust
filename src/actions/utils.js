import { useRef, useEffect, useState } from "react"

/** Layout */

const useCanvas = () => {
  const canvasRef = useRef(null);
  let canvasWidth, canvasHeight;
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const ctx = canvasNode.getContext('2d');
    canvasWidth = canvasNode.offsetHeight;
    canvasHeight = canvasNode.offsetWidth;

  }, [canvasRef]);
  return { coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight };
}


const flattenArrayRecursively = (array) => {
  if (!Array.isArray(array[0])) {
    return array;
  }
  else array = array.reduce((prev, curr) => prev.concat(curr));
  return flattenArrayRecursively(array);
}

export function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
