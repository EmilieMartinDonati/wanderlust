import SlickSlider from 'react-slick';

import { createUseStyles } from "react-jss";

// const GUTTER = 16;

const useStyles = createUseStyles((theme) => ({
  root: {
   display: 'flex',
   padding: [40, 40],
  },
  eachItem: {

  },
  dots: {
		position: 'relative',
		bottom: 10,
		'& li button:hover:before,button:focus:before': {
			opacity: 0.25
		},
		'& li.slick-active button:before': {
			opacity: 1,
			color: '#003A42',
		},
		'& li button::before': {
			fontSize: 11
		}
	},
  slick: {
    overflow: 'hidden',
    position: 'relative',
		flex: 1,
		display: 'flex', // we can't use composes because of the order of the css declaration,
    // justifyContent: 'center',
    // alignItems: 'center',
		flexDirection: 'column',
    height: 200,
    border: '2px red solid',
		'& .slick-list': {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
			flex: 1
		},
		'& .slick-track': {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
			flex: 1,
      gap: 0,
		},
		'& .slick-slide': {
			position: 'relative',
      border: '1px black solid',
      minWidth: 756,
			maxWidth: 756,
      height: "50vh",
		},
    '& .slick-cloned': {
			// visibility: 'hidden',  /** the items are cloned when setting is set to infinite 'true'  */
		},
    '& .slick-arrow': {
     zIndex: 1800,
     height: 40,
     width: 40,
     fontSize: 12,
     alignSelf: 'center',
     position: 'fixed',
    },
    '& .slick-prev': {
      // position: 'absolute',
      left: '0 !important',
		},
    '& .slick-next': {
			// position: 'absolute',
      right: '0 !important',
		},
    '& .slick-dots': {
			display: 'flex !important',
      flexDirection: 'row !important',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      bottom: 0,
      zIndex: 4000,
      gap: 8,
      '& li': {
        color: 'bisque',
        border: '2px red solid',
      },
      '& li button': {
        color: 'red',
        outline: 'none',
        border: 'none',
      }
		},
	}
}))

const SliderCarousel = ({ items, settings }) => {

  const classes = useStyles();

  /** i'm not seeing the arrow and dots because of overflow 'hidden" so had to put them as fixed or sticky which is pretty horrible */

  return <SlickSlider className={classes.slick} {...settings}>{items}</SlickSlider>
  
}

export default SliderCarousel;