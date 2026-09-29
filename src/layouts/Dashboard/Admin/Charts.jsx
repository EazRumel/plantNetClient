import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Charts = ({ statData }) => {

  const chartData = [
    {
      name: "Users",
      value: statData?.totalUser || 0
    },
    {
      name: "Plants",
      value: statData?.totalPlants || 0
    },
    {
      name: "Orders",
      value: statData?.totalOrder || 0
    },
    {
      name: "Revenue",
      value: statData?.totalRevenue || 0
    }
  ];

  return (
    <div className="w-[600px] h-[350px]">

      <ResponsiveContainer width="100%" height="100%">

        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="value"
            fill="#22c55e"
            barSize={50}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
          />

        </ComposedChart>

      </ResponsiveContainer>

    </div>
  );
};

export default Charts;