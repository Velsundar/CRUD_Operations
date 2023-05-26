import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchCustomerDetails = () => API.get('/');
export const postNewCustomerDetail = (data) => API.post('/', data);
export const updateCustomerDetail = (id, data) => API.patch(`/${id}`, data);
export const deleteCustomerDetail = (id) => API.delete(`/${id}`);
