import { Box, Checkbox, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoriesAPI, UserAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import { setUserSubscriptions } from '../../../state/slices/authSlice';

function DashboardCategories() {
  const [selectionMap, setSelectionMap] = useState({});
  const [categoryApiCall, categoryStatus, categoryError, categoryResponse] =
    useAsync(CategoriesAPI.getCategories);
  const [
    updateSubScriptionsApiCall,
    updateStatus,
    updateError,
    updateResponse,
  ] = useAsync(UserAPI.subscribe);
  const { user, userLoggedIn } = useSelector((state) => state.auth);
  const showNotification = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    categoryApiCall();
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
    const subscriptions = Object.keys(selectionMap);
    updateSubScriptionsApiCall({ subscriptions });
  };

  useEffect(() => {
    const newMap = user.subscriptions.reduce((acc, sub) => {
      acc[sub] = sub;

      return acc;
    }, {});

    setSelectionMap(newMap);
  }, [user, user.subscriptions]);

  useEffect(() => {
    if (!updateError && updateResponse) {
      const subscriptions = Object.keys(selectionMap);
      dispatch(
        setUserSubscriptions({
          ...user,
          subscriptions,
        })
      );
      showNotification({
        severity: 'success',
        message: 'Subscriptions saved successfully.',
      });
    }
  }, [updateError, updateResponse]);

  useEffect(() => {
    if (updateError) {
      showNotification({
        severity: 'error',
        message:
          updateError.message ||
          'Something went wrong saving your subscriptions. Please try again later',
      });
    }
  }, [updateError]);

  if (categoryStatus === 'pending' || categoryError) {
    return null;
  }

  if (!categoryResponse) {
    return <div>Loading ...</div>;
  }

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
          <Button
            onClick={handleSubscribe}
            variant="contained"
            disabled={!userLoggedIn}
          >
            Update subscribe
          </Button>
        </Box>
      </div>
    </Paper>
  );
}

export default DashboardCategories;
