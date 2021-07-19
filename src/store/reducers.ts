
import { reducer as weatherReducer } from '../Features/Weather/reducer';
import metricFields from './reducers/MetricFields';
import metricMeasurements from './reducers/MetricMeasurements';
export default {
  weather: weatherReducer,
  metricFields,
  metricMeasurements
};
