import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { arrColors } from '../utils/constants';

var moment = require('moment');

const formatXAxis = tickItem => moment(parseInt(tickItem)).format('LT');

const getMultipleMeasurement = state => state.metricMeasurements.getMultipleMeasurements;

const formatDataToChartFormat = getMultipleMeasurements => {
  let data = getMultipleMeasurements.getMultipleMeasurements;
  if (data.length === 0) {
    return [];
  }
  let metric_length = data[0].measurements.length;
  let data_chart_format = [];

  for (let index = 0; index < metric_length; index++) {
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[data[j].measurements[index].metric] = data[j].measurements[index].value;
      obj['name'] = data[j].measurements[index].at;
    }
    data_chart_format.push(obj);
  }
  return data_chart_format;
};

const Chart = props => {
  const getMultipleMeasurements = useSelector(getMultipleMeasurement);

  let data_list = [];
  if (getMultipleMeasurements.length !== 0) {
    data_list = formatDataToChartFormat(getMultipleMeasurements);
  }

  if (props.command.value.length === 0) {
    return <div> No Chart Data Available</div>;
  }
  if (data_list.length === 0) {
    return <div>No Chart Data Available</div>;
  }

  return (
    <div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data_list}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" allowDataOverflow={true} tickFormatter={formatXAxis} />
          <YAxis domain={['auto', 'auto']} scale="linear" padding={{ top: 10, bottom: 10 }} tickCount={10} />
          <Tooltip />
          <Legend />
          {props.command.value &&
            props.command.value.map((data, i) => <Line type="monotone" dataKey={data} stroke={arrColors[i]} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
