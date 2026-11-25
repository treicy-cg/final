import axios from "axios";
const BASE_URL = "https://mentoriautec-api.aaron-navarro.workers.dev/api"

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export interface Page<T> {
    items : T[];
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
}

export interface Mentor {
    id: number;
    name: string;
    specialty: string;
    modality: string;
    availableSlots: string;
    description: string;
}

export type RequestsStatus = 'PENDING'|'CANCELLED';

export interface Requests {
    id: number;
    resourceId: number;
    resourceName: string;
    topic: string;
    status: 'PENDING';
}

export interface ApiError {
    code: string;
    message: string;
}

export const api = axios.create({baseURL: BASE_URL});


api.interceptors.request.use( config => {
    // Obtener el token guardado en localStorage
    const token = localStorage.getItem('token');
    // Si existe un token, agregarlo al header Authorization
    if (token && !config.url?.includes('/auth')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },

);

api.interceptors.response.use( response => response,
    error => {
    // Si el servidor responde con 401 (No autorizado)
    if (axios.isAxiosError(error) && error.response?.status === 401 && !error.config?.url?.includes('/auth')) {
    // Limpiar datos de sesión
    localStorage.removeItem('token');
    // Redirigir al login
    window.location.href = '/login';
    }
    return Promise.reject(error);
    }
);

export const registerUser = (body: RegisterBody) => 
    api.post<{id:number;name:string; email:string}>('/auth/register', body).then(r=>r.data);

export const loginUser = (email:string, password: string) => 
    api.post<{token:string}>('/auth/login', {email, password}).then(r=>r.data);

export const getMentors = (page:number, size:number) => 
    api.get<Page<Mentor>>('/mentors', {params: {page,size}}).then(r=>r.data);

export const getMentor = (id: string) => 
    api.get<Mentor>(`/mentors/${id}`).then(r=>r.data);

export const getMyRequests = () => 
    api.get<Requests[]>('/me/requests').then(r=>r.data);

export const cancelRequests = (id: number) => 
    api.patch<Requests>(`/requests/${id}/cancel`).then(r=>r.data);

export function apiError(err: unknown) {
    if(axios.isAxiosError<ApiError>(err) && err.response) {
        return {code: err.response.data?.code, message: err.response.data?.message??"Ocurrio un error"};
    }
    return {code: undefined, message: 'Nose pudo conectar co el servidor'};
}