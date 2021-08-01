import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      "& .MuiTableCell-root":{
        padding:"5px"
      }
    }
  }
}));

export default function CheckDialog(props) {
  const classes = useStyles()
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        className={classes.root}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"请确认选手缓冲时间超时"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {"请检查清楚才点击“确认”，一旦提交就无法再做修改，也无法重新提交。"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={props.submit} color="primary" autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
