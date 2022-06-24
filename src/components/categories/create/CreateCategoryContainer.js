import { Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { CategoriesAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import { AppWrapper } from '../../common';
import CategoryForm from '../CategoryForm';

function CreateCategoryContainer() {
  const showNotification = useNotification();
  const [createCategory, createStatus, createError, createValue] = useAsync(
    CategoriesAPI.createCategory
  );

  useEffect(() => {
    if (createError) {
      showNotification({
        severity: 'error',
        message: createError || 'There was an error creating category.',
      });
    }
  }, [createError]);

  useEffect(() => {
    if (createValue) {
      showNotification({
        severity: 'success',
        message: 'Category successfully created.',
      });
    }
  }, [createValue]);

  return (
    <AppWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} mx="auto">
          <CategoryForm
            onSubmitRequest={createCategory}
            formTitle="Create category"
            disabled={createStatus === 'pending'}
          />
        </Grid>
      </Grid>
    </AppWrapper>
  );
}

export default CreateCategoryContainer;
