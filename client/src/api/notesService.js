import axios from 'axios';

export const getAllNotes = async () => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'notes',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.request(config);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createNote = async (title, text) => {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'notes',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        title,
        text,
      },
    };

    const res = await axios.request(config);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};
export const deleteNote = async (id) => {
  try {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'notes/' + id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.request(config);
    // console.log(res.data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, err: error.response.data };
  }
};
export const updateNote = async (id, title, text) => {
  try {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'notes/' + id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        title,
        text,
      },
    };

    const res = await axios.request(config);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return { success: false, err: error.response.data };
  }
};
