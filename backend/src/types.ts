export interface RegisterReq {
  username: string;
  email: string;
  password: string;
}
export interface LoginReq {
  email: string;
  password: string;
}
export interface CreateNoteReq {
  title: string;
  text: string;
}
export interface GetNoteParam {
  noteId: string;
}
