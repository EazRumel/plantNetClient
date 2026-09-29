import {
  Pie,
  PieChart as RechartsPieChart,
  
  Tooltip,

} from "recharts";








const PieChart = ({ categoryStats }) => {

  const category = [
    {
      name:"Herb",
    value:categoryStats[0]?.value
    }
  ]
  console.log(category);

//   const categoryStats = [

//   { name: "Herb", value: 1 },

//   { name: "Succulent", value: 3 },

//   { name: "Indoor", value: 4 },

// ];
  return (
    <RechartsPieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={true}
        shape={MyCustomPie}
      />

      <Tooltip />
    </RechartsPieChart>
  );
};

export default PieChart;