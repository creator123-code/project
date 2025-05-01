import React from 'react';
import { MathJax } from 'better-react-mathjax';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function HeunMethod() {
  // Example 1: first-order ODE
  const example1 = {
    h: 0.1,
    results: [
      { n: 0, x: 0, y: 1 },
      { n: 1, x: 0.1, y: 1.11 },
      { n: 2, x: 0.2, y: 1.2421 }
    ]
  };
  // Compute true values and errors for Example 1
  example1.results = example1.results.map(r => {
    const yTrue = 2 * Math.exp(r.x) - r.x - 1;
    const absErr = Math.abs(r.y - yTrue);
    const relErr = absErr / Math.abs(yTrue);
    return { ...r, yTrue, absErr, relErr };
  });

  const steps1 = [
    'f(0,1)=1',
    'y_{predict}=1+0.1\\times1=1.1',
    'f(0.1,1.1)=1.2',
    'y_1=1+\\frac{0.1}{2}(1+1.2)=1.11',
    'f(0.1,1.11)=1.21',
    'y_2=1.11+\\frac{0.1}{2}(1.21+1.431)=1.2421'
  ];

  // Example 2: second-order ODE y'' + y = 0 (simple harmonic oscillator)
  const example2 = {
    h: 0.1,
    results: [
      { n: 0, x: 0, y: 1 },
      { n: 1, x: 0.1, y: 0.995 },
      { n: 2, x: 0.2, y: 0.980025 }
    ]
  };
  // Compute true values and errors for Example 2 (yTrue = cos(x))
  example2.results = example2.results.map(r => {
    const yTrue = Math.cos(r.x);
    const absErr = Math.abs(r.y - yTrue);
    const relErr = absErr / Math.abs(yTrue);
    return { ...r, yTrue, absErr, relErr };
  });

  const steps2 = [
    'f_1(0,1,0)=u_2(0)=0',
    'u_{1,predict}=1+0.1\\times0=1',
    'f_2(0,1,0)=-u_1(0)=-1',
    'u_{2,predict}=0+0.1\\times(-1)=-0.1',
    'u_1(0.1)=1+\\frac{0.1}{2}(0-0.1)=0.995',
    'u_2(0.1)=0+\\frac{0.1}{2}(-1-(-1))=-0.1',
    'u_{1,predict2}=0.995+0.1\\times(-0.1)=0.9855',
    'u_{2,predict2}=-0.1+0.1\\times(-0.995)=-0.1995',
    'u_1(0.2)=0.995+\\frac{0.1}{2}(-0.1-0.1995)=0.980025'
  ];

  const chart1 = {
    labels: example1.results.map(r => r.x),
    datasets: [{ label: 'y vs x', data: example1.results.map(r => r.y), fill: false, borderColor: 'purple', tension: 0.1 }]
  };
  const chart2 = {
    labels: example2.results.map(r => r.x),
    datasets: [{ label: 'y vs x', data: example2.results.map(r => r.y), fill: false, borderColor: 'purple', tension: 0.1 }]
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-purple-700">Heun's Method Tutorial</h1>
      {/* Introduction to Heun's Method */}
      <section className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">When and Why to Use Heun's Method</h2>
        <p className="leading-relaxed">
          Heun's Method, often called the improved Euler method or explicit trapezoidal rule, is a predictor-corrector approach for solving initial value problems of ordinary differential equations. By averaging the slope at the beginning and end of each step, it achieves greater accuracy than the basic Euler method without significant additional cost.
        </p>
        <p className="leading-relaxed">
          Apply Heun's Method when you need moderate accuracy for non-stiff ODEs, and when you can afford two slope evaluations per step. It works well for both first-order equations and higher-order equations converted to systems of first-order equations.
        </p>
      </section>

      {/* Formulas */}
      <section className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">Formulas</h2>
        <MathJax>{`\\[y_{predict} = y_n + h f(x_n,y_n)\\]`}</MathJax>
        <MathJax>{`\\[y_{n+1} = y_n + \\frac{h}{2}(f(x_n,y_n)+f(x_{n+1},y_{predict}))\\]`}</MathJax>
      </section>

      {/* Example 1 */}
      <section className="mb-12 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Example 1: First-Order ODE</h2>
        <MathJax className="mb-4 text-center">{`\\[\\frac{dy}{dx} = x + y\\]`}</MathJax>
        {steps1.map((expr, i) => (
          <MathJax key={i}>{`\\[Step ${i+1}: ${expr}\\]`}</MathJax>
        ))}
        <table className="w-full mt-4 table-auto border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">n</th>
              <th className="border px-2 py-1">xₙ</th>
              <th className="border px-2 py-1">yₙ</th>
              <th className="border px-2 py-1">y<sub>true</sub></th>
              <th className="border px-2 py-1">|Error|</th>
              <th className="border px-2 py-1">Rel Error</th>
            </tr>
          </thead>
          <tbody>
            {example1.results.map(r => (
              <tr key={r.n}>
                <td className="border px-2 py-1">{r.n}</td>
                <td className="border px-2 py-1">{r.x}</td>
                <td className="border px-2 py-1">{r.y}</td>
                <td className="border px-2 py-1">{r.yTrue.toFixed(6)}</td>
                <td className="border px-2 py-1">{r.absErr.toFixed(6)}</td>
                <td className="border px-2 py-1">{r.relErr.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 w-full max-w-sm mx-auto"><Line data={chart1} /></div>
      </section>

      {/* Example 2 */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Example 2: Second-Order ODE</h2>
        <MathJax className="mb-2 text-center">{`\\[\\frac{d^2y}{dx^2} + y = 0\\]`}</MathJax>
        <MathJax className="mb-4 text-center">{`Initial: y(0)=1, y'(0)=0, h=0.1`}</MathJax>
        {steps2.map((expr, i) => (
          <MathJax key={i}>{`\\[Step ${i+1}: ${expr}\\]`}</MathJax>
        ))}
        <table className="w-full mt-4 table-auto border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">n</th>
              <th className="border px-2 py-1">xₙ</th>
              <th className="border px-2 py-1">yₙ</th>
              <th className="border px-2 py-1">y<sub>true</sub></th>
              <th className="border px-2 py-1">|Error|</th>
              <th className="border px-2 py-1">Rel Error</th>
            </tr>
          </thead>
          <tbody>
            {example2.results.map(r => (
              <tr key={r.n}>
                <td className="border px-2 py-1">{r.n}</td>
                <td className="border px-2 py-1">{r.x}</td>
                <td className="border px-2 py-1">{r.y}</td>
                <td className="border px-2 py-1">{r.yTrue.toFixed(6)}</td>
                <td className="border px-2 py-1">{r.absErr.toFixed(6)}</td>
                <td className="border px-2 py-1">{r.relErr.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 w-full max-w-sm mx-auto"><Line data={chart2} /></div>
      </section>
    </div>
  );
}
