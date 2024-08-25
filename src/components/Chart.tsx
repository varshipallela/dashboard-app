import { Widget } from "src/types/dashboard.t";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart } from "./PieChart";

export interface ChartProps {
  type?: "dought" | "pie";
  widget: Widget;
}

export function Chart({ type = "dought", widget }: ChartProps) {
  if (type === "dought") {
    return <DoughnutChart widget={widget} />;
  }
  return <PieChart widget={widget} />;
}
