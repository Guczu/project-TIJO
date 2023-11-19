import axios from 'axios'
import { API_URL } from '../constants';

const addEmailToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/newsletter/add`, { email: email });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return { error: true }
  }
};

export {
  addEmailToNewsletter,
};
