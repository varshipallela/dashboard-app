import { create } from "zustand";
import { Category, DashboardData, Widget } from "../types/dashboard.t";

interface DashboardStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addWidget: (categoryId: number, widget: Widget) => void;
  removeWidget: (categoryId: number, widgetId: string) => void;
  updateWidget: (categoryId: number, widgetId: string, widget: Widget) => void;
}

export const data: DashboardData = {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      type: "doughnut",
      widgets: [
        {
          id: "cloud-accounts",
          title: "Cloud Accounts",
          data: {
            connected: 5,
            "not connected": 2,
            pending: 1,
          },
        },
        {
          id: "on-premise-servers",
          title: "On-Premise Servers",
          data: {
            active: 10,
            inactive: 3,
            maintenance: 2,
          },
        },
        {
          id: "network-devices",
          title: "Network Devices",
          data: {
            online: 8,
            offline: 4,
            error: 1,
          },
        },
        {
          id: "databases",
          title: "Databases",
          data: {
            operational: 7,
            backup: 5,
            archived: 2,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Security Dashboard",
      type: "pie",
      widgets: [
        {
          id: "vulnerabilities",
          title: "Vulnerabilities",
          data: {
            critical: 4,
            high: 8,
            medium: 15,
            low: 20,
          },
        },
        {
          id: "threats",
          title: "Threats",
          data: {
            active: 5,
            mitigated: 10,
            resolved: 7,
          },
        },
        {
          id: "incidents",
          title: "Incidents",
          data: {
            open: 3,
            closed: 9,
            inProgress: 2,
          },
        },
        {
          id: "compliance",
          title: "Compliance",
          data: {
            passed: 12,
            failed: 3,
            notAssessed: 5,
          },
        },
      ],
    },
  ],
};

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
  updateWidget: (categoryId, widgetId, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.map((_widget) =>
                widget.id === widgetId ? widget : _widget
              ),
            }
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
