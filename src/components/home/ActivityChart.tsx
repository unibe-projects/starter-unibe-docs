import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ActivityChart = ({ data }: { data: any }) => {
  return (
    <div className="chart-container mx-auto" style={{ maxWidth: '800px' }}>
      <Line data={data} />
    </div>
  );
};

export default ActivityChart;
