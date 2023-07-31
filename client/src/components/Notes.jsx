import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { green, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '../api/notesService';
import Appbar from './Appbar';
import Hero from './Hero';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function Notes() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState('Create');
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [updateNoteId, setUpdateNoteId] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleOpen = (state, id) => {
    try {
      setModalState(state);
      if (state === 'Create') {
        setTitle('');
        setText('');
      }
      if (state === 'Update') {
        setUpdateNoteId(id);
      }
      if (state !== 'Create') {
        for (let i = 0; i < cards.length; i++) {
          if (cards[i]._id === id) {
            setTitle(cards[i].title);
            setText(cards[i].text);
            break;
          }
        }
      }
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setOpen(false);
  const handleCreateNote = async () => {
    if (!title) {
      setErr(true);
      setErrMsg('Title cannot be empty');
      return;
    }
    setErr(false);
    try {
      const res = await createNote(title, text);
      setCards([...cards, res]);
    } catch (error) {
      if (error.message === 'not auth') navigate('/');
    } finally {
      setOpen(false);
    }
  };
  const handleUpdateNote = async () => {
    if (!title) {
      setErr(true);
      setErrMsg('Title cannot be empty');
      return;
    }
    setErr(false);
    try {
      const res = await updateNote(updateNoteId, title, text);
      setTitle(res.title);
      setText(res.text);
      let arr = cards;
      arr.map((card) => {
        if (card._id == updateNoteId) {
          (card.title = res.title), (card.text = res.text);
        }
      });
      setCards(arr);
      setOpen(false);
    } catch (error) {
      if (error.message === 'not auth') {
        navigate('/');
      }
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleDeleteCard = async (e, id) => {
    try {
      const res = await deleteNote(id);
      if (res.success === true) {
        setCards(
          cards.filter((card) => {
            return card._id !== id;
          })
        );
      }
      // console.log(cards);
    } catch (error) {
      if (error.message === 'not auth') {
        navigate('/');
      }
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllNotes();
        setCards(res);
      } catch (error) {
        if (error.message === 'not auth') {
          navigate('/');
        }
        console.error(error);
      }
    })();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Appbar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Hero />

            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button variant='contained' onClick={() => handleOpen('Create')}>
                Create Memories
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={Modalstyle}>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                  >
                    {`${modalState}`} Note
                  </Typography>
                  <FormControl
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    variant='filled'
                  >
                    <InputLabel htmlFor='filled-adornment-amount'>
                      Title
                    </InputLabel>
                    <FilledInput
                      id='filled-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>*</InputAdornment>
                      }
                      defaultValue={title}
                      onChange={handleTitleChange}
                      disabled={modalState === 'View'}
                    />
                  </FormControl>
                  <TextField
                    id='outlined-multiline-static'
                    label='Multiline'
                    multiline
                    rows={6}
                    defaultValue={text}
                    fullWidth
                    onChange={handleTextChange}
                    disabled={modalState === 'View'}
                  />
                  {err && (
                    <Grid container style={{ justifyContent: 'center' }}>
                      <Typography
                        component='h4'
                        variant='h6'
                        color={'red'}
                        style={{ justifyContent: 'center' }}
                      >
                        {errMsg}
                      </Typography>
                    </Grid>
                  )}
                  <Button
                    variant='contained'
                    sx={{
                      marginTop: 1,
                      display: modalState === 'View' ? 'none' : 'block',
                    }}
                    onClick={
                      modalState === 'Create'
                        ? handleCreateNote
                        : handleUpdateNote
                    }
                  >
                    {`${modalState}`} Note
                  </Button>
                </Box>
              </Modal>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='div'
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image='https://source.unsplash.com/random?wallpapers'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.title}
                    </Typography>
                    <Typography>{card.text}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      onClick={() => handleOpen('View', card._id)}
                    >
                      View
                    </Button>
                    <Button
                      size='small'
                      onClick={() => handleOpen('Update', card._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size='small'
                      onClick={(e) => handleDeleteCard(e, card._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: '#f7e6e8', p: 6 }} component='footer'>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          Made with ❤️, by Adhyyan.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
