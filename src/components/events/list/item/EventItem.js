import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function EventItem({ event }) {
  return (
    <Grid item xs={6} lg={6}>
      <Paper
        sx={{
          display: 'flex',
          border: 1,
          borderColor: 'grey.300',
          margin: '1rem',
          minHeight: '15rem',
          position: 'relative',
          borderBottom: 3,
          borderBottomColor: 'primary.main',
          paddingBlock: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            height: '8rem',
            borderRight: 3,
            borderColor: 'grey.200',
            padding: '2rem',
            maxWidth: '10rem',
            wordBreak: 'break-all',
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{ color: 'primary.main' }}
          >
            {event.date}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '4',
            paddingInline: '1rem',
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{ color: 'primary.main', my: '1rem' }}
          >
            {event.title}
          </Typography>
          <Typography sx={{ marginBlockStart: '0.5rem', color: 'grey.500' }}>
            {event.description}
          </Typography>
          {event.address && (
            <Box display="flex" mt="1rem">
              <AddLocationIcon
                sx={{ color: 'grey.400', mt: '0.5rem', mr: '0.4rem' }}
              />
              <Typography
                sx={{ marginBlockStart: '0.3rem', color: 'primary.300' }}
              >
                {event.address}
              </Typography>
            </Box>
          )}
          {event.isVirtual && (
            <Box display="flex">
              <Typography
                sx={{ marginBlockStart: '0.5rem', color: 'primary.300' }}
              >
                Virtual:
                <CheckIcon sx={{ color: 'success.main' }} />
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              my: '0.8rem',
            }}
          >
            <Typography
              sx={{
                marginBlockStart: '0.5rem',
                color: 'primary.300',
                display: 'flex',
              }}
            >
              {event.category} AL
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', mt: '0.8rem', justifyContent: 'flex-end' }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: '0.8rem', width: '6rem' }}
            >
              RSVP
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

EventItem.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string,
    describe: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default EventItem;
