import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const mathJaxConfig = {
  loader: { load: ['[tex]/ams'] },
  tex: { packages: { '[+]': ['ams'] } },
};

export default function EulerMethod() {
  // Short introduction about Euler's Method
  const introduction = `
    Euler's Method is a numerical technique for solving ordinary differential equations (ODEs) 
    with a given initial value. It is one of the simplest and most widely used methods for approximating 
    solutions to first-order ODEs. Euler's Method works by using the slope of the tangent line at a point 
    to estimate the next point. This method is particularly useful for solving problems where an analytical 
    solution is difficult or impossible to obtain.
  `;

  // Example 1: dy/dx + 2y = 1.3e^x, y(0)=5, h=0.1
  const h1 = 0.1;
  const ex1 = [
    { n: 0, x: 0, y: 5 },
    { n: 1, x: 0.1, y: null },
    { n: 2, x: 0.2, y: null },
  ];
  // Compute y1, y2
  ex1[1].y = parseFloat((ex1[0].y + h1 * (1.3 * Math.exp(ex1[0].x) - 2 * ex1[0].y)).toFixed(4));
  ex1[2].y = parseFloat((ex1[1].y + h1 * (1.3 * Math.exp(ex1[1].x) - 2 * ex1[1].y)).toFixed(4));
  // Exact and errors
  const res1 = ex1.map((r) => {
    const yTrue = 2 * Math.exp(r.x) - r.x - 1;
    const absErr = Math.abs(r.y - yTrue);
    const relErr = absErr / Math.abs(yTrue);
    return { ...r, yTrue, absErr, relErr };
  });
  const steps1 = [
    `f(x_0, y_0) = 1.3e^{0} - 2 \\cdot 5 = ${(1.3 * Math.exp(0) - 2 * 5).toFixed(4)}`,
    `y_1 = y_0 + h \\cdot f(x_0, y_0) = 5 + 0.1 \\cdot (${(1.3 * Math.exp(0) - 2 * 5).toFixed(4)}) = ${ex1[1].y}`,
    `f(x_1, y_1) = 1.3e^{0.1} - 2 \\cdot ${ex1[1].y} = ${(1.3 * Math.exp(0.1) - 2 * ex1[1].y).toFixed(4)}`,
    `y_2 = y_1 + h \\cdot f(x_1, y_1) = ${ex1[1].y} + 0.1 \\cdot (${(1.3 * Math.exp(0.1) - 2 * ex1[1].y).toFixed(4)}) = ${ex1[2].y}`,
  ];

  // Example 2: Cooling ball dy/dt = -2.2067e-12(θ^4 - 81e8), θ(0)=1200, h=240
  const h2 = 240;
  const k = -2.2067e-12;
  const ambient = 81e8;
  const ex2 = [
    { n: 0, x: 0, y: 1200 },
    { n: 1, x: 240, y: null },
    { n: 2, x: 480, y: null },
  ];
  ex2[1].y = parseFloat((ex2[0].y + h2 * k * (Math.pow(ex2[0].y, 4) - ambient)).toFixed(2));
  ex2[2].y = parseFloat((ex2[1].y + h2 * k * (Math.pow(ex2[1].y, 4) - ambient)).toFixed(2));
  const true240 = 106.09;
  const true480 = 57.647;
  const res2 = ex2.map((r) => {
    const yTrue = r.n === 1 ? true240 : r.n === 2 ? true480 : 1200;
    const absErr = Math.abs(r.y - yTrue);
    const relErr = absErr / Math.abs(yTrue);
    return { ...r, yTrue, absErr, relErr };
  });
  const steps2 = [
    `f(0, 1200) = -2.2067 \\cdot 10^{-12}(1200^4 - 81 \\cdot 10^8) = ${(k * (Math.pow(ex2[0].y, 4) - ambient)).toFixed(4)}`,
    `\\theta_1 = \\theta_0 + h \\cdot f(0, \\theta_0) = 1200 + 240 \\cdot (${(k * (Math.pow(ex2[0].y, 4) - ambient)).toFixed(4)}) = ${ex2[1].y}`,
    `f(240, ${ex2[1].y}) = -2.2067 \\cdot 10^{-12}(${ex2[1].y}^4 - 81 \\cdot 10^8) = ${(k * (Math.pow(ex2[1].y, 4) - ambient)).toFixed(4)}`,
    `\\theta_2 = \\theta_1 + h \\cdot f(240, \\theta_1) = ${ex2[1].y} + 240 \\cdot (${(k * (Math.pow(ex2[1].y, 4) - ambient)).toFixed(4)}) = ${ex2[2].y}`,
  ];

  const chart1 = {
    labels: res1.map((r) => r.x),
    datasets: [
      {
        label: 'Euler Approximation (y)',
        data: res1.map((r) => r.y),
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        tension: 0.1,
      },
      {
        label: 'True Solution (y_true)',
        data: res1.map((r) => r.yTrue),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        borderDash: [5, 5],
        tension: 0.1,
      },
    ],
  };

  const chart2 = {
    labels: res2.map((r) => r.x),
    datasets: [
      {
        label: 'Euler Approximation (θ)',
        data: res2.map((r) => r.y),
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        tension: 0.1,
      },
      {
        label: 'True Solution (θ_true)',
        data: res2.map((r) => r.yTrue),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        borderDash: [5, 5],
        tension: 0.1,
      },
    ],
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">Euler’s Method Tutorial</h1>
        <p className="mb-6 text-gray-700 leading-relaxed">{introduction}</p>

        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Formula</h2>
          <MathJax>{`\\[y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\]`}</MathJax>
        </section>

        <section className="mb-12 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Example 1</h2>
          <div className="text-center mb-4">
            <MathJax>{`\\[\\frac{dy}{dx} + 2y = 1.3e^x, \\quad y(0) = 5, \\quad h = 0.1\\]`}</MathJax>
          </div>
          {steps1.map((s, i) => (
            <MathJax key={i}>{`\\[\\text{Step ${i + 1}: } ${s}\\]`}</MathJax>
          ))}
          <table className="w-full mt-4 border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th>n</th>
                <th>x</th>
                <th>y</th>
                <th>y_true</th>
                <th>|err|</th>
                <th>rel err</th>
              </tr>
            </thead>
            <tbody>
              {res1.map((r) => (
                <tr key={r.n}>
                  <td>{r.n}</td>
                  <td>{r.x}</td>
                  <td>{r.y.toFixed(4)}</td>
                  <td>{r.yTrue.toFixed(4)}</td>
                  <td>{r.absErr.toFixed(4)}</td>
                  <td>{r.relErr.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 w-full max-w-sm mx-auto">
            <Line data={chart1} />
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Example 2</h2>
          <div className="text-center mb-4">
            <MathJax>{`\\[\\frac{d\\theta}{dt} = -2.2067 \\cdot 10^{-12}(\\theta^4 - 81 \\cdot 10^8), \\quad \\theta(0) = 1200, \\quad h = 240\\]`}</MathJax>
          </div>
          {steps2.map((s, i) => (
            <MathJax key={i}>{`\\[\\text{Step ${i + 1}: } ${s}\\]`}</MathJax>
          ))}
          <table className="w-full mt-4 border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th>n</th>
                <th>t</th>
                <th>θ</th>
                <th>θ_true</th>
                <th>|err|</th>
                <th>rel err</th>
              </tr>
            </thead>
            <tbody>
              {res2.map((r) => (
                <tr key={r.n}>
                  <td>{r.n}</td>
                  <td>{r.x}</td>
                  <td>{r.y.toFixed(2)}</td>
                  <td>{r.yTrue.toFixed(2)}</td>
                  <td>{r.absErr.toFixed(2)}</td>
                  <td>{r.relErr.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 w-full max-w-sm mx-auto">
            <Line data={chart2} />
          </div>
        </section>
      </div>
    </MathJaxContext>
  );
}
