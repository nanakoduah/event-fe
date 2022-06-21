import { Box, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CategoriesAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';

function DashboardCategories() {
  const [apiCall, status, error, categoryResponse] = useAsync(
    CategoriesAPI.getCategories
  );

  useEffect(() => {
    apiCall();
  }, []);

  if (status === 'pending' || error) {
    return null;
  }

  if (!categoryResponse) {
    <div>Loading ...</div>;
  }

  return (
    <Paper sx={{ border: 1, borderColor: 'grey.300', padding: '0.3rem' }}>
      <ul>
        {categoryResponse &&
          categoryResponse.categories.map((category) => (
            <Box
              key={category._id}
              component="li"
              sx={{ marginBottom: '0.8rem', listStyle: 'none' }}
            >
              <Link to={`/${category._id}`}>{category.name}</Link>
            </Box>
          ))}
      </ul>
    </Paper>
  );
}

export default DashboardCategories;
