import { MathJax } from 'better-react-mathjax';

function SystemODEs() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">
        Solving System of ODEs Using Euler's Method
      </h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="leading-relaxed">
          A system of ODEs involves two or more differential equations that must be solved simultaneously. 
          We can extend Euler’s method to handle systems by updating each variable step-by-step at the same time.
        </p>
      </section>

      {/* Formulas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Formulas</h2>
        <div className="bg-white p-4 rounded shadow">
          <MathJax>{`\\[
            y_{1,n+1} = y_{1,n} + h \\times f_1(x_n, y_{1,n}, y_{2,n})
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{2,n+1} = y_{2,n} + h \\times f_2(x_n, y_{1,n}, y_{2,n})
          \\]`}</MathJax>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Given the system:</p>
          <MathJax>{`\\[
            \\frac{dy_1}{dx} = 3y_1 + 2y_2
          \\]`}</MathJax>
          <MathJax>{`\\[
            \\frac{dy_2}{dx} = 4y_1 + y_2
          \\]`}</MathJax>
          <p className="mt-4">With initial conditions:</p>
          <MathJax>{`\\[
            y_1(0) = 1, \\quad y_2(0) = 0
          \\]`}</MathJax>
          <p className="mt-4">
            Using step size ( h = 0.1 ), find approximate values up to ( x = 0.3 ).
          </p>
        </div>
      </section>

      {/* Steps to Solve */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Steps to Solve</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="mb-4"><b>Step 1 (at ( x_0 = 0 )):</b></p>
          <MathJax>{`\\[
            f_1(0,1,0) = 3(1) + 2(0) = 3
          \\]`}</MathJax>
          <MathJax>{`\\[
            f_2(0,1,0) = 4(1) + 0 = 4
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{1,1} = 1 + 0.1 \\times 3 = 1.3
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{2,1} = 0 + 0.1 \\times 4 = 0.4
          \\]`}</MathJax>

          <p className="mt-6"><b>Step 2 (at ( x_1 = 0.1 )):</b></p>
          <MathJax>{`\\[
            f_1(0.1,1.3,0.4) = 3(1.3) + 2(0.4) = 3.9 + 0.8 = 4.7
          \\]`}</MathJax>
          <MathJax>{`\\[
            f_2(0.1,1.3,0.4) = 4(1.3) + 0.4 = 5.2 + 0.4 = 5.6
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{1,2} = 1.3 + 0.1 \\times 4.7 = 1.77
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{2,2} = 0.4 + 0.1 \\times 5.6 = 0.96
          \\]`}</MathJax>

          <p className="mt-6"><b>Step 3 (at ( x_2 = 0.2 )):</b></p>
          <MathJax>{`\\[
            f_1(0.2,1.77,0.96) = 3(1.77) + 2(0.96) = 5.31 + 1.92 = 7.23
          \\]`}</MathJax>
          <MathJax>{`\\[
            f_2(0.2,1.77,0.96) = 4(1.77) + 0.96 = 7.08 + 0.96 = 8.04
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{1,3} = 1.77 + 0.1 \\times 7.23 = 2.493
          \\]`}</MathJax>
          <MathJax>{`\\[
            y_{2,3} = 0.96 + 0.1 \\times 8.04 = 1.764
          \\]`}</MathJax>
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
              <th className="border border-gray-300 px-4 py-2">y₁ (Numerical)</th>
              <th className="border border-gray-300 px-4 py-2">y₂ (Numerical)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">0</td>
              <td className="border border-gray-300 px-4 py-2">0.0</td>
              <td className="border border-gray-300 px-4 py-2">1.0000</td>
              <td className="border border-gray-300 px-4 py-2">0.0000</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">0.1</td>
              <td className="border border-gray-300 px-4 py-2">1.3000</td>
              <td className="border border-gray-300 px-4 py-2">0.4000</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">0.2</td>
              <td className="border border-gray-300 px-4 py-2">1.7700</td>
              <td className="border border-gray-300 px-4 py-2">0.9600</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">0.3</td>
              <td className="border border-gray-300 px-4 py-2">2.4930</td>
              <td className="border border-gray-300 px-4 py-2">1.7640</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SystemODEs;
