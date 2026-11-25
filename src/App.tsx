import { LoginPage, RegisterPage } from './Auth';
import DashboardPage from './pages/DashboardPage';
import MentorDetailPage from './pages/MentorDetailPage';
import MyRequestsPage from './pages/MyRequestsPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';

function ProtectedLayout() {
  const navigate = useNavigate();
  if(!localStorage.getItem('token')) return <Navigate to="/login" replace />;
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <header className=''>
        <nav className="felx gap-4">
          <Link to="/dashboard" className="font-bold">
            Mentorias
          </Link>
          <Link to="/my-requests" className="underline">
            Mis mentorias
          </Link>
        </nav>
        <button onClick={logout} className="rounder bg-slate-700 px-3 py-1">
          Cerrar Sesion
        </button>
      </header>
      <main className="max-auto .ax-w-4xl p-6">
        <Outlet/>
      </main>
    </>    
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace/>} />
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route element={<ProtectedLayout />} >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mentors/:id" element={<MentorDetailPage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );

  
}
