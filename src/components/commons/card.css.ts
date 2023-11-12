import { style } from "@vanilla-extract/css";

export const simpleCardContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '40px 5px',
  gap: 30,
})

export const simpleCardStyle = style({
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 padding: '5px 10px',
 border: '1px solid navy',
 borderRadius: '15px',
 boxShadow: '-7px 5px 2px navy',
 ':hover': {
  cursor: 'pointer',
  transform: 'scale(1.1)',
 }
})

export const selectedCardStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px 10px',
  border: '1px solid navy',
  borderRadius: '15px',
  boxShadow: '-7px 5px 2px navy',
  ':hover': {
   cursor: 'pointer',
   transform: 'scale(1.1)',
  },
  flexGrow: 3,
  backgroundColor: 'slateblue',
})

export const remoteCardStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px 10px',
  border: '1px solid navy',
  borderRadius: '15px',
  boxShadow: '-7px 5px 2px navy',
  ':hover': {
   cursor: 'pointer',
   transform: 'scale(1.1)',
  },
  // flexShrink: 0,
})