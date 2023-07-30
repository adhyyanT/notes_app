import { Request, RequestHandler } from 'express';

export interface CreateNoteReq {
  title?: string;
  text?: string;
}

export interface UpdateNoteReq {
  title?: string;
  text?: string;
}
export interface UpdateNoteUrlParams {
  noteId: string;
}
