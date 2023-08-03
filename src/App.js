import { Route, Routes } from 'react-router-dom';
import Auth from './layouts/Auth';
import Home from './layouts/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
