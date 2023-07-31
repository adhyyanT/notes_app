import Typography from '@mui/material/Typography';
import React from 'react';

const Hero = () => {
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        Your Notes
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        Go ahead and dive into your ocean of memory and Save them so they can
        stay with you for ever.
      </Typography>
    </>
  );
};

export default Hero;
