import { style } from "@vanilla-extract/css";


export const carouselRootStyle = style({
  marginTop: 200,
})

export const carouselContainerStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative', /** for the controls */
  minWidth: 400,
})

export const carouselControlLeft = style({
  position: 'absolute',
  left: 6,
})

export const carouselControlRight = style({
  position: 'absolute',
  right: 6,
})