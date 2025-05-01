import { useRef, useState } from 'react';
import 'mathlive';
import { create, all } from 'mathjs';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
const math = create(all);

export default function Solver() {
  const mathfieldRef = useRef(null);
  const [method, setMethod] = useState('euler');
  const [steps, setSteps] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [x0, setX0] = useState('');
  const [y0, setY0] = useState('');
  const [h, setH] = useState('');
  const [xn, setXn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const clearEditor = () => {
    if (mathfieldRef.current) {
      mathfieldRef.current.value = '';
      mathfieldRef.current.focus();
    }
    setSteps([]);
    setGraphData(null);
    setX0('');
    setY0('');
    setH('');
    setXn('');
    setErrorMsg('');
  };

  const solveODE = () => {
    setErrorMsg('');
    setSteps([]);
    setGraphData(null);

    const equationLatex = mathfieldRef.current.getValue('latex');
    let f;

    // Error handling for equation parsing
    try {
      const equation = equationLatex
        .replace(/\\times/g, '*')
        .replace(/\\frac{([^}]*)}{([^}]*)}/g, '($1)/($2)')
        .replace(/\\frac/g, '/')
        .replace(/\\dfrac/g, '/')
        .replace(/\\partial/g, 'd')
        .replace(/\\frac{d}{dx}/g, 'd/dx');
      f = math.parse(equation).compile();
    } catch (error) {
      setErrorMsg('Invalid equation. Please check your input.');
      return;
    }

    let x = parseFloat(x0);
    let y = parseFloat(y0);
    const hf = parseFloat(h);
    const finalX = parseFloat(xn);

    // Input validation
    if (isNaN(x) || isNaN(y) || isNaN(hf) || isNaN(finalX)) {
      setErrorMsg('Please enter valid initial values.');
      return;
    }

    if (x >= finalX) {
      setErrorMsg('Initial x₀ must be less than final x.');
      return;
    }

    if (hf <= 0) {
      setErrorMsg('Step size h must be greater than 0.');
      return;
    }

    let results = [{ iter: 0, x: x.toFixed(6), y: y.toFixed(6), calc: 'Initial values' }];

    while (x < finalX) {
      let k1, k2, k3, k4, calcDetails;
      switch (method) {
        case 'euler':
          calcDetails = `y = ${y.toFixed(6)} + ${hf} * f(${x.toFixed(6)}, ${y.toFixed(6)})`;
          y = y + hf * f.evaluate({ x, y });
          calcDetails += ` = ${y.toFixed(6)}`;
          break;
        case 'heun':
          k1 = f.evaluate({ x, y });
          k2 = f.evaluate({ x: x + hf, y: y + hf * k1 });
          calcDetails = `k1 = ${k1.toFixed(6)}, k2 = ${k2.toFixed(6)}, y = ${y.toFixed(6)} + (${hf}/2) * (${k1.toFixed(6)} + ${k2.toFixed(6)})`;
          y = y + (hf / 2) * (k1 + k2);
          calcDetails += ` = ${y.toFixed(6)}`;
          break;
        case 'midpoint':
          k1 = f.evaluate({ x, y });
          k2 = f.evaluate({ x: x + hf / 2, y: y + (hf / 2) * k1 });
          calcDetails = `k1 = ${k1.toFixed(6)}, k2 = ${k2.toFixed(6)}, y = ${y.toFixed(6)} + ${hf} * ${k2.toFixed(6)}`;
          y = y + hf * k2;
          calcDetails += ` = ${y.toFixed(6)}`;
          break;
        case 'rk4':
          k1 = f.evaluate({ x, y });
          k2 = f.evaluate({ x: x + hf / 2, y: y + (hf / 2) * k1 });
          k3 = f.evaluate({ x: x + hf / 2, y: y + (hf / 2) * k2 });
          k4 = f.evaluate({ x: x + hf, y: y + hf * k3 });
          calcDetails = `k1 = ${k1.toFixed(6)}, k2 = ${k2.toFixed(6)}, k3 = ${k3.toFixed(6)}, k4 = ${k4.toFixed(6)}, y = ${y.toFixed(6)} + (${hf}/6) * (${k1.toFixed(6)} + 2*${k2.toFixed(6)} + 2*${k3.toFixed(6)} + ${k4.toFixed(6)})`;
          y = y + (hf / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
          calcDetails += ` = ${y.toFixed(6)}`;
          break;
        default:
          setErrorMsg('Invalid method selected.');
          return;
      }
      x += hf;

      results.push({ iter: results.length, x: x.toFixed(6), y: y.toFixed(6), calc: calcDetails });
    }

    // Set results and graph data
    setSteps(results);
    setGraphData({
      labels: results.map(r => r.x),
      datasets: [
        {
          label: 'Numerical Solution',
          data: results.map(r => r.y),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.3,
        },
      ],
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Advanced ODE Solver</h1>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <p className="text-gray-600 mb-2 text-center">Enter the ODE below:</p>

      <math-field
        ref={mathfieldRef}
        style={{
          width: '100%',
          fontSize: '20px',
          minHeight: '100px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
        }}
        placeholder="Enter ODE (e.g., dy/dx = x + y)"
      ></math-field>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Initial x₀ (starting x value):</label>
          <input
            type="number"
            placeholder="e.g., 0"
            value={x0}
            onChange={e => setX0(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Initial y₀ (starting y value):</label>
          <input
            type="number"
            placeholder="e.g., 1"
            value={y0}
            onChange={e => setY0(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Step size h (increment):</label>
          <input
            type="number"
            placeholder="e.g., 0.1"
            value={h}
            onChange={e => setH(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Final x (end x value):</label>
          <input
            type="number"
            placeholder="e.g., 1"
            value={xn}
            onChange={e => setXn(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      <div className="my-4">
        <label className="block mb-2 font-semibold">Choose Method:</label>
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="euler">Euler's Method</option>
          <option value="heun">Heun's Method</option>
          <option value="midpoint">Midpoint Method</option>
          <option value="rk4">Runge-Kutta 4th Order</option>
        </select>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={solveODE}
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
        >
          Solve
        </button>
        <button
          onClick={clearEditor}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
        >
          Clear
        </button>
      </div>

      {steps.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Solution Steps:</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Iteration</th>
                <th className="border border-gray-300 px-4 py-2">x</th>
                <th className="border border-gray-300 px-4 py-2">y (Numerical)</th>
                <th className="border border-gray-300 px-4 py-2">Calculation</th>
              </tr>
            </thead>
            <tbody>
              {steps.map(step => (
                <tr key={step.iter} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{step.iter}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{step.x}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{step.y}</td>
                  <td className="border border-gray-300 px-4 py-2">{step.calc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {graphData && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Solution Graph:</h2>
          <Line data={graphData} />
        </div>
      )}
    </div>
  );
}
