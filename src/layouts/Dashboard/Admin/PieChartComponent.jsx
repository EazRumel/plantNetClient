import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = ({ categoryStats }) => {

  console.log("DATA:", categoryStats);
  console.log("IS ARRAY:", Array.isArray(categoryStats));

  return (
    <div className="w-[400px] h-[350px] flex justify-center items-center">

      <PieChart width={400} height={350}>

        <Pie
          data={categoryStats}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          outerRadius={110}
          label
        >
          {categoryStats.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>
  );
};

export default PieChartComponent;