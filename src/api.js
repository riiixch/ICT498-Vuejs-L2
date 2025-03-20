import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/vuejs-2',
});

export default api;