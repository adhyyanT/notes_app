import { Box, Grid } from '@mui/material';
import React from 'react';
import vector from '../assets/og.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const getDim = () => {
  return { w: window.innerWidth, h: window.innerHeight };
};
const LoginPage = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#8ce1e6',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            height: 'inherit',
          }}
        >
          <ImageList sx={{ width: 'inherit', height: 'inherit' }} cols={1}>
            <ImageListItem>
              <img src={vector} alt='vector' loading='lazy' />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            backgroundColor: '#f7f5f5',
            borderTopLeftRadius: '45px',
            borderBottomLeftRadius: '45px',
            boxShadow: 2,
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
