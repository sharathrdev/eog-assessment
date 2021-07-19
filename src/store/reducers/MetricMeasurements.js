import * as actionTypes from '../actions';
const initialState = {
  getMultipleMeasurements: [],
  isAPICallFailed: false,
};

const metricMeasurements = (state = initialState, action) => {
  const { type, getMultipleMeasurements } = action;

  switch (type) {
    case actionTypes.GET_METRICS_MEASUREMENTS_RESPONSE:
      return { ...state, getMultipleMeasurements };
    case actionTypes.UPDATE_METRIC_MEASUREMENTS_RESPONSE:
      if (state.getMultipleMeasurements.hasOwnProperty('getMultipleMeasurements')) {
        for (let i = 0; i < Object.keys(state.getMultipleMeasurements.getMultipleMeasurements).length; i++) {
          if (
            state.getMultipleMeasurements.getMultipleMeasurements[i].metric ===
            action.newMeasurementData.newMeasurement.metric
          ) {
            state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.push(
              action.newMeasurementData.newMeasurement,
            );
            state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.shift();
          }
        }
      }
      return state;
    case (actionTypes.GET_MEASUREMENTS_API_CALL_FAIL, actionTypes.UPDATE_MEASUREMENTS_API_CALL_FAIL):
      return { ...state, isAPICallFailed: true };
    default:
      return state;
  }
};

export default metricMeasurements;
