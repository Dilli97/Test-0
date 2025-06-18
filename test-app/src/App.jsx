import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects'; // this should be created

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
