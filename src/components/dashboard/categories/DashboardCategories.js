import { Box, Checkbox, Paper, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoriesAPI, UserAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import { setUserSubscriptions } from '../../../state/slices/authSlice';
import { TypographyComponent } from '../../common';

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
  }, [user.subscriptions]);

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
          updateError ||
          'Something went wrong saving your subscriptions. Please try again later',
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (categoryError) {
      showNotification({
        severity: 'error',
        message:
          categoryError ||
          'Something went wrong saving your subscriptions. Please try again later',
      });
    }
  }, [categoryError]);

  if (!categoryResponse) {
    return <div>Loading ...</div>;
  }

  return (
    <Paper sx={{ border: 1, borderColor: 'grey.300', padding: '0.3rem' }}>
      <TypographyComponent type="header" sx={{ p: '1rem' }}>
        Categories
      </TypographyComponent>
      <TypographyComponent sx={{ color: 'grey.400', px: '1rem', mb: '1rem' }}>
        Select categories of interest and save for faster loads
      </TypographyComponent>
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
            Save
          </Button>
        </Box>
      </div>
    </Paper>
  );
}

export default DashboardCategories;
