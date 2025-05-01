import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome to <span className="text-yellow-300">ODEsolver</span>
        </h1>
        <p className="text-xl text-center mb-6 leading-relaxed">
          An interactive platform for engineering students to learn and solve ordinary differential equations step-by-step.
        </p>
        <p className="text-lg text-center mb-10 leading-relaxed">
          Discover numerical methods(a family of algorithms for approximating ordinary differential equation solutions when analytic formulas aren’t available). ODEsolver guides you through Euler’s method, Heun’s method, Midpoint, RK2, RK4, and systems approaches, showing every iteration, error analysis, and graphical insight.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {/* About Card */}
          <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-300">About ODEsolver</h2>
            <p className="leading-relaxed">
              ODEsolver is an all-in-one platform for learning and applying numerical methods to solve ordinary differential equations. Explore step-by-step tutorials, enter your own equations into the solver, and compare the accuracy and efficiency of different methods side-by-side.
            </p>
          </div>

          {/* Tutorials Card */}
          <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3 text-yellow-300">Tutorials</h2>
            <ul className="space-y-3">
              <li><Link to="/euler" className="underline hover:text-yellow-300">Euler Method</Link></li>
              <li><Link to="/heun" className="underline hover:text-yellow-300">Heun Method</Link></li>
              <li><Link to="/midpoint" className="underline hover:text-yellow-300">Midpoint Method</Link></li>
              <li><Link to="/rk2" className="underline hover:text-yellow-300">RK2 Method</Link></li>
              <li><Link to="/rk4" className="underline hover:text-yellow-300">RK4 Method</Link></li>
              <li><Link to="/systems" className="underline hover:text-yellow-300">Systems of ODEs</Link></li>
              <li><Link to="/comparison" className="underline hover:text-yellow-300">Method Comparison</Link></li>
            </ul>
          </div>

          {/* Solver Card */}
          <Link
            to="/solver"
            className="block bg-white bg-opacity-20 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-opacity-30 transition"
          >
            <h2 className="text-2xl font-semibold mb-3 text-yellow-300">Solver</h2>
            <p>
              Enter your ODE, pick a method, and see iterations & graphs. Visualize the solution step-by-step.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
