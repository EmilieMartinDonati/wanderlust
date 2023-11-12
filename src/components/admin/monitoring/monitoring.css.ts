import { style } from "@vanilla-extract/css";

export const monitoringGridStyle = style({
  display: 'grid',
  gridTemplateAreas: `'filterOptions filterOptions filterOptions filterOptions' 'table table table map'`,
  gridTemplateRows: '(1fr, 500px)',  // ça n'a pas marché pour le coup ce truc.
  gridTemplateColumns: 'repeat(4, 1fr)',  // essayer avec minMax pour le coup.
})

export const monitoringFilterOptionsArea = style({
  gridArea: 'filterOptions',
  backgroundColor: 'papayaWhip',
})

export const monitoringTableArea = style({
  gridArea: 'table',
  backgroundColor: 'bisque',
  minHeight: 200,
})

export const monitoringMapArea = style({
  gridArea: 'map',
  backgroundColor: 'navy',
})