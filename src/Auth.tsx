import { useState, type FormEvent } from 'react';
import { registerUser, loginUser, apiError } from './api';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';

const formClass = 'mx-auto ant-16 flex max -w-sm flex-col gap-3 rounded order bg-white p-6';
const inputClass = 'rounded border p-2';
const buttonClass = 'rounded bg-slate-700 p-2 text-white';

export function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const [sending, setSending] = useState(false);

    const handleSubmit = async (e:FormEvent<HTMLForElement>) => {
        e.preventDefault();
        setError('');
        setSending(true);
        try {
            await registerUser({name:name.trim(), email, password});
            navigate('/login');
        } catch (error) {
            setError(apiError(err.message));
        } finally {
            setSending(false);
        }
    }

    return (
        <form  onSubmit = {handleSubmit} className = {formClass}>
            <h1 className = "text-xl font-bold"> Crear Cuneta </h1>
            <label htmlFor = "name">Nombre</label>
            <input
                id="name"
                required
                maxLength={100}
                pattern=".*\S.*"
                title = "Ingresa tu nombre(max 100)"
                value={name}
                onChange={e=>setName(e.target.value)}
                className= {inputClass}
            />

            <label htmlFor = "email">Correo</label>
            <input
                id="email"
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className= {inputClass}
            />

            <label htmlFor = "password">Contraseña</label>
            <input
                id="password"
                type="password"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className= {inputClass}
            />

            {error && <p className="text-red-600">{error}</p>}

            <button disabled={sending} className={buttonClass}>
                {sending}?'Registrando...':'Registrame'
            </button>

            <Link to="/login" className="text-center underline">
                Ya tengo cuenta
            </Link>
        </form>    
    );

}


export function LoginPage() {
    const navigate = Navigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const [sending, setSending] = useState(false);

    const handleSubmit = async (e:FormEvent<HTMLForElement>) => {
        e.preventDefault();
        setError('');
        setSending(true);
        try {
            const data = await loginUser({ email, password});
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (error) {
            setError(apiError(err.message));
        } finally {
            setSending(false);
        }
    }

    return (
        <form  onSubmit = {handleSubmit} className = {formClass}>
            <h1 className = "text-xl font-bold">Iniciar Sesion </h1>

            <label htmlFor = "email">Correo</label>
            <input
                id="email"
                type="email"
                requirec
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className= {inputClass}
            />

            <label htmlFor = "password">Contraseña</label>
            <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className= {inputClass}
            />

            {error && <p className="text-red-600">{error}</p>}

            <button disabled={sending} className={buttonClass}>
                {sending}?'Registrando...':'Registrame'
            </button>

            <Link to="/register" className="text-center underline">
                Crear una cuenta
            </Link>
        </form>    
    );

}