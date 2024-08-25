import { useDashboardStore } from "src/store/dashboardStore";
import { Widgets } from "src/components/Widgets";

const Dashboard = () => {
  const { categories, addWidget, updateWidget, removeWidget } =
    useDashboardStore();

  return (
    <div
      style={{
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <input
        style={{
          alignSelf: "flex-end",
          width: "300px",
          padding: "10px",
          borderRadius: "200px",
          paddingLeft: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderWidth: "1px",
        }}
      />
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
