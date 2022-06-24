import { Box, Paper, Button, TextField, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { TypographyComponent } from '../common';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

function EventForm({ onSubmitRequest, disabled, formTitle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Paper sx={{ border: 1, borderColor: 'grey.300', padding: '2rem' }}>
      <TypographyComponent type="header" sx={{ p: '1rem' }}>
        {formTitle}
      </TypographyComponent>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitRequest)}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            disabled={disabled}
            error={!!errors.name}
            helperText={
              errors.name?.message && <span>{errors.name?.message}</span>
            }
            {...register('name')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            autoComplete="description"
            autoFocus
            disabled={disabled}
            error={!!errors.description}
            helperText={
              errors.description?.message && (
                <span>{errors.description?.message}</span>
              )
            }
            {...register('description')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
            data-test="submit-sign-up"
          >
            {formTitle}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

EventForm.propTypes = {
  onSubmitRequest: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  formTitle: PropTypes.string.isRequired,
};

export default EventForm;
