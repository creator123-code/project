import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';

function RK2Method() {
  const [func] = useState('x^2 + y');
  const [x0] = useState(0);
  const [y0] = useState(1);
  const [h] = useState(0.1);
  const [steps] = useState(5);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">RK2 Method Tutorial</h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          The Runge-Kutta 2nd Order Method (RK2) is a two-stage method to solve first-order ordinary differential equations numerically. 
          It improves Euler's method by calculating two slope estimates:
        </p>
        <ul className="list-disc ml-8 mt-4">
          <li><b>k₁:</b> Slope at the beginning of the interval.</li>
          <li><b>k₂:</b> Slope at the end using the predicted value.</li>
        </ul>
        <p className="mt-4">
          Then the method averages these slopes to get a better estimate for the next value of \( y \).
        </p>
      </section>

      {/* Formulas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Formulas</h2>
        <div className="bg-white p-4 rounded shadow">
          <MathJax>{`\\[
            k_1 = f(x_n, y_n)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_2 = f(x_n + h, y_n + h \\times k_1)
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{n+1} = y_n + \\frac{h}{2}(k_1 + k_2)
          \\]`}</MathJax>
        </div>
      </section>

      {/* Steps to Solve */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Steps to Solve (with Calculation)</h2>
        <ol className="list-decimal ml-6 space-y-4">
          <li>
            Find slope at current point:
            <MathJax>{`\\[
              k_1 = f(x_n, y_n)
            \\]`}</MathJax>
          </li>
          <li>
            Predict using k₁ and find new slope:
            <MathJax>{`\\[
              k_2 = f(x_n + h, y_n + h \\times k_1)
            \\]`}</MathJax>
          </li>
          <li>
            Calculate new value:
            <MathJax>{`\\[
              y_{n+1} = y_n + \\frac{h}{2}(k_1 + k_2)
            \\]`}</MathJax>
          </li>
        </ol>
      </section>

      {/* Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Example Problem</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Given:</p>
          <MathJax>{`\\[
            \\frac{dy}{dx} = x^2 + y, \\quad y(0) = 1
          \\]`}</MathJax>
          <p>Find y at x = 0.4 with h = 0.1 using RK2 Method.</p>

          <div className="mt-4 space-y-4">
            <MathJax>{`\\[
              \\text{At } (0,1): k_1 = f(0,1) = 0 + 1 = 1
            \\]`}</MathJax>
            <MathJax>{`\\[
              k_2 = f(0.1,1.1) = (0.1)^2 + 1.1 = 0.01 + 1.1 = 1.11
            \\]`}</MathJax>
            <MathJax>{`\\[
              y_1 = 1 + \\frac{0.1}{2}(1 + 1.11) = 1.1055
            \\]`}</MathJax>
          </div>
        </div>
      </section>

      {/* Iteration Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Iteration Table</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-400 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 py-2">n</th>
              <th className="border border-gray-400 px-2 py-2">xₙ</th>
              <th className="border border-gray-400 px-2 py-2">yₙ (Numerical)</th>
              <th className="border border-gray-400 px-2 py-2">yₙ (Approx Exact)</th>
              <th className="border border-gray-400 px-2 py-2">Absolute Relative Error (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-2 py-2">0</td>
              <td className="border border-gray-400 px-2 py-2">0.0</td>
              <td className="border border-gray-400 px-2 py-2">1.0000</td>
              <td className="border border-gray-400 px-2 py-2">1.0000</td>
              <td className="border border-gray-400 px-2 py-2">0.00</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-2">1</td>
              <td className="border border-gray-400 px-2 py-2">0.1</td>
              <td className="border border-gray-400 px-2 py-2">1.1055</td>
              <td className="border border-gray-400 px-2 py-2">1.1162</td>
              <td className="border border-gray-400 px-2 py-2">0.96</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-2">2</td>
              <td className="border border-gray-400 px-2 py-2">0.2</td>
              <td className="border border-gray-400 px-2 py-2">1.2328</td>
              <td className="border border-gray-400 px-2 py-2">1.2588</td>
              <td className="border border-gray-400 px-2 py-2">2.07</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-2">3</td>
              <td className="border border-gray-400 px-2 py-2">0.3</td>
              <td className="border border-gray-400 px-2 py-2">1.3839</td>
              <td className="border border-gray-400 px-2 py-2">1.4256</td>
              <td className="border border-gray-400 px-2 py-2">2.92</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RK2Method;
