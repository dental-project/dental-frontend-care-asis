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
  





  const { watch,  handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios
    .post("http://localhost:8000/api/code/part/",{
      part_name: data.partName
    })
    .then((result) => {
       console.log(result);
      })
    .catch((error) => {
      throw new Error(error);
    });

//  axios
//     .patch("http://localhost:8000/api/code/part/12/",{
//       part_name: data.partName
//     })
//     .then((result) => {
//        console.log(result);
//       })
//     .catch((error) => {
//       throw new Error(error);
//     });

  }


  const DashAdd = () => (
    <>
      <DialogContent>
        <DialogContentText>
          파트 등록
        </DialogContentText>


        <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="partName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="User ID"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      
                    />
                  )}
                  rules={{ 
                    required: '아이디를 입력하세요.',
                    // validate: (data) => {
                    //   //console.log(data);
                      
                    // }
                  }}
                />
                <Button
                  type="submit"
                  //className={classes.button} 
                  color="info" 
                  round
                >
                  추가
                </Button>       
          </form>


        {/* <TextField
          className={classes.textField}
          name="userid"
          label="User ID"
          variant="outlined"
          //onChange={handleChange}
        /> */}
         


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

  const DashDelete = () => (
    <>
      <DialogContent>
          <DialogContentText>
              대시보드를 삭제 하시겠습니까?
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


 



  // const handleSubmit = (e) => {

  
  //   console.log(e);
  //   // e.preventDefault(); // 페
 
  //   // if(props.dashModalType === "대시보드 추가") {
  //   //   props.dispatch({ 
  //   //     type: 'dashboardAdd', 
  //   //     dashboardAdd: {
  //   //       id:inputs.dashboardName, 
  //   //       dashname: inputs.dashboardName,
  //   //       web: [],
  //   //       tablet: [],
  //   //       mobile: []
  //   //     }
  //   //   });
  //   //   props.setDashId(props.dashboard.length);
  //   //   alert("추가가 완료 되었습니다."); 
  //   // }
  //   // props.close();
  // }

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.partModalType}</DialogTitle>
        {
          props.partModalType === "추가" 
          ? <DashAdd />
          : <DashDelete />
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
