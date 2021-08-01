import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    "& .MuiPaper-root": {
      backgroundColor:"transparent"
    },
    [theme.breakpoints.down('md')]: {
      "& .MuiStepper-root": {
        padding:"0"
      },
      "& .MuiTypography-body2":{
        fontSize:"3vw"
      },
      "& .MuiStep-horizontal":{
        paddingLeft: "4px",
        paddingRight: "8px"
    }
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['分数票', '印象票', '最佳辩手候选','总结票','最佳辩手'];
}


export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const activeStep = props.step;
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
