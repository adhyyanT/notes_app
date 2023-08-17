// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useState } from 'react';

// import { login } from '../api/userServices';
// import { useNavigate } from 'react-router';
// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

import React, { useState } from 'react';
import LoginPage from '../Pages/LoginPage';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { login } from '../api/userServices';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [progress, setProgress] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    // console.log(email + ' ' + password);
    if (!email.includes('@') || !email.includes('.') || email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    if (password.length === 0) {
      setIsValidPassword(false);
      return;
    }
    setIsValidEmail(true);
    setIsValidPassword(true);
    setProgress(true);
    const res = await login(email, password);
    if (res) navigate('/notes');
    else {
      setProgress(false);
      setIsValidEmail(false);
      setIsValidPassword(false);
    }
  };

  return (
    <LoginPage>
      <Box
        sx={{
          justifyContent: 'center',
          marginX: '10vw',
          marginY: '10vh',
        }}
      >
        <Typography
          component={Container}
          sx={{
            fontWeight: 'bold',
            fontSize: 25,
            fontFamily: 'Segoe UI Symbol',
          }}
        >
          Login to your Account
        </Typography>
        <Grid
          container
          sx={{
            width: 'inherit',
            paddingLeft: '4vw',
            marginTop: '12vh',
            display: 'flex',
          }}
          id='main'
        >
          <Grid
            item
            sx={{
              width: '100vw',
              paddingTop: '2vh',
            }}
          >
            <FormControl fullWidth variant='standard'>
              <InputLabel error={!isValidEmail}>Email</InputLabel>
              <Input
                type='email'
                onChange={handleEmailChange}
                error={!isValidEmail}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              width: '100vw',
              paddingTop: '2vh',
            }}
          >
            <FormControl fullWidth variant='standard'>
              <InputLabel error={!isValidPassword}>Password</InputLabel>
              <Input
                type='password'
                onChange={handleChangePassword}
                error={!isValidPassword}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              width: '100vw',
              paddingTop: '5vh',
            }}
          >
            <Button
              fullWidth
              variant='contained'
              disableElevation
              sx={{
                backgroundColor: '#6fc5c9',
              }}
              onClick={handleLogin}
              disabled={progress}
            >
              Login
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              width: '100vw',
              paddingTop: '2vh',
            }}
          >
            <Typography
              sx={{
                color: 'text.disabled',
              }}
            >
              {' '}
              New user?{' '}
              <Link underline='none' href='/signup'>
                Register.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </LoginPage>
  );
};

export default Login;

// export default function Login() {
//   const [error, setError] = useState({ error: false, msg: '' });
//   const [progress, setProgress] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     setProgress(true);
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get('email');
//     const password = data.get('password');
//     if (!email) {
//       setError({ error: true, msg: '*Email is required' });
//       setProgress(false);
//       return;
//     }
//     if (!password) {
//       setError({ error: true, msg: '*Password is required' });
//       setProgress(false);
//       return;
//     }
//     setError({ error: false, msg: '' });
//     const user = await login(email, password);
//     if (user) {
//       setProgress(false);
//       navigate('/notes');
//     } else {
//       setError({ error: true, msg: '*Invalid Credentials' });
//     }
//     setProgress(false);
//   };

//   return (
//     <Container>
//       <ThemeProvider theme={defaultTheme}>
//         <Container component='main' maxWidth='xs'>
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography style={{ color: '#c2bbba' }}>
//               *Third party cookies should be enabled{' '}
//             </Typography>
//             <Typography component='h1' variant='h5'>
//               Sign in
//             </Typography>
//             <Box
//               component='form'
//               onSubmit={handleSubmit}
//               noValidate
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin='normal'
//                 required
//                 fullWidth
//                 id='email'
//                 label='Email Address'
//                 name='email'
//                 autoComplete='email'
//                 autoFocus
//               />
//               <TextField
//                 margin='normal'
//                 required
//                 fullWidth
//                 name='password'
//                 label='Password'
//                 type='password'
//                 id='password'
//                 autoComplete='current-password'
//               />
//               {/* <FormControlLabel
//                 control={<Checkbox value='remember' color='primary' />}
//                 label='Remember me'
//               /> */}
//               {error && (
//                 <Grid container style={{ justifyContent: 'center' }}>
//                   <Typography
//                     component='h4'
//                     variant='h6'
//                     color={'red'}
//                     style={{ justifyContent: 'center' }}
//                   >
//                     {error.msg}
//                   </Typography>
//                 </Grid>
//               )}
//               <Button
//                 type='submit'
//                 fullWidth
//                 variant='contained'
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={progress}
//               >
//                 Sign In
//               </Button>

//               <Grid container style={{ justifyContent: 'center' }}>
//                 <Grid item>
//                   <Link
//                     href='/signup'
//                     variant='body2'
//                     // onClick={() => navigate('/signup')}
//                   >
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </Container>
//   );
// }
