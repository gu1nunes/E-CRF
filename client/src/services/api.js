import axios from 'axios';

// Instância do Axios configurada com a URL base da nossa API.
// Outro ponto de reuso: se a API mudar, só alteramos este arquivo.
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Funções de serviço que encapsulam a lógica de chamada
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getRecommendationsForProduct = (id) => api.get(`/products/${id}/recommendations`);

export default api;