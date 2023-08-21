import { RequestHandler } from 'express';
import {
  addNote,
  deleteById,
  getNote,
  getNotes,
  updateNoteById,
} from '../config/database';
import createHttpError from 'http-errors';
import { CreateNoteReq, GetNoteParam } from '../types';

export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const userId: string = req.session.user!;
    const rows = await getNotes(userId);
    if (rows === null) return next(createHttpError(500, 'Server error'));

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
export const getNoteById: RequestHandler<
  GetNoteParam,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;

    const note = await getNote(noteId);
    if (!note) return next(createHttpError(404, 'Note not found'));
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteReq,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    if (!title) return next(createHttpError(400, 'Title cannot be empty'));
    const note = await addNote(title, text, req.session.user!);
    return res.status(201).json(note);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const updateNote: RequestHandler<
  GetNoteParam,
  unknown,
  CreateNoteReq,
  unknown
> = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const { title, text } = req.body;
    if (!title) return next(createHttpError(400, 'Title cannot be empty'));
    const note = await getNote(noteId);
    if (!note) return next(createHttpError(404, 'Note not found'));
    const newNote = await updateNoteById(noteId, title, text);
    return res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteNote: RequestHandler<GetNoteParam> = async (
  req,
  res,
  next
) => {
  try {
    const noteId = req.params.noteId;
    console.log(noteId);
    const note = await getNote(noteId);
    if (!note) return next(createHttpError(404, 'Note not found'));
    const success = await deleteById(noteId);
    if (success) return res.sendStatus(204);
    else return res.sendStatus(400);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
