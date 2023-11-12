import { style } from "@vanilla-extract/css";

export const formContainerStyle = style({
  display: 'grid',
  gridTemplateRows: '1fr 7fr',
  gridGap: 10,
  marginTop: 100,
  padding: '40px auto',
})

export const formStyle = style({
  padding: "10px 10px 10px 10px",
  boxShadow: '4px 4px 4px 4px black',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  margin: 'auto 60px',
})

export const fieldArrayClassName = style({
  display: 'flex',
  flexDirection: "row",
  flexWrap: 'wrap',
  gap: 16,
  justifyContent: "space-around",
})

export const eachMediaClassName = style({
  flexBasis: '30%',
  boxShadow: '4px 4px 4px 4px lightGray',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const innerEachMedia = style({
  flexBasis: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
