import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

/**
 * Retorna cabeçalhos de identificação de usuário para o cart-service.
 * @returns {{'x-user-id': string}}
 */
const getUserHeaders = () => {
  const token = localStorage.getItem('ecrf_token');

  if (!token) {
    return { 'x-user-id': 'guest' };
  }

  try {
    const payload = JSON.parse(atob(token));
    return { 'x-user-id': String(payload.userId || 'guest') };
  } catch (error) {
    return { 'x-user-id': 'guest' };
  }
};

// Produtos
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getRecommendationsForProduct = (id, options = {}) =>
  api.get(`/recommendations/${id}`, { params: options });

// Auth
export const loginRequest = (payload) => api.post('/auth/login', payload);
export const registerRequest = (payload) => api.post('/auth/register', payload);
export const meRequest = (token) =>
  api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });

// Carrinho
export const getCart = () => api.get('/cart', { headers: getUserHeaders() });
export const addCartItem = (product) => api.post('/cart/items', { product }, { headers: getUserHeaders() });
export const updateCartItem = (productId, operation) =>
  api.patch(`/cart/items/${productId}`, { operation }, { headers: getUserHeaders() });
export const removeCartItem = (productId) =>
  api.delete(`/cart/items/${productId}`, { headers: getUserHeaders() });
export const clearCartRequest = () => api.delete('/cart/clear', { headers: getUserHeaders() });
export const checkoutRequest = () => api.post('/cart/checkout', {}, { headers: getUserHeaders() });

// Status
export const getServicesStatus = () => api.get('/status');

export default api;