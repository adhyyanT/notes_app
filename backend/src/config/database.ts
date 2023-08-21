import { Pool, Client, PoolClient } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

let pool: Pool;
export const createPool = async () => {
  try {
    pool = new Pool({
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      user: process.env.PGUSER,
      port: parseInt(process.env.PGPORT!),
      ssl: true,
    });
    console.log(`created pool for database => ${process.env.PGDATABASE}`);
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async () => {
  try {
    const res = await pool.query(
      `SELECT *
            FROM users`
    );
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const res = await pool.query(
      `SELECT *
            FROM users 
            WHERE email = $1`,
      [email]
    );
    return res.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const findUserById = async (id: string) => {
  try {
    const res = await pool.query(
      `SELECT * 
            FROM users 
            WHERE id = $1`,
      [id]
    );
    return res.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await pool.query(
      `INSERT INTO users
            (id,username,email,password)
            VALUES
            ($1,$2,$3,$4)
            `,
      [uuidv4(), username, email, await bcrypt.hash(password, 10)]
    );
    // console.log(res);
    return await findUserByEmail(email);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNotes = async (id: string) => {
  try {
    const res = await pool.query(
      `SELECT *
            FROM notes
            WHERE createdby = $1
            `,
      [id]
    );
    // console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getNote = async (notes_id: string) => {
  try {
    const res = await pool.query(
      `SELECT * 
            from notes
            where notes_id = $1`,
      [notes_id]
    );
    return res.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export async function addNote(title: string, text: string, userId: string) {
  try {
    const noteId = uuidv4();
    const res = await pool.query(
      `INSERT INTO notes
                  (notes_id,title,text,createdby)
                  VALUES
                  ($1,$2,$3,$4)
                  `,
      [noteId, title, text, userId]
    );
    return await getNote(noteId);
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const updateNoteById = async (
  id: string,
  title: string,
  text: string
) => {
  try {
    const res = await pool.query(
      `UPDATE notes 
            SET title = $1, text = $2
            WHERE notes_id = $3
            `,
      [title, text, id]
    );
    // console.log(res);
    return await getNote(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteById = async (id: string) => {
  try {
    const res = pool.query(
      `DELETE FROM notes
            where notes_id = $1
            `,
      [id]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
