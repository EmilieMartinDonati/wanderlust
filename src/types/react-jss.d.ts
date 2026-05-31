import type { Theme } from '../styles/theme'

declare module 'react-jss' {
  interface DefaultTheme extends Theme {}
}
