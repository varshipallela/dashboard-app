import { useDashboardStore } from "src/store/dashboardStore";
import { Widgets } from "src/components/Widgets";

const Dashboard = () => {
  const { categories, addWidget, updateWidget, removeWidget } =
    useDashboardStore();

  return (
    <div>
      {categories?.map((category) => (
        <Widgets
          widgets={category.widgets}
          onAddWidget={(widget) => addWidget(category.id, widget)}
          key={category.id}
          onUpdateWidget={(widget) =>
            updateWidget(category.id, widget.id, widget)
          }
          removeWidget={(widgetId) => removeWidget(category.id, widgetId)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
