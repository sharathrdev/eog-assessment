import React, { useEffect } from 'react';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardStats from './CardStats';
import MultiSelect from './MultiSelect';
import Chart from './Charts';
import { query_metric, query_multiple_measurements, metric_Subscription_Query } from '../utils/queries';
import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '10px',
  },
  paper: {
    padding: '0 10px 10px',
    color: theme.palette.text.secondary,
    width: '45%',
    marginBottom: '10px',
  },
  chartContainer: {
    padding: '10px',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  cardContainer: {
    marginBottom: '10px',
  },
  item: {
    marginBottom: '10px',
  },
  circularProgress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

const FetchMetricList = () => {
  let query = query_metric;
  const dispatch = useDispatch();
  let [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.GET_METRIC_LIST_API_FAIL, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }

    dispatch({ type: actions.GET_METRIC_LIST_RESPONSE, getMetrics: data.getMetrics });
  }, [dispatch, data, error, fetching]);
};

const getMetric = state => {
  const getMetrics = state.metricFields.getMetrics;
  return getMetrics;
};

const FetchMultipleMeasurements = () => {
  const dispatch = useDispatch();
  let [result] = useQuery({
    query: query_multiple_measurements,
    variable: [],
  });
  const { data, error, fetching } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.GET_MEASUREMENTS_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const getMultipleMeasurements = data;

    dispatch({
      type: actions.GET_METRICS_MEASUREMENTS_RESPONSE,
      getMultipleMeasurements,
    });
  }, [dispatch, data, error, fetching]);
};

const FetchNewMeasurementData = state => {
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: metric_Subscription_Query,
    variables: {},
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.UPDATE_MEASUREMENTS_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }
    const newMeasurementData = data;
    if (state.switch === true)
      dispatch({
        type: actions.UPDATE_METRIC_MEASUREMENTS_RESPONSE,
        newMeasurementData,
      });
  }, [data, error, dispatch, state]);
};

const MetricData = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    switch: true,
    value: [],
  });
  FetchMetricList();
  FetchMultipleMeasurements();
  FetchNewMeasurementData(state);
  const getMetrics = useSelector(getMetric);

  if (getMetrics.length === 0)
    return (
      <div className={classes.circularProgress}>
        <CircularProgress />
      </div>
    );

  const handleSelectionChange = event => {
    setState({ ...state, value: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {' '}
            <MultiSelect
              getMetrics={getMetrics}
              handleSelectionChange={handleSelectionChange}
              values={state.value}
            />{' '}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.cardContainer}>
        {state.value.length > 0 &&
          state.value.map((data, i) => (
            <Grid item xs={2}>
              {' '}
              <CardStats value={data} index={i} />{' '}
            </Grid>
          ))}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {state.value.length > 0 && (
            <Paper className={classes.chartContainer}>
              <Chart command={state} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MetricData;
