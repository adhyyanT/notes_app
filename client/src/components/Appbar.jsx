import React from 'react';
import { AppBar } from '@mui/material';
import Typography from '@mui/material/Typography';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';

const Appbar = () => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant='h6' color='inherit' noWrap>
          Notes
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
