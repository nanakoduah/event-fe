import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const TYPO_MAP = {
  text: {},
  subHeader: { variant: 'h6', component: 'h6' },
  header: { variant: 'h4', component: 'h3' },
  title: { variant: 'h5', component: 'h5' },
};

function TypographyComponent({
  children,
  type = 'text',
  variant,
  component,
  ...restProp
}) {
  return (
    <Typography {...TYPO_MAP[type]} {...restProp}>
      {children}
    </Typography>
  );
}

TypographyComponent.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default TypographyComponent;
