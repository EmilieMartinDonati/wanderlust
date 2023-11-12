import { style } from "@vanilla-extract/css";

export const inputStyle = style({
    margin: '0px, 20px',
		padding: '5px 0px',
		border: "none !important",
		outline: "none !important",
		borderRadius: "10px",
		textAlign: "center",
		background: "papayawhip",
		// "&:focus, &:active:focus, &:hover, &:disabled": {
		// 	background: "papayawhip",
		// },
    // not sure how to use pseudo selector with vanilla js.
})

export const labelStyle = style({
  padding: '5px 0px',
  fontSize: 12,
})

export const inputContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})