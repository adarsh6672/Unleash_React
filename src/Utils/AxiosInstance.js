import axios from 'axios'

export const AxiosInstance=axios.create({
    baseURL:'http://localhost:8080/api/',
    'Content-type':'application/json',
})


// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
    // Dynamically set the Authorization header for each request
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Function to refresh the access token
async function refreshAccessToken() {
    // Assuming you have a refresh token stored in localStorage
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken,"----------refresh---------")
    if (!refreshToken) {
        throw new Error('Refresh token not found');
    }

    try {
        // Make a request to the token refresh endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken
            
        });

        // Extract the new access token from the response
        const newAccessToken = response.data.access;

        // Optionally, store the new access token and refresh token in localStorage
        localStorage.setItem('token', newAccessToken);
        // localStorage.setItem('refreshToken', response.data.refresh);

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}


AxiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error.response && error.response.status === 401) {
        // Access token has expired, refresh it
        try {
            const newAccessToken = await refreshAccessToken();
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return AxiosInstance(error.config);
        } catch (refreshError) {
            throw refreshError;
        }
    }
    return Promise.reject(error);
});