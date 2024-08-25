import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Widget } from "src/types/dashboard.t";

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColors(count: number) {
  return Array.from({ length: count }, () => getRandomColor());
}

export const DoughnutChart = ({ widget }: { widget: Widget }) => {
  const options = {
    plugins: {
      legend: {
        position: "right" as const,
        align: "center" as const,
        labels: {
          padding: 20,
        },
      },
    },
    layout: {
      padding: {
        left: 40,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Doughnut
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
