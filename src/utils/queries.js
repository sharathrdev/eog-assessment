const current_time = new Date().valueOf();

// Query: Get metric fields for drop down
export const query_metric = `
  query {
    getMetrics
}`;

// Get multiple mesaurements data
export const query_multiple_measurements = `
  query($input: [MeasurementQuery] = [
    {metricName: "tubingPressure", after: ${current_time - 1800000}, before: ${current_time}},
    {metricName: "casingPressure", after: ${current_time - 1800000}, before: ${current_time}},
    {metricName: "oilTemp", after: ${current_time - 1800000}, before: ${current_time}},
    {metricName: "flareTemp", after: ${current_time - 1800000}, before: ${current_time}},
    {metricName: "waterTemp", after: ${current_time - 1800000}, before: ${current_time}},
    {metricName: "injValveOpen", after: ${current_time - 1800000}, before: ${current_time}}
  ]
  ){
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
       at
       value
       metric
       unit
      }
    }
}`;

// Subscription query to get the data
export const metric_Subscription_Query = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;
