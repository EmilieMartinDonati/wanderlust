import React, { useState, useRef } from 'react';

import Tree from "../../public/images/tree.jpg";
import Milky from "../../public/images/milky.jpg";
import Lake from "../../public/images/lake.jpg";
import Street from "../../public/images/street.jpg";
import Beach from "../../public/images/beach.jpg";
import Play from "../../public/images/play.jpg";
import Bridge from "../../public/images/bridge.jpg";

import BackArrow from '../../public/images/profile/BackArrow.png';
import ForwardArrow from '../../public/images/profile/ForwardArrow.png';

import { createUseStyles } from "react-jss";

import { carouselRootStyle, carouselContainerStyle } from './carousel.css';


const GUTTER_SIZE = 10;
const IMAGE_WIDTH = 400;

const useStyles = createUseStyles((theme) => ({
  '@keyframes leftMargin': {
    '0%': {
      // voir comment je peux animer ce truc moi.
    },
    '100%': {
  // voir comment je peux animer ce truc moi.
    }
  },
  rootContainer: {
    marginTop: 300,
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    gap: GUTTER_SIZE,
    paddingLeft: GUTTER_SIZE,
    maxWidth: GUTTER_SIZE + IMAGE_WIDTH, /** ultra important to make sure we only display one image at a time, the rest are hidden until we displace the negative margin */
    minWidth: GUTTER_SIZE + IMAGE_WIDTH,
    width: GUTTER_SIZE + IMAGE_WIDTH,
    overflow: 'hidden',
  },
  controlBack: {
    position: 'absolute',
    left: 5 - GUTTER_SIZE,
    top: 175,
  },
  controlForward: {
    position: 'absolute',
    right: 5 - GUTTER_SIZE,
    top: 175,
  },
  eachControl: {
    height: 50,
    width: 50,
    cursor: 'pointer',
  },
  imagesContainer: {
    maxWidth: GUTTER_SIZE * 2 + IMAGE_WIDTH, /** ultra important to make sure we only display one image at a time */
    minWidth: GUTTER_SIZE * 2 + IMAGE_WIDTH,
    width: GUTTER_SIZE * 2 + IMAGE_WIDTH,
    marginLeft: ({ margin }) => margin,  /** it becomes negative to show next slide on carousel and hide previous */
    display: 'flex',
    gap: GUTTER_SIZE,
    justifyContent: 'space-between',
  },
  eachImage: {
    width: IMAGE_WIDTH,
    minWidth: IMAGE_WIDTH,
    maxWidth: IMAGE_WIDTH,
    height: 400,
    display: 'inline',
    borderRadius: '10px',
  }
}));

const HandmadeCarousel = ({ mode = 'image', leap = 3, data = [], numberOfImagesOnDisplay = 1,  /** setMarginLeft, marginLedt, currentIndex, setCurrentIndex should be there */ }) => {

  /** carousel implemented w/ layout only 
   * maybe not the best practise ^^
   * leap should not be enabled but it's if we want to 
   * The image tag could be wrapped inside a motion div to make it smooth ... 
   * Not sure how I can do that
   * We can change the number of images/elem on display if we want (right now it is only one)
   * It should be equal to the leap actually.
   * I should try to animate it here.
   * J'aurais pu faire vachement plus court avec un translate pour le coup
  */

  const marginLeftRef = useRef(0);
  const currentIndexRef = useRef(0);


  const [marginLeft, setMarginLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);  /** we can't go forward or back if the index exceeds the array length or is first */

  const arrayTest = [Tree, Milky, Lake, Street, Beach, Play, Bridge];
                     // 0 .  410    820  1230   1640   2050

  const MAX_INDEX_FORWARD = arrayTest.length - 1;
  const MIN_INDEX_BACK = 0;

  const MODIFIER = (IMAGE_WIDTH + GUTTER_SIZE) * leap;

  let margin = marginLeftRef.current;

  const classes = useStyles({ margin, numberOfImagesOnDisplay });


  const _getContent = (elem, index) => {
    switch (mode) {
      case "image": 
      return <img className={classes.eachImage} key={index} src={elem} />
      default :
      return <div className={classes.eachImage} key={index}>{elem}</div>
    }
  }


  const _onGoForward = () => {
    const _handleGoForward = (index) => {
      if (index === MAX_INDEX_FORWARD) {
        setCurrentIndex(0);
        setMarginLeft(0);
        marginLeftRef.current = 0;
        currentIndexRef.current = 0;
        return;
      }
      else {
        let putativeFutureIndex = index + leap;
        if (putativeFutureIndex >= MAX_INDEX_FORWARD) {
            _handleGoForward(index - 1); /** retry with a less ambitious index could be done with a while loop ? */
        }
        setCurrentIndex(index + leap);
        setMarginLeft(marginLeft - MODIFIER);  /** - 410 each time we change the index */
        marginLeftRef.current = index + leap;
        currentIndexRef.current = marginLeft - MODIFIER;
      }
    }
    _handleGoForward(currentIndex);
  }

  const _onGoBack = () => {

    const _handleGoBack = (index) => {
      if (index === MIN_INDEX_BACK) {
        setCurrentIndex(arrayTest.length - 1);
        let maxNegativeMargin = ( MODIFIER / leap) * (arrayTest.length - 1);
        setMarginLeft(-maxNegativeMargin);
        marginLeftRef.current = -maxNegativeMargin;
        currentIndexRef.current = arrayTest.length - 1;
        return;
      }
      else {
        /** to handle leap cases, we have to recurse here */
        let putativeFutureIndex = index - leap;
        if ((putativeFutureIndex) <= MIN_INDEX_BACK) {
          _handleGoBack(index + 1);
        }
        setCurrentIndex(index - leap);
        setMarginLeft(marginLeft + MODIFIER);
        marginLeftRef.current = marginLeft + MODIFIER;
        currentIndexRef.current = index - leap;
      }
    }
    _handleGoBack(currentIndex);

  }

  return (
    <div className={classes.rootContainer}>
      <div className={classes.imagesContainer}>{arrayTest.map((image, index) => _getContent(image, index))}</div>
      <div className={classes.controlBack} onClick={_onGoBack}><img className={classes.eachControl} alt='' src={BackArrow} /></div>
      <div className={classes.controlForward} onClick={_onGoForward}><img className={classes.eachControl} alt='' src={ForwardArrow} /></div>
    </div>
  )

}

export default HandmadeCarousel;