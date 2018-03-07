/**
 * Style Variables.
 */

export const font = {
  family: {
    primary: '"Barlow", sans-serif',
    secondary: '"Cormorant Garamond", serif',
  },
  size: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  },
}

export const color = {
  red: 'red',
  black: 'black',
  white: 'white',
  grey: 'grey',
}

const breakpointSizes = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: ''
}

// Iterate through the sizes and create a media template
export const breakpoint = Object.keys(breakpointSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})