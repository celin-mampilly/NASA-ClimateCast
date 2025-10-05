import React from 'react';
import { Bar } from 'react-chartjs-2'; // <-- CHANGED TO BAR
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, 
  BarElement, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, 
  BarElement, 
  Title,
  Tooltip,
  Legend
);

const ClimateChart = ({ chartData }) => {
  
  // CRITICAL FIX: Check if chartData or the core average field is null/undefined.
  if (!chartData || chartData.avg_temp === undefined) {
    return <div style={{ color: '#ccc', textAlign: 'center', padding: '50px' }}>Historical data is not available.</div>;
  }

  // --- 1. Prepare Data for Bar Chart ---
  
  // We use the optional chaining operator (|| 0) to ensure a number is always available, 
  // preventing the "Cannot read properties of undefined" crash.
  const avgTemp = parseFloat(chartData.avg_temp) || 0;
  const minTemp = parseFloat(chartData.min_temp) || avgTemp - 2; // Use a fallback if Min is undefined
  const maxTemp = parseFloat(chartData.max_temp) || avgTemp + 2; // Use a fallback if Max is undefined


  const data = {
    labels: ['Historical Temperature Range'],
    datasets: [
      { 
        // Note: Removed 'type: line' to let the component default to Bar
        label: 'Minimum (°C)', 
        data: [minTemp], 
        backgroundColor: 'rgba(54, 162, 235, 0.8)', // Primary Blue 
      },
      { 
        label: 'Average (°C)', 
        data: [avgTemp], 
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Green 
      },
      { 
        label: 'Maximum (°C)', 
        data: [maxTemp], 
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Accent Red 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: '#fff' }
      },
      title: { 
        display: true, 
        text: 'Temperature Range (°C) Across Historical Records',
        color: '#fff',
        font: { size: 16 }
      }
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
      },
      y: {
        beginAtZero: false,
        min: 15, // Ensure axis scale is stable
        max: 40, 
        title: { display: true, text: 'Temperature (°C)', color: '#ccc' },
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
      }
    }
  };
  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Bar options={options} data={data} /> {/* <-- RENDER BAR COMPONENT */}
    </div>
  );
};

export default ClimateChart;
