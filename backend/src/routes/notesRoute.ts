import express from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController';

const router = express.Router();

router.route('/').get(getAllNotes);
router.route('/').post(createNote);
router.route('/:noteId').get(getNoteById);
router.route('/:noteId').patch(updateNote);
router.route('/:noteId').delete(deleteNote);
export default router;
