import React from 'react';
import { AppBar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userServices';

const Appbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res) navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position='relative'>
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant='h6' color='inherit'>
          Notes
        </Typography>
        <Grid container justifyContent={'right'}>
          <Grid item>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
