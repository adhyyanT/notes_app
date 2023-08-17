// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from 'react-router';
// import { useState } from 'react';
// import { signup } from '../api/userServices';
// // TODO remove, this demo shouldn't need to reset the theme.
import React, { useState } from 'react';
import LoginPage from '../Pages/LoginPage';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/userServices';

const Signup = () => {
  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    if (!email.includes('@') || !email.includes('.') || email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    if (password.length === 0) {
      setIsValidPassword(false);
      return;
    }
    if (username.length === 0) {
      setIsValidUsername(false);
      return;
    }
    setIsValidEmail(true);
    setIsValidPassword(true);
    setProgress(true);
    setIsValidUsername(true);
    const res = await signup(username, email, password);
    if (res.msg) navigate('/');
    else {
      if (res.err.includes('email')) {
        setIsValidEmail(false);
      } else if (res.err.includes('Username')) {
        setIsValidUsername(false);
      }
      // setIsValidPassword(false);
      setProgress(false);
      // setIsValidUsername(false);
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
          Create Account
        </Typography>
        <Grid
          container
          sx={{
            width: 'inherit',
            paddingLeft: '4vw',
            marginTop: '12vh',
            display: 'flex',

            // alignItems: 'center',
            // alignContent: 'center',
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
              <InputLabel error={!isValidUsername}>Username</InputLabel>
              <Input
                type='text'
                error={!isValidUsername}
                onChange={handleUsername}
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
              <InputLabel error={!isValidEmail}>Email</InputLabel>
              <Input
                type='email'
                error={!isValidEmail}
                onChange={handleEmailChange}
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
                error={!isValidPassword}
                onChange={handleChangePassword}
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
              onClick={handleRegister}
              disabled={progress}
            >
              Register
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
              Already a User?
              <Link underline='none' href='/'>
                Login.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </LoginPage>
  );
};

export default Signup;

// const defaultTheme = createTheme();

// export default function Signup() {
//   const [error, setError] = useState({ error: false, msg: '' });
//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get('email');
//     const username = data.get('username');
//     const password = data.get('password');
//     if (!email) {
//       setError({
//         error: true,
//         msg: '*Email is required',
//       });
//       return;
//     }
//     if (!password) {
//       setError({
//         error: true,
//         msg: '*password is required',
//       });
//       return;
//     }
//     if (!username) {
//       setError({
//         error: true,
//         msg: '*User name is required',
//       });
//       return;
//     }
//     setError({
//       error: false,
//       msg: '',
//     });
//     const res = await signup(username, email, password);
//     if (res === 'Success') {
//       navigate('/');
//     } else {
//       setError({
//         error: true,
//         msg: res,
//       });
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component='main' maxWidth='xs'>
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component='h1' variant='h5'>
//             Sign up
//           </Typography>
//           <Box
//             component='form'
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   autoComplete='given-name'
//                   name='username'
//                   required
//                   fullWidth
//                   id='username'
//                   label='User Name'
//                   autoFocus
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id='email'
//                   label='Email Address'
//                   name='email'
//                   autoComplete='email'
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name='password'
//                   label='Password'
//                   type='password'
//                   id='password'
//                   autoComplete='new-password'
//                 />
//               </Grid>
//             </Grid>
//             {error && (
//               <Grid container style={{ justifyContent: 'center' }}>
//                 <Typography
//                   component='h4'
//                   variant='h6'
//                   color={'red'}
//                   style={{ justifyContent: 'center' }}
//                 >
//                   {error.msg}
//                 </Typography>
//               </Grid>
//             )}
//             <Button
//               type='submit'
//               fullWidth
//               variant='contained'
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent='flex-end'>
//               <Grid item>
//                 <Link href='/' variant='body2'>
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
