import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

const Charts = ({statData}) => {

  console.log(statData);
  return (
    <div>
      <ComposedChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={[statData]}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="totalRevenue" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} scale="band" />
      <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} width="auto" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="amt" />
      <Bar dataKey="pv" barSize={20} />
      <Line type="monotone" dataKey="uv" />

    </ComposedChart>
    </div>
  );
};

export default Charts;