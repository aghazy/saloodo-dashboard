import React, { useState } from "react";
import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';

import { ReactComponent as Logo } from './assets/logo.svg';

const styles = {
  root: {
    backgroundImage: 'url("https://www.saloodo.com/wp-content/uploads/2020/03/test_last_row.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  header: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '20px',
  },
  paper: {
      padding: '30px',
      borderRadius: '40px',
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      maxWidth: '700px',
      alignItems: 'center',
  },
  input: {
      width: '80%',
      marginBottom: '20px',
      '.MuiInputBase-root': {
        borderRadius: '40px',
      }
  },
  button: {
      backgroundColor: '#e0a867 !important',
      borderRadius: '70px',
      fontWeight: 600,
      marginBottom: '10px',
      fontSize: '16px',
      padding: '6px 30px',
      width: '50%',
      maxWidth: '700px',
  },
}

const Login = ({ login, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Grid sx={styles.root}>
      <Logo style={{ width: '80%', maxWidth: '700px', marginBottom: '50px' }} className="Logo" />
      <Paper sx={styles.paper}>
        <Typography sx={styles.header}>Login</Typography>
        <TextField sx={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" type="email" />
        <TextField sx={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type="password" />
        {loading ? <CircularProgress sx={{ color: '#e0a867' }} /> : <Button sx={styles.button} disabled={!email || !password} variant="contained" onClick={() => login(email, password)}>
          Login
        </Button>}
      </Paper>
    </Grid>
  );
}

export default Login;
