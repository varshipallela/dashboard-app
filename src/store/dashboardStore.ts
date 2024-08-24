import { create } from "zustand";
import { DashboardData, Category, Widget } from "../types/dashboard.t";
import { data } from "src/data";

interface DashboardStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addWidget: (categoryId: number, widget: Widget) => void;
  removeWidget: (categoryId: number, widgetId: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  categories: data.categories,
  setCategories: (categories) => set({ categories }),
  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category
      ),
    })),
  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    })),
}));
