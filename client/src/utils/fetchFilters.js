import axios from 'axios'
import { API_URL } from '../constants/index'

async function fetchFilters() {

  try {
    const response = await axios.get(`${API_URL}/api/products/available-filters`);
    const { available_shops, available_categories } = response.data;

    return {
      availableShops: available_shops,
      availableCategories: available_categories,
    };
  } catch (error) {
    console.error('Błąd podczas pobierania filtrów:', error);
    throw error;
  }
}

export default fetchFilters;
