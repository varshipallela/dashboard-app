import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Widget } from "src/types/dashboard.t";
import { getRandomColors } from "./PieChart";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export const BarChart = ({ widget }: { widget: Widget }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Bar
      data={{
        labels: Object.keys(widget.data),
        datasets: [
          {
            label: widget.title,
            data: Object.values(widget.data),
            backgroundColor: getRandomColors(Object.keys(widget.data).length),
            borderColor: getRandomColors(Object.keys(widget.data).length),
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
};
