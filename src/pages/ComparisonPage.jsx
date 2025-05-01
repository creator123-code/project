import { MathJax } from 'better-react-mathjax';

function ComparisonPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">
        Comparison of Numerical Methods
      </h1>

      {/* Introduction */}
      <section className="mb-8">
        <p className="text-lg leading-relaxed text-gray-700">
          This table summarizes and compares the key characteristics of different numerical methods used for solving first-order ordinary differential equations (ODEs).
        </p>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center rounded-lg shadow-lg">
            <thead className="bg-blue-100">
              <tr className="text-gray-800 font-semibold">
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <th className="border border-gray-300 px-4 py-2">Order of Accuracy</th>
                <th className="border border-gray-300 px-4 py-2">Number of Slopes</th>
                <th className="border border-gray-300 px-4 py-2">Error Behavior</th>
                <th className="border border-gray-300 px-4 py-2">Complexity</th>
                <th className="border border-gray-300 px-4 py-2">Stability</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Euler's Method</td>
                <td className="border border-gray-300 px-4 py-2">First Order</td>
                <td className="border border-gray-300 px-4 py-2">1 (initial slope)</td>
                <td className="border border-gray-300 px-4 py-2">Large unless very small h</td>
                <td className="border border-gray-300 px-4 py-2">Very simple</td>
                <td className="border border-gray-300 px-4 py-2">Low stability</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Heun's Method</td>
                <td className="border border-gray-300 px-4 py-2">Second Order</td>
                <td className="border border-gray-300 px-4 py-2">2 (initial and corrected slopes)</td>
                <td className="border border-gray-300 px-4 py-2">Smaller error than Euler</td>
                <td className="border border-gray-300 px-4 py-2">Simple</td>
                <td className="border border-gray-300 px-4 py-2">Moderately stable</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">Midpoint Method</td>
                <td className="border border-gray-300 px-4 py-2">Second Order</td>
                <td className="border border-gray-300 px-4 py-2">2 (start and midpoint slopes)</td>
                <td className="border border-gray-300 px-4 py-2">Good accuracy</td>
                <td className="border border-gray-300 px-4 py-2">Simple</td>
                <td className="border border-gray-300 px-4 py-2">Good stability</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">RK2 Method</td>
                <td className="border border-gray-300 px-4 py-2">Second Order</td>
                <td className="border border-gray-300 px-4 py-2">2 (halfway slopes)</td>
                <td className="border border-gray-300 px-4 py-2">Good accuracy</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
                <td className="border border-gray-300 px-4 py-2">Good stability</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">RK4 Method</td>
                <td className="border border-gray-300 px-4 py-2">Fourth Order</td>
                <td className="border border-gray-300 px-4 py-2">4 (k₁, k₂, k₃, k₄ slopes)</td>
                <td className="border border-gray-300 px-4 py-2">Very small error</td>
                <td className="border border-gray-300 px-4 py-2">Moderate (more calculations)</td>
                <td className="border border-gray-300 px-4 py-2">Very high stability</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Analysis */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          As the order of the method increases, the accuracy improves significantly, allowing for larger step sizes without a dramatic loss of precision.
          However, higher-order methods like RK4 involve more computations per step.
          Simple methods like Euler's are useful for quick approximations but require very small step sizes to achieve good accuracy.
          Methods like Heun's, Midpoint, and RK2 balance better between simplicity and precision, while RK4 is preferred when high accuracy is crucial.
        </p>
      </section>
    </div>
  );
}

export default ComparisonPage;
