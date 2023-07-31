import axios from 'axios';

const login = async (email, password) => {
  try {
    // console.log(process.env);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'users/login',

      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    };
    const res = await axios.request(config);
    if (res.data.sigin) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const signup = async (username, email, password) => {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_backend + 'users/register',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username,
        email,
        password,
      },
    };
    const res = await axios.request(config);
    return 'Success';
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const logout = async () => {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      withCredentials: true,
      url: import.meta.env.VITE_backend + 'users/logout',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.request(config);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export { login, signup, logout };
