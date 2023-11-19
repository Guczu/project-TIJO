import axios from 'axios'
import { API_URL } from '../constants';

const isCodeValid = async (discountCode) => {
  try {
    const response = await axios.get(`${API_URL}/api/discount-code`, { params: {code: discountCode} });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return { error: true }
  }
};

export {
  isCodeValid,
};
