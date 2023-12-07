import React from "react";
import { navigate } from '@reach/router';
import { Button, Grid } from '@mui/material';

import { ReactComponent as Logo } from './assets/logo.svg';

const styles = {
  root: {
    backgroundImage: 'url("https://www.saloodo.com/wp-content/uploads/2020/03/test_last_row.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    padding: '20px',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#e0a867 !important',
    borderRadius: '70px',
    fontWeight: 600,
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: '24px',
    padding: '12px 40px',
  }
};

const Landing = () => {
  return (
    <Grid sx={styles.root}>
      <Logo style={{ width: '80%', maxWidth: '700px', marginBottom: '50px' }} className="Logo" />
      <Grid sx={{ display: 'flex' }}>
        <Button sx={styles.button} variant="contained" onClick={() => navigate('/login')}>
          Send Parcel
        </Button>
        <Button sx={styles.button} variant="contained" onClick={() => navigate('/login')}>
          Bikers' login
        </Button>
      </Grid>
    </Grid>
  );
}

export default Landing;
