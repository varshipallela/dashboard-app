import { ChartType } from "chart.js";

export interface Widget {
  id: string;
  title: string;
  data: Record<string, number>;
}

export interface Category {
  id: number;
  name: string;
  type: ChartType;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}
