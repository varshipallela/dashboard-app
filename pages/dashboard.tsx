import { useEffect, useState } from "react";
import { DashboardData, Category, Widget } from "../src/types/dashboard.t";
import { useDashboardStore } from "src/store/dashboardStore";
import { DoughnutChart } from "src/components/DoughnutChart";
interface DashboardProps {
  initialData: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  const [data, setData] = useState<DashboardData>(initialData);
  const { categories, setCategories } = useDashboardStore();

  return (
    <div>
      <DoughnutChart widgets={categories[0].widgets} />
      <DoughnutChart widgets={categories[1].widgets} />
    </div>
  );
};

export default Dashboard;
