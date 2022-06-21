import { Alert, Box, Grid, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { unSetNotification } from '../../state/slices/notificationSlice';
import CloseIcon from '@mui/icons-material/Close';
IconButton;
let timeouts = {};

const SEVERITY_COLOR_MAP = {
  success: 'green',
  info: 'info.main',
  error: 'red',
  warn: 'orange',
};

function Notification() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleNotificationTimeOut = (notification) => {
    if (!timeouts[notification.id]) {
      timeouts[notification.id] = setTimeout(() => {
        dispatch(unSetNotification(notification));
        delete timeouts[notification.id];
      }, 3000);
    }
  };

  const closeNotification = (notification) => {
    delete timeouts[notification.id];
    dispatch(unSetNotification(notification));
  };

  return (
    <Grid
      container
      sx={{
        zIndex: 10,
        position: 'fixed',
        top: '100px',
      }}
    >
      <Grid item xs={12} md={7} mx="auto">
        {notifications.map((notification) => {
          handleNotificationTimeOut(notification);
          return (
            <Alert
              key={notification.id}
              severity={notification.severity}
              sx={{ my: '0.5rem', position: 'relative' }}
            >
              {notification.message}
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '0',
                  color: SEVERITY_COLOR_MAP[notification.severity],
                  top: 5,
                }}
                onClick={() => closeNotification(notification)}
              >
                <CloseIcon />
              </IconButton>
            </Alert>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Notification;
