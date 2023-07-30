import express from 'express';
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../controllers/note';

const router = express.Router();
router.get('/', getNotes);
router.get('/:noteId', getNoteById);
router.post('/', createNote);
router.patch('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);
export default router;
