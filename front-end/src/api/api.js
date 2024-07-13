import axios from 'axios';
// config

axios.interceptors.request.use(
    function (config) {
        config.withCredentials = true;
        config.baseURL = import.meta.env.VITE_API_URL;

        return config
    },
    function (error) { }
);

// error handling

// GET /reports
export async function getReports() {
    return await axios.get('reports')
}

// POST /reports/create
export async function createReport(data) {
    return await axios.post('reports/create', data);
}

// PUT /reports/:id
export async function editReport(id, data) {
    return await axios.put(`reports/${id}`, data);
}

// DELETE /reports/:id
export async function deleteReport(id) {
    return await axios.delete(`reports/${id}`);
}

// GET /reports/my-reports
export async function getMyReports() {
    return await axios.get('reports/my-reports');
}

// POST /users/login
export async function login(data) {
    return await axios.post('users/login', data);
}

// POST /users/register
export async function register(data) {
    return await axios.post('users/register', data);
}

// GET /users/logout
export async function logout() {
    return await axios.get('users/logout');
}

// GET /users/profile
export async function getProfile() {
    return await axios.get('users/profile');
}

// PUT /users/profile
export async function editProfile() {
    return await axios.put('users/profile', data);
}

// GET /auth
export async function verifyToken() {
    return await axios.get('users');
}