import { selectedCardStyle, remoteCardStyle, simpleCardStyle } from "./card.css";

const Card = ({ index, arr, selected = false, title, onSelect }) => {
 
  /** process remoteness of the card based on the center of the array */
  const arrayCenter = Math.floor(arr.length / 2); /** eg length is 10, arrayMean is 5 */
  /** is remote === index [0, 1, 8, 9] */
  const isRemote = Math.abs(index - arrayCenter) >= 2;

  return <div onClick={() => onSelect(index)} className={selected ? selectedCardStyle: isRemote ? remoteCardStyle : simpleCardStyle}>{title}</div>

}

export default Card;