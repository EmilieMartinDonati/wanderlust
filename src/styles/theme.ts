
const COLORS = {
  tide: {
    50:  "#EBF2F8",
    100: "#D2E0EE",
    200: "#A6C2DD",
    300: "#79A3CC",
    400: "#4D85BB",
    500: "#2A71AA",
    600: "#225A88",
    700: "#194366",
    800: "#112D44",
    900: "#081622",
  },
  bisque: {
    50:  "#FFF7EC",
    100: "#FFE4C4",
    200: "#F5D2A6",
    300: "#E5BB85",
    400: "#C99D63",
    500: "#A07C42",
  },
  green: {
    100: "#D4F1D5",
    500: "#28B62D",
    700: "#1B7F1F",
  },
  neutral: {
    50:  "#FAF7F2",
    100: "#F1ECE3",
    200: "#E3DCD0",
    300: "#C9C0B2",
    400: "#9B9285",
    500: "#6E665B",
    600: "#4D463D",
    700: "#2E2A24",
    900: "#1A1813",
  },
  semantic: {
    info:    "#2A71AA",
    success: "#28B62D",
    warning: "#C99D63",
    danger:  "#B33A3A",
  },
}

const TYPOGRAPHY = {
  family: {
    display: "Georgia, 'Times New Roman', serif",
    base:    "-apple-system, 'Segoe UI', system-ui, sans-serif",
    mono:    "'JetBrains Mono', 'SF Mono', Menlo, monospace",
  },
  size: {
    xs:      "12px",
    sm:      "13px",
    md:      "16px",
    lg:      "20px",
    xl:      "28px",
    display: "38px",
  },
  weight: {
    regular: 400,
    medium:  500,
    bold:    700,
  },
  lineHeight: {
    tight: 1.15,
    base:  1.625,
    loose: 1.8,
  },
}

const SPACING = {
  xs:   "4px",
  sm:   "8px",
  md:   "12px",
  lg:   "16px",
  xl:   "24px",
  xxl:  "32px",
  xxxl: "48px",
  huge: "64px",
}

const BREAKPOINTS = {
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
}

const SHADOWS = {
  sm: "0 1px 3px rgba(0,0,0,0.12)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)",
}

const RADII = {
  sm:   "4px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  pill: "9999px",
}

const Z_INDEXES = {
  mainHeader: 200,
  modal:      300,
  tooltip:    400,
}

export const JSS_THEMATIC_STYLES = {
  colors:      COLORS,
  typography:  TYPOGRAPHY,
  spacing:     SPACING,
  breakpoints: BREAKPOINTS,
  shadows:     SHADOWS,
  radii:       RADII,
  zIndexes:    Z_INDEXES,
}

export type Theme = typeof JSS_THEMATIC_STYLES


export const CENTRAL_MODAL_HEIGHT = 600;
export const CENTRAL_MODAL_WIDTH = 800;
export const CENTRAL_MODAL_CONTENT_HEIGHT = 500;
export const CENTRAL_MODAL_HEADER_HEIGHT = 50;

