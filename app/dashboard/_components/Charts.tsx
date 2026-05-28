"use client";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const Charts = ({
  revenueData,
  pieData,
}: {
  revenueData: { name: string; value: number }[];
  pieData: { name: string; value: number }[];
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-zinc-900 p-4 rounded-2xl col-span-2">
        <h2 className="mb-4 font-semibold">Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" label />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 p-4 rounded-2xl">
        <h2 className="mb-4 font-semibold">Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              // label={({ name, value }) => `${name}: $${value}`}
              label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
              labelLine={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
