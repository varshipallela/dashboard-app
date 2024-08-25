import { Widget } from "src/types/dashboard.t";
import { DoughnutChart } from "./DoughnutChart";

export interface ChartProps {
  type?: "dought" | "gie";
  widget: Widget;
}

export function Chart({ type = "dought", widget }: ChartProps) {
  if (type === "dought") {
    return <DoughnutChart widget={widget} />;
  }
  return <div>h</div>;
}
