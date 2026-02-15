import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import WorkerDashboard from './pages/WorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobListing from './pages/JobListing';
import WorkerSearch from './pages/WorkerSearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="jobs" element={<JobListing />} />

        <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
          <Route path="worker/dashboard" element={<WorkerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
          <Route path="employer/dashboard" element={<EmployerDashboard />} />
          <Route path="workers" element={<WorkerSearch />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
