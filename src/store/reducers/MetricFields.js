import * as actionTypes from '../actions';
const initialState = {
  getMetrics: [],
  isAPICallFailed: false,
};

const metricFieldReducer = (state = initialState, action) => {
  const { type, getMetrics } = action;
  switch (type) {
    case actionTypes.GET_METRIC_LIST_RESPONSE:
      return { ...state, getMetrics };
    case actionTypes.GET_METRIC_LIST_API_FAIL:
      return { ...state, isAPICallFailed: true };
    default:
      return state;
  }
};

export default metricFieldReducer;
