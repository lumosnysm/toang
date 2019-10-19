import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const color_data = props.nodes_array.map(n=>props.calColor(n.aqius))
  let final_data = [].concat(color_data.filter(x => x==='green').length)
    .concat(color_data.filter(x => x==='yellow').length)
    .concat(color_data.filter(x => x==='orange').length)
    .concat(color_data.filter(x => x==='red').length)
    .concat(color_data.filter(x => x==='purple').length)

  const data = {
    datasets: [
      {
        data: final_data,
        backgroundColor: [
          'green', 'yellow', 'orange', 'red', 'purple'
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['good', 'moderate', 'unhealthy', 'unhealthy++', 'very unhealthy']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };


  console.log(final_data)

  const devices = [
    {
      title: '',
      value: final_data[0]/props.nodes_array.length *100 || 0,
      color: 'green'
    },
    {
      title: '',
      value: final_data[1]/props.nodes_array.length *100 || 0,
      color: 'yellow'
    },
    {
      title: '',
      value: final_data[2]/props.nodes_array.length *100 || 0,
      color: 'orange'
    },
    {
      title: '',
      value: final_data[3]/props.nodes_array.length *100 || 0,
      color: 'red'
    },
    {
      title: '',
      value: final_data[4]/props.nodes_array.length *100 || 0,
      color: 'purple'
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Total Node"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
