import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * Props
 * ─────────────────────────────────────
 * labels : string[]   – x‑axis (e.g. short URLs)
 * data   : number[]   – y‑axis (click counts)
 */
const ClicksBarChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data,
        borderRadius: 6,
        backgroundColor: (ctx) => {
          // blue‑500 → purple‑500 gradient per‑bar
          const { chart } = ctx;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return '#3b82f6';
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          grad.addColorStop(0, '#3b82f6');  // blue
          grad.addColorStop(1, '#8b5cf6');  // purple
          return grad;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1b4b', // slate‑900
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: { color: '#475569' }, // slate‑600
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#475569', precision: 0 },
        grid: { color: '#e2e8f0', borderDash: [4, 4] },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow backdrop-blur-sm h-[400px]">
      <h3 className="mb-4 text-lg font-semibold text-blue-600">
        Clicks per Short URL
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ClicksBarChart;
