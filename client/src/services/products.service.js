import axios from 'axios'
import { API_URL } from '../constants';

const getMostPopular = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get-popular-products`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return { error: true }
  }
};

export {
  getMostPopular,
};
