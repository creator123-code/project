import { MathJax } from 'better-react-mathjax';

function RK4Method() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">RK4 Method Tutorial</h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="leading-relaxed">
          The 4th Order Runge-Kutta Method (RK4) is one of the most accurate single-step methods for solving ordinary differential equations (ODEs) numerically. 
          It uses four slope evaluations at each step to achieve high accuracy. RK4 is widely used in engineering and scientific computations due to its balance 
          between accuracy and computational efficiency.
        </p>
      </section>

      {/* Formulas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Formulas</h2>
        <div className="bg-white p-4 rounded shadow">
          <MathJax>{`\\[
            k_1 = h f(x_n, y_n)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_2 = h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\right)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_3 = h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_2}{2}\\right)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_4 = h f(x_n + h, y_n + k_3)
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)
          \\]`}</MathJax>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Solve the ODE:</p>
          <MathJax>{`\\[
            \\frac{dy}{dx} = xy + y^2, \\quad y(0) = 1
          \\]`}</MathJax>
          <p>Using step size ( h = 0.1 ), find approximate values up to ( x = 0.3 ).</p>
        </div>
      </section>

      {/* Steps to Solve */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Steps to Solve</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="mb-4"><b>Step 1 (at ( x_0 = 0, y_0 = 1 )):</b></p>
          <MathJax>{`\\[
            k_1 = h f(x_0, y_0) = 0.1(0 \\cdot 1 + 1^2) = 0.1
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_2 = h f\\left(x_0 + \\frac{h}{2}, y_0 + \\frac{k_1}{2}\\right) = 0.1\\left(0.05 \\cdot (1 + 0.05) + (1 + 0.05)^2\\right)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_2 = 0.1(0.05 \\cdot 1.05 + 1.1025) = 0.1(1.1555) = 0.11555
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_3 = h f\\left(x_0 + \\frac{h}{2}, y_0 + \\frac{k_2}{2}\\right) = 0.1\\left(0.05 \\cdot (1 + 0.057775) + (1 + 0.057775)^2\\right)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_3 \\approx 0.1184
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_4 = h f(x_0 + h, y_0 + k_3) = 0.1\\left(0.1 \\cdot (1 + 0.1184) + (1 + 0.1184)^2\\right)
          \\]`}</MathJax>
          <MathJax>{`\\[
            k_4 \\approx 0.1405
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_1 = y_0 + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4) = 1 + \\frac{1}{6}(0.1 + 2(0.11555) + 2(0.1184) + 0.1405)
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_1 \\approx 1.1176
          \\]`}</MathJax>

          <p className="mt-6"><b>Step 2 (at ( x_1 = 0.1, y_1 = 1.1176 )):</b></p>
          <p>Repeat the same calculations with updated values of \( x_1 \) and \( y_1 \).</p>

          <p className="mt-6"><b>Step 3 (at ( x_2 = 0.2, y_2 = 1.2665 )):</b></p>
          <p>Continue using the same formulas to calculate ( y_3 ).</p>
        </div>
      </section>

      {/* Iteration Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Iteration Table</h2>
        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">n</th>
              <th className="border border-gray-300 px-4 py-2">xₙ</th>
              <th className="border border-gray-300 px-4 py-2">yₙ (Approximate)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">0</td>
              <td className="border border-gray-300 px-4 py-2">0.0</td>
              <td className="border border-gray-300 px-4 py-2">1.0000</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">0.1</td>
              <td className="border border-gray-300 px-4 py-2">1.1176</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">0.2</td>
              <td className="border border-gray-300 px-4 py-2">1.2665</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">0.3</td>
              <td className="border border-gray-300 px-4 py-2">1.4542</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RK4Method;
