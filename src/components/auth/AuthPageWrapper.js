import { Grid, Box, Container, Typography } from '@mui/material';

function AuthPageWrapper({ title, genericMessage, children }) {
  return (
    <Container
      sx={{
        height: '100vh',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          maxWidth: '1200px',
        }}
        spacing={2}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
            flexDirection: 'column',
          }}
          sm={12}
          md={6}
        >
          <Box
            sx={{
              position: 'relative',
              top: '-2.5rem',
              left: '0.5rem',
              mx: 'auto',
            }}
            component="h3"
            color="#bbb"
          >
            Choose smart
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            paddingBlockEnd: '5rem',
          }}
          borderLeft={{ xs: 'none', md: 'solid 1px #ccc' }}
          sm={12}
          md={6}
        >
          <Box
            sx={{
              maxWidth: '400px',
              mx: 'auto',
            }}
          >
            <Box width="100%">{genericMessage}</Box>
            <Typography
              component="h2"
              variant="h5"
              sx={{
                colo: 'grey.700',
                width: '100%',
              }}
            >
              {title}
            </Typography>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuthPageWrapper;