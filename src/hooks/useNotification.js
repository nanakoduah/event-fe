import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../state/slices/notificationSlice';

function useNotification() {
  const dispatch = useDispatch();

  const showNotification = (notification) => {
    dispatch(setNotification(notification));
  };

  return showNotification;
}

export default useNotification;
