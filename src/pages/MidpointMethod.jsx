import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import { evaluate } from 'mathjs';

function MidpointMethod() {
  const [func, setFunc] = useState('x + y');
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(1);
  const [h, setH] = useState(0.1);
  const [steps, setSteps] = useState(5);
  const [results, setResults] = useState([]);

  const solveMidpoint = () => {
    let x = x0;
    let y = y0;
    let tempResults = [{ n: 0, x, y }];

    for (let i = 0; i < steps; i++) {
      const fxy = evaluate(func, { x, y });
      const x_half = x + h / 2;
      const y_half = y + (h / 2) * fxy;
      const f_half = evaluate(func, { x: x_half, y: y_half });
      const y_next = y + h * f_half;

      x = x + h;
      y = y_next;

      tempResults.push({
        n: i + 1,
        x: parseFloat(x.toFixed(4)),
        y: parseFloat(y.toFixed(4)),
        fxy: parseFloat(fxy.toFixed(4)),
        x_half: parseFloat(x_half.toFixed(4)),
        y_half: parseFloat(y_half.toFixed(4)),
        f_half: parseFloat(f_half.toFixed(4)),
      });
    }

    setResults(tempResults);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-green-700">Midpoint Method Tutorial</h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          Midpoint Method is a second-order Runge-Kutta method that improves Euler's method by using the slope at the midpoint of the interval.
          It achieves greater accuracy by making a better estimate of the slope over the interval.
        </p>
      </section>

      {/* Formulas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Formulas</h2>
        <div className="bg-white p-4 rounded shadow">
          <MathJax>{`\\[
            y_{mid} = y_n + \\frac{h}{2} f(x_n, y_n)
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{n+1} = y_n + h \\times f\\left( x_n + \\frac{h}{2}, y_{mid} \\right)
          \\]`}</MathJax>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Steps to Solve</h2>
        <ol className="list-decimal ml-6 space-y-4">
          <li>Find slope at (xₙ, yₙ): f(xₙ, yₙ)</li>
          <li>Estimate midpoint:
            <MathJax>{`\\[
              x_{mid} = x_n + \\frac{h}{2}, \\quad y_{mid} = y_n + \\frac{h}{2} f(x_n, y_n)
            \\]`}</MathJax>
          </li>
          <li>Find slope at midpoint f(x_mid, y_mid)</li>
          <li>Correct yₙ₊₁:
            <MathJax>{`\\[
              y_{n+1} = y_n + h \\times f(x_{mid}, y_{mid})
            \\]`}</MathJax>
          </li>
        </ol>
      </section>

      {/* Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Example</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Solve:</p>
          <MathJax>{`\\[
            \\frac{dy}{dx} = x + y, \\quad y(0) = 1
          \\]`}</MathJax>
          <p>Find y(0.2) using Midpoint Method with h = 0.1.</p>

          <div className="mt-4 space-y-4">
            <MathJax>{`\\[
              f(0,1) = 0 + 1 = 1
            \\]`}</MathJax>
            <MathJax>{`\\[
              x_{mid} = 0 + \\frac{0.1}{2} = 0.05
            \\]`}</MathJax>
            <MathJax>{`\\[
              y_{mid} = 1 + \\frac{0.1}{2} \\times 1 = 1.05
            \\]`}</MathJax>
            <MathJax>{`\\[
              f(0.05,1.05) = 0.05 + 1.05 = 1.1
            \\]`}</MathJax>
            <MathJax>{`\\[
              y_1 = 1 + 0.1 \\times 1.1 = 1.11
            \\]`}</MathJax>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MidpointMethod;
