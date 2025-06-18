import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/projects?page=${page}&sort=${sort}`, {
        withCredentials: true
      });
      setProjects(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login'); // redirect if not logged in
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [sort, page]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={logout} className="text-sm bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      <select className="mb-4 p-2 border" value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
        <option value="recent">Recent Projects</option>
        <option value="category">Order By Category Name ASC</option>
        <option value="username">Order By Username ASC</option>
        <option value="title">Order By Project Title ASC</option>
      </select>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.username}</td>
              <td className="border p-2">{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button className="mr-2 px-3 py-1 border" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <button className="px-3 py-1 border" onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
