import axios from 'axios';

export const signInApi = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/token', {
      username,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const signUpApi = async (fullName: string, email:string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      fullName,
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};