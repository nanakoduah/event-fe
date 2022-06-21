import { Box, Checkbox, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoriesAPI, UserAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';

function DashboardCategories() {
  const [selectionMap, setSelectionMap] = useState({});
  const [apiCall, status, error, categoryResponse] = useAsync(
    CategoriesAPI.getCategories
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    apiCall();
  }, []);

  const onSelectionChanged = (status, category) => {
    setSelectionMap((prevState) => {
      if (status) {
        return {
          ...prevState,
          [category._id]: category._id,
        };
      }

      const newObj = { ...prevState };
      delete newObj[category._id];

      return newObj;
    });
  };

  const handleSubscribe = async () => {
    try {
      const response = await UserAPI.subscribe({
        subscriptions: Object.keys(selectionMap),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newMap = user.subscriptions.reduce((acc, sub) => {
      acc[sub] = sub;

      return acc;
    }, {});

    setSelectionMap(newMap);
  }, [user, user.subscriptions]);

  if (status === 'pending' || error) {
    return null;
  }

  if (!categoryResponse) {
    <div>Loading ...</div>;
  }

  console.log(selectionMap);

  return (
    <Paper sx={{ border: 1, borderColor: 'grey.300', padding: '0.3rem' }}>
      <Typography variant="h6" component="h3" sx={{ p: '1rem' }}>
        Select event to subscribe to
      </Typography>
      <div>
        {categoryResponse &&
          categoryResponse.categories.map((category) => (
            <Box
              key={category._id}
              component="li"
              sx={{ marginBottom: '0.8rem', listStyle: 'none' }}
            >
              <Box component="label" htmlFor={`check-input-${category._id}`}>
                <Checkbox
                  id={`check-input-${category._id}`}
                  type="checkbox"
                  onChange={(evt) =>
                    onSelectionChanged(evt.currentTarget.checked, category)
                  }
                  checked={!!selectionMap[category._id]}
                />
                {category.name}
              </Box>
            </Box>
          ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: '1rem',
          }}
        >
          <Button onClick={handleSubscribe} variant="contained">
            Update subscribe
          </Button>
        </Box>
      </div>
    </Paper>
  );
}

export default DashboardCategories;
