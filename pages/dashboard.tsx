import { useDashboardStore } from "src/store/dashboardStore";
import { Widgets } from "src/components/Widgets";
import { useState, useEffect } from "react";
import { Category } from "src/types/dashboard.t";

const Dashboard = () => {
  const { categories, addWidget, updateWidget, removeWidget } =
    useDashboardStore();
  const [searchText, setSearchText] = useState("");
  const [filterCategories, setFilterCategories] =
    useState<Category[]>(categories);

  useEffect(() => {
    setFilterCategories(
      categories.map((category) => ({
        ...category,
        widgets: category.widgets.filter((widget) =>
          widget.title.toLowerCase().includes(searchText.toLowerCase())
        ),
      }))
    );
  }, [searchText, categories]);

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
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
      {filterCategories?.map((category) => (
        <div key={category.name}>
          <h2>{category.name}</h2>
          <Widgets
            widgets={category.widgets}
            onAddWidget={(widget) => addWidget(category.id, widget)}
            onUpdateWidget={(widget) =>
              updateWidget(category.id, widget.id, widget)
            }
            removeWidget={(widgetId) => removeWidget(category.id, widgetId)}
            type={category.type}
          />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
