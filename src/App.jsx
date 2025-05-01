// src/App.jsx
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import EulerMethod from './pages/EulerMethod';
import HeunMethod from './pages/HeunMethod';
import MidpointMethod from './pages/MidpointMethod';
import RK2Method from './pages/RK2Method';
import RK4Method from './pages/RK4Method';
import SystemsODEs from './pages/SystemsODEs';
import ComparisonPage from './pages/ComparisonPage';
import SolverPage from './pages/SolverPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* HEADER */}
        <header className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
            <h1 className="text-2xl font-bold">ODEsolver</h1>
            <nav className="flex flex-wrap space-x-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/euler', label: 'Euler' },
                { to: '/heun',  label: 'Heun' },
                { to: '/midpoint', label: 'Midpoint' },
                { to: '/rk2', label: 'RK2' },
                { to: '/rk4', label: 'RK4' },
                { to: '/systems', label: 'Systems' },
                { to: '/comparison', label: 'Comparison' },
                { to: '/solver', label: 'Solver' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded hover:purple-400 transition ${
                      isActive ? 'bg-purple-400 font-semibold' : 'text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/euler" element={<EulerMethod />} />
            <Route path="/heun" element={<HeunMethod />} />
            <Route path="/midpoint" element={<MidpointMethod />} />
            <Route path="/rk2" element={<RK2Method />} />
            <Route path="/rk4" element={<RK4Method />} />
            <Route path="/systems" element={<SystemsODEs />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/solver" element={<SolverPage />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-purple-200 text-center p-4">
          Created by Eng.Reem Al-Qassabi
        </footer>
      </div>
    </Router>
  );
}

export default App;
