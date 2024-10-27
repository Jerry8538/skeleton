// components/ComponentAnalysis.js
'use client'
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ComponentAnalysis = () => {
  const [showComponents, setShowComponents] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Sample data for components (Replace with actual component names and data)
  const components = {
    ComponentA: [12, 15, 10, 18, 22, 30],
    ComponentB: [20, 18, 16, 24, 30, 35],
    ComponentC: [5, 7, 9, 13, 17, 20],
  };

  // Labels for the sessions on the x-axis
  const sessionLabels = ['Component 1', 'Component 2', 'Component 3', 'Component 4', 'Component 5', 'Component 6'];

  // Toggle to show/hide component buttons
  const toggleComponentButtons = () => setShowComponents(!showComponents);

  // Chart data and options based on selected component
  const chartData = {
    labels: sessionLabels,
    datasets: [
      {
        label: `Intensity of ${selectedComponent}`,
        data: components[selectedComponent],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Intensity of ${selectedComponent} over Sessions` },
    },
    scales: {
      y: { title: { display: true, text: 'Intensity' } },
      x: { title: { display: true, text: 'Sessions' } },
    },
  };

  return (
    <div className="p-4">
      {/* Main Button to show components */}
      <button onClick={toggleComponentButtons} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        select categories
      </button>

      {/* Render component buttons if showComponents is true */}
      {showComponents && (
       <div className="mt-4 space-y-2">
       {Object.keys(components).map((component) => (
         <div key={component}>
           <button
             onClick={() => setSelectedComponent(component)}
             className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-green-600"
           >
             {component}
           </button>
         </div>
       ))}
     </div>
      )}

      {/* Render chart if a component is selected */}
      {selectedComponent && (
  <div className="mt-8 flex justify-center items-center -mt-16" style={{ width: '700px', height: '500px', margin: '0 auto' }}>
    <Line data={chartData} options={chartOptions} /> 
  </div>
)}


    </div>
  );
};

export default ComponentAnalysis;
