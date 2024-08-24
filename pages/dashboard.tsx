import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { DashboardData, Category, Widget } from "../src/types/dashboard.t";
import { useDashboardStore } from "src/store/dashboardStore";
import { data } from "src/data/index";
interface DashboardProps {
  initialData: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  const [data, setData] = useState<DashboardData>(initialData);
  const { categories, setCategories } = useDashboardStore();

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  const addWidget = (categoryId: number) => {
    const widgetName = prompt("Enter widget name:");
    const widgetContent = prompt("Enter widget content:");
    const newWidget: Widget = {
      id: Date.now(),
      name: widgetName || "Untitled Widget",
      content: widgetContent || "No content provided",
    };

    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      ),
    }));
  };

  const removeWidget = (categoryId: number, widgetId: number) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    }));
  };

  return (
    <div>
      {data.categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <button onClick={() => addWidget(category.id)}>+ Add Widget</button>
          <div>
            {category.widgets.map((widget) => (
              <div
                key={widget.id}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                <h3>{widget.name}</h3>
                <p>{widget.content}</p>
                <button onClick={() => removeWidget(category.id, widget.id)}>
                  Remove Widget
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      initialData: data as DashboardData,
    },
  };
};

export default Dashboard;
