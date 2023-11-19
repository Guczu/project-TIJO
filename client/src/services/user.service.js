import axios from 'axios'
import { API_URL } from '../constants';


const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/create`, userData);

    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    return { error: true }
  }
};

const loginUser = async (name, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/auth`, {
      name,
      password,
    });

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('userId', response.data.userId);
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

const logoutUser = async () => {
  try {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const response = await axios.post(`${API_URL}/api/user/logout`, { userId: userId });

      if (response.status === 200) {
        localStorage.removeItem('userId');
      }
      
    } else {
      console.error('Błąd wylogowania - brak userId');
    }
  
  } catch (error) {
    console.error('Błąd wylogowania');
  }
}

const isAuthenticated = async () => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    try {
      const token = await axios.get(`${API_URL}/api/user/token`, { params: {userId: userId} });
  
      const response = await axios.post(`${API_URL}/api/user/isauth`, {}, {
        headers: {
          'authorization': `Bearer ${token.data.value}`
      }
      });
      
      return response.data;
  
    } catch (error) {
        await logoutUser();
        return false;
    }
  } else {
    await logoutUser();
    return false;
  }
}

const getEmail = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`${API_URL}/api/user/get-user`, { params: {userId: userId} });

    if (response.status === 200) {
      return response.data.email;
    }
  } catch (error) {
    console.error('Błąd pobrania email')
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getEmail,
};
