export interface Widget {
  id: number;
  name: string;
  content: string;
}

export interface Category {
  id: number;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}
