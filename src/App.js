import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './layouts/Auth';
import Home from './layouts/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Jobs from './pages/Jobs';
import Table from './pages/Table';
import PersonalInfo from './pages/PersonalInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Table />} />
        <Route path="/user" element={<PersonalInfo />} />
        <Route path="/table/:id" element={<Jobs />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth" element={<Navigate to={'/auth/login'} />} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
