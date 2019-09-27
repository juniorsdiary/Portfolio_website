var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss',
  columns: 12 /* number of grid columns */,
  offset: '0.5rem' /* gutter width px || % || rem */,
  mobileFirst: false /* mobileFirst ? 'min-width' : 'max-width' */,
  container: {
    maxWidth: '1520px' /* max-width оn very large screen */,
    fields: '30px' /* side fields */,
  },
  breakPoints: {
    lg: {
      width: '1100px' /* -> @media (max-width: 1100px) */,
    },
    bg: {
      width: '980px',
    },
    md: {
      width: '780px',
    },
    sm: {
      width: '560px',
    },
    xs: {
      width: '320px',
    },
  },
};

smartgrid('./src/styles', settings);
