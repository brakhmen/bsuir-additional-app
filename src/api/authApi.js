import axios from 'axios';

import { API_URL } from './baseApi'
export const authApi = {
    auth: async (username, password ) =>{
        const response = await axios.post(`${API_URL}/auth`, { username, password});
        if (response.status === 200){
            const token =  response.data.token;

            axios.defaults.headers.common.Authorization = token;
            localStorage.setItem('authToken', token);
        }
    }
}
export const initAuthorization = () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
};
initAuthorization();
