
const BLUES = {
  primary: "#2A71AA",
  officeBlue: "#0078D4",
  marineBlue: "#79B7D3"
}

const YELLOWS = {
  sand: "#FFE4C4"
}

const GREENS = {
  petulant: "#28B62D"
}

const Z_INDEXES = {  // increment accordingly
  mainHeader: 200,
}

export const JSS_THEMATIC_STYLES = {
  colors: {
    blue: { ...BLUES },
    yellow: { ...YELLOWS },
    green: { ...GREENS }
  },
  zIndexes: { ...Z_INDEXES }
}