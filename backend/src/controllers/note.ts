import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import noteModel from '../models/note';
import { CreateNoteReq, UpdateNoteReq, UpdateNoteUrlParams } from '../types';

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await noteModel.find({ createdBy: req.session.user });
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const user = req.session.user;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note Id');
    }
    const note = await noteModel.findById({ _id: noteId, createdBy: user });
    if (!note) throw createHttpError(404, 'Note not found');
    res.status(200).json(note);
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
  const title = req.body.title;
  const text = req.body.text;
  const username = req.session.user;

  try {
    if (!title) throw createHttpError(400, 'Title cannot be empty');

    const newNote = await noteModel.create({
      title,
      text,
      createdBy: username,
    });
    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  UpdateNoteUrlParams,
  unknown,
  UpdateNoteReq,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const user = req.session.user;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note Id');
    }
    if (!newTitle) throw createHttpError(400, 'Title cannot be empty');
    const oldNote = await noteModel.findById({ _id: noteId, createdBy: user });

    if (!oldNote) throw createHttpError(404, 'Note not found');
    oldNote.title = newTitle;
    oldNote.text = newText;
    const newNote = await oldNote.save();
    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const user = req.session.user;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note Id');
    }

    const note = await noteModel.findById({ _id: noteId, createdBy: user });

    if (!note) throw createHttpError(404, 'Note not found');

    await noteModel.findByIdAndDelete(noteId);

    res.sendStatus(204);
  } catch (error) {}
};
