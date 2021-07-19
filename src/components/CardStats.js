import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { arrColors } from '../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    color: '#ffffff',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

const getNewMeasurementData = state => state.metricMeasurements.getMultipleMeasurements;

const CardStats = props => {
  const classes = useStyles();
  const getNewMeasurementDatas = useSelector(getNewMeasurementData);
  let list = getNewMeasurementDatas.getMultipleMeasurements;
  let displayUnit = '';
  for (let index = 0; index < list.length; index++) {
    let data = list[index].measurements.slice(-1)[0];
    if (props.value === data.metric) {
      displayUnit = data;
    }
  }

  return (
    <Card className={classes.root} style={{ backgroundColor: `${arrColors[props.index]}` }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${displayUnit.value}  ${displayUnit.unit}`}
          </Typography>
          <Typography variant="subtitle1">{displayUnit.metric}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CardStats;
