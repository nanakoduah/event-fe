import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { forwardRef } from 'react';

const MUISelect = forwardRef(
  (
    {
      defaultValue = '',
      label,
      error,
      options = [],
      defaultOptionLabel,
      helperText,
      sx,
      inputProps,
      disabled,
      value = '',
      onChange = () => null,
      ...restProps
    },
    ref
  ) => {
    return (
      <FormControl
        sx={{
          display: 'flex',
          flex: '1',
          width: '100%',
          boxSizing: 'border-box',
          borderColor: 'red',
          ...sx,
        }}
      >
        <InputLabel id={`${restProps.name}-label`}>{label}</InputLabel>
        <Select
          label={label}
          defaultValue={defaultValue}
          disabled={disabled || !options}
          onChange={onChange}
          ref={ref}
          {...restProps}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ color: 'primary.main' }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    );
  }
);

export default MUISelect;
