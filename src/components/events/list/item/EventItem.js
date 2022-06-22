import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CheckIcon from '@mui/icons-material/Check';
import { TypographyComponent } from '../../../common';

function EventItem({ events, title }) {
  return (
    <>
      <Grid item xs={12} mx="1rem">
        <TypographyComponent type="header">{title}</TypographyComponent>
      </Grid>
      {events && events.length > 0 ? (
        events.map((event) => (
          <Grid key={event._id} item xs={6} lg={6}>
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
                <TypographyComponent sx={{ color: 'primary.main' }}>
                  {event.date}
                </TypographyComponent>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '4',
                  paddingInline: '1rem',
                }}
              >
                <TypographyComponent
                  type="title"
                  sx={{ color: 'primary.main', my: '1rem' }}
                >
                  {event.title}
                </TypographyComponent>
                <TypographyComponent
                  sx={{ marginBlockStart: '0.5rem', color: 'grey.500' }}
                >
                  {event.description}
                </TypographyComponent>
                {event.address && (
                  <Box display="flex" mt="1rem">
                    <AddLocationIcon
                      sx={{ color: 'grey.400', mt: '0.5rem', mr: '0.4rem' }}
                    />
                    <TypographyComponent
                      sx={{ marginBlockStart: '0.3rem', color: 'primary.300' }}
                    >
                      {event.address}
                    </TypographyComponent>
                  </Box>
                )}
                {event.isVirtual && (
                  <Box display="flex">
                    <TypographyComponent
                      sx={{ marginBlockStart: '0.5rem', color: 'primary.300' }}
                    >
                      Virtual:
                      <CheckIcon sx={{ color: 'success.main' }} />
                    </TypographyComponent>
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
                  <TypographyComponent
                    sx={{
                      marginBlockStart: '0.5rem',
                      color: 'primary.300',
                      display: 'flex',
                    }}
                  >
                    {event?.category ? event.category?.name : ''}
                  </TypographyComponent>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: '0.8rem',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '0.8rem', width: '6rem' }}
                  >
                    Attend
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))
      ) : (
        <Box mx="2rem" mb="2rem">
          <TypographyComponent color="red">
            This list is empty
          </TypographyComponent>
        </Box>
      )}
    </>
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
