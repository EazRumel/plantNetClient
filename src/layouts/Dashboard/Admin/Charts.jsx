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

  // console.log("STAT DATA:", statData);

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

  // console.log("CHART DATA:", chartData);

  return (
  
    <div className="my-10 mx-10" style={{ width: "60%", height: "500px" }}>

      <ResponsiveContainer width="100%" height="90%">

        <ComposedChart
          data={chartData}
          margin={{
            top: 10,
            right: 40,
            left: 10,
            bottom: 60
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="value" fill="#22c55e" barSize={100}/>

          <Line
            type="monotone"
            dataKey="value"
            fill="#22c55e"
          />

        </ComposedChart>

      </ResponsiveContainer>

    </div>
  );
};

export default Charts;