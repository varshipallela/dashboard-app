// src/components/DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Widget } from "src/types/dashboard.t";
import { Card } from "./Card";
import { Dialog } from "./Dialog";

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

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

export const DoughnutChart = ({ widgets }: { widgets: Widget[] }) => {
  const [open, setOpen] = React.useState(false);
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", // Adjusted to fit 3 cards on a laptop screen
        gap: "20px", // Adjust this to set the desired gap between cards
        width: "100%", // Ensure the grid takes up the full width of the container
      }}
    >
      {widgets?.map((widget, i) => (
        <Card key={i} title={widget.title} isGraph>
          <Doughnut
            data={{
              labels: Object.keys(widget.data),
              datasets: [
                {
                  label: widget.title,
                  data: Object.values(widget.data),
                  backgroundColor: getRandomColors(
                    Object.keys(widget.data).length
                  ),
                  borderColor: getRandomColors(Object.keys(widget.data).length),
                  borderWidth: 1,
                },
              ],
            }}
            options={options}
          />
        </Card>
      ))}
      <Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <button>Open Dialog</button>
          </Dialog.Trigger>
          <Dialog.Content>
            <h1>Dialog Content</h1>
            <p>This content is only visible when the dialog is open.</p>
            <Dialog.Close>
              <button onClick={() => console.log("close")}>Close Dialog</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog>
      </Card>
    </div>
  );
};
