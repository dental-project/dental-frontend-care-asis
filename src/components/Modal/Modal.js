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

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  

  console.log(props);



  const { watch,  handleSubmit, control } = useForm();
  const onSubmit = (data) => {
  
    if(props.type === "part") {
      props.registerType === "add" ? 
        axios
        .post("http://localhost:8000/api/code/part/",{
          part_name: data.partName
        })
        .then((result) => {
          console.log(result);
          alert("파트명 추가를 완료 하였습니다.");
          })
        .catch((error) => {
          throw new Error(error);
        })
      : 
        axios
        .patch("http://localhost:8000/api/code/part/" + props.rowSeqId + "/",{
          part_name: data.partName
        })
        .then((result) => {
          console.log(result);
          })
        .catch((error) => {
          throw new Error(error);
        });
    }
    

  
  }

  const Part = () => (
    <>
      <DialogContent>
        <DialogContentText>
          파트 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="partName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.textField} 
                label="파트명"
                variant="outlined"
                value={props.rowValue}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ 
              required: "파트명을 입력하세요."
            }}
          />
          <Button
            type="submit"
            //className={classes.button} 
            color="info" 
            round
          >{props.modalType}
          </Button>
              
      </form>
          <Button
            //className={classes.button} 
            color="info" 
            round
            onClick={props.close}
          >취소
          </Button>    
       {/* <Autocomplete
          id="filter-demo"
          options={aaa}
          getOptionLabel={(option) => option.title}
          filterOptions={filterOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
        /> */}

      </DialogContent>
      <DialogActions>
        {/* <Button onClick={props.close} variant="contained" color="secondary">취소</Button> */}
        {/* <Button onClick={handleSubmit} variant="contained" color="primary">추가</Button> */}
      </DialogActions>
    </>
  )

  const Update = () => (
    <>
      <DialogContent>
        <DialogContentText>
          수정 하시겠습니까?
        </DialogContentText>
          <form onSubmit={onSubmit(onSubmit)}>
            <Controller
              name="partName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  className={classes.textField} 
                  label="파트명"
                  variant="outlined"
                  //value={props.rowSeqId}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ 
                required: "파트명을 입력하세요."
              }}
            />
            <Button
              type="submit"
              //className={classes.button} 
              color="info" 
              round
            >추가
            </Button>
            <Button
              //className={classes.button} 
              color="info" 
              round
              onClick={props.close}
            >취소
            </Button>        
        </form>
      </DialogContent>
    </>
  )

  const Delete = () => (
    <>
      <DialogContent>
          <DialogContentText>
              삭제 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} variant="contained" color="secondary">
                취소
            </Button>
            <Button type="submit"variant="contained" color="primary">
                확인
            </Button>
        </DialogActions>
    </>
  )

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.partModalType}</DialogTitle>
        {
          props.type === "part"  
          ? <Part /> 
          : null 
        }
        {
          props.type === "수정"
          ? <Update />
          : null
        }
        {
          props.type === "삭제"
          ? <Delete />
          : null
        }
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
