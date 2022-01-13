import React, { useEffect, useState } from 'react';
//import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.js";
// redux
import { connect } from 'react-redux';

import { useForm, Controller } from "react-hook-form";

// api
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "95%",
    margin: theme.spacing(1),
    '& label.Mui-focused': {
        color: '#00acc1',
    },
    '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
            borderColor: '#00acc1',
        },
    },
  },
  inputs: {
    '& label.Mui-focused': {
      color: '#26c6da',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#26c6da',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#26c6da',
      },
    },
  },
  button: {
    width: "100%"
  }
}));

export default function DashModal(props) {

  const classes = useStyles();
  const { watch,  handleSubmit, control } = useForm();
  

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  

  const dash1 = [ { title: "시간별완성현황" }, { title: "일생산현황" }, { title: "치과매출현황" }, { title: "파트별매출현황" }, { title: "치과별월매출현황" },{ title: "월생산현황표" }];
              

  useEffect( () => {
      
  }, []);

  console.log(props);
  
  const onSubmit = (data) => {
  
    
  }



  const Dashboard = () => (
    <>
      <DialogContent>
        <DialogContentText>
          접수 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          { 
            props.modalType === "삭제"
            ? null
            : (
              <>
                <TextField
                  id="date"
                  label="시작일자"
                  type="date"
                  defaultValue="2022-01-11"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="종료일자"
                  type="date"
                  defaultValue="2022-01-11"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash1}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="항목선택" variant="outlined" />}
                />
              </>
            )
          }
          <Button
            type="submit"
            className={classes.button} 
            color="info" 
            round
          >다운
          </Button> 
        </form>
          <Button
            className={classes.button} 
            color="danger" 
            round
            onClick={props.close}
          >취소
          </Button>
      </DialogContent>
    </>
  )

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.partModalType}</DialogTitle>
        <Dashboard />
      </Dialog>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     dashboard: state
//   }
// }

// export default connect(
//   mapStateToProps
// )(DashModal)
