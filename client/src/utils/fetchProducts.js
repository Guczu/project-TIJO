import axios from 'axios';
import { API_URL } from '../constants/index'

async function fetchProducts(filters, pagination) {

  try {
    const response = await axios.get(`${API_URL}/api/products/get`, { params: {...filters, ...pagination} });

    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania produktów:', error);
    throw error;
  }
}

export default fetchProducts;
