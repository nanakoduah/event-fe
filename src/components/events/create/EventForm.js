import { Box, Paper, Button, TextField, Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { CategoriesAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import { Select, TypographyComponent } from '../../common';
import useNotification from '../../../hooks/useNotification';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  date: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),
  isVirtual: yup.boolean(),
  address: yup.string().when('isVirtual', {
    is: false,
    then: yup.string().required('Provide address or set as virtual conference'),
  }),
});

function EventForm({ onSubmitRequest, disabled }) {
  const showNotification = useNotification();
  const [apiCall, status, error, categoryResponse] = useAsync(
    CategoriesAPI.getCategories
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [addressValue, isVirtualValue] = watch(['address', 'isVirtual']);

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (error) {
      showNotification({
        severity: 'error',
        message: error || 'Something went loading some page data.',
      });
    }
  }, [error]);

  const onDateFocus = (evt) => {
    evt.target.type = 'date';
  };

  const onDateBlur = (evt) => {
    evt.target.type = 'text';
  };

  if (!categoryResponse) {
    return <div>Loading ...</div>;
  }

  return (
    <Paper sx={{ border: 1, borderColor: 'grey.300', padding: '2rem' }}>
      <TypographyComponent type="header" sx={{ p: '1rem' }}>
        Create event
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
            id="title"
            label="Title"
            autoComplete="title"
            autoFocus
            disabled={disabled}
            error={!!errors.title}
            helperText={
              errors.title?.message && <span>{errors.title?.message}</span>
            }
            {...register('title')}
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
          <Select
            required
            label="Category"
            id="category"
            error={!!errors.category}
            disabled={disabled}
            helperText={
              errors.category?.message && (
                <span>{errors.category?.message}</span>
              )
            }
            options={categoryResponse ? categoryResponse.categories : ''}
            {...register('category')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Date"
            id="date"
            error={!!errors.date}
            disabled={disabled}
            helperText={
              errors.date?.message && <span>{errors.date?.message}</span>
            }
            {...register('date')}
            onFocus={onDateFocus}
            onBlur={onDateBlur}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            id="address"
            error={!!errors.address}
            disabled={disabled || !!isVirtualValue}
            helperText={
              errors.address?.message && <span>{errors.address?.message}</span>
            }
            {...register('address')}
          />
          <label htmlFor="is-virtual">
            <Checkbox
              label="Virtual conference"
              id="is-virtual"
              disabled={disabled || !!addressValue}
              {...register('isVirtual')}
            />
            Virtual conference
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
            data-test="submit-sign-up"
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

EventForm.propTypes = {
  onSubmitRequest: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default EventForm;
