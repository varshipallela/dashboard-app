import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Widget } from "src/types/dashboard.t";
import { getRandomColors } from "./PieChart";

ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export const LineChart = ({ widget }: { widget: Widget }) => {
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
    <Line
      data={{
        labels: Object.keys(widget.data),
        datasets: [
          {
            label: widget.title,
            data: Object.values(widget.data),
            backgroundColor: getRandomColors(Object.keys(widget.data).length),
            borderColor: getRandomColors(Object.keys(widget.data).length),
            borderWidth: 2,
            fill: false,
          },
        ],
      }}
      options={options}
    />
  );
};
