import { Widget } from "src/types/dashboard.t";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart } from "./PieChart";
import { ChartType } from "chart.js";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

export interface ChartProps {
  type?: ChartType;
  widget: Widget;
}

export function Chart({ type = "doughnut", widget }: ChartProps) {
  if (type === "doughnut") {
    return <DoughnutChart widget={widget} />;
  }
  if (type === "bar") {
    return <BarChart widget={widget} />;
  }
  if (type === "line") {
    return <LineChart widget={widget} />;
  }
  return <PieChart widget={widget} />;
}
