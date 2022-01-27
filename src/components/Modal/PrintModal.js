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

export default function PrintModal(props) {

  const classes = useStyles();
  const { watch,  handleSubmit, control } = useForm();
  

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  

  const vendor = [{ title: "Dental.A 치과기공소" }, { title: "거래처명" }, { title: "거래처명2" }];
  const dash1 = [ { title: "시간별완성현황" }, { title: "일생산현황" }, { title: "치과매출현황" }, { title: "파트별매출현황" }, { title: "치과별월매출현황" },{ title: "월생산현황표" }];

  useEffect( () => {
      
  console.log("렌더링");
  }, []);

  // const onSubmit = (data) => {
  //   axios
  //     .post("http://localhost:8000/api/report/",{
  //       receipt_date: "2022-01-01",
  //       completion_date: "2022-01-15",
  //       vendor_id: 1,
  //       day: "day"
  //     })
  //     .then((result) => {
  //       console.log(result);
        
  //       })
  //     .catch((error) => {
  //       throw new Error(error);
  //   })
    
  // }

  const [vendorName, setVendorName] = useState('');
  const [type, setType] = useState('');


  const onSubmit = (data) => {

    console.log(data);
    console.log(vendorName);
    console.log(type);

    // axios({
    //   method:"POST",
    //   url:"http://localhost:8000/api/sell/report/",
    //   responseType: 'blob',
    //   data:{
    //     receipt_date: "2022-01-15",
    //     completion_date: "2022-01-22",
    //     vendor_id: 1,
    //     day: "day"
    //   }

    // })
    //   // .post("http://localhost:8000/api/sell/report/",{
    //   //   receipt_date: "2022-01-15",
    //   //   completion_date: "2022-01-22",
    //   //   vendor_id: 1,
    //   //   day: "day"
    //   // })
    //   .then((result) => {
    //     console.log(result);
    //     // var BOM = new Uint8Array([0xEF,0xBB,0xBF]);
    //     // const file = new Blob([BOM,result.data], { type: "application/pdf;charset=utf-18" });
    //     // // const file = new Blob(["\ufeff"+result.data], { type: "application/pdf;charset=utf-8" });
    //     // //Build a URL from the file
    //     // const fileURL = URL.createObjectURL(file);
        
    //     // //Open the URL on new Window
    //     //  const pdfWindow = window.open();
    //     //  pdfWindow.location.href = fileURL;    
        
    //     var b = new Blob([result.data],{type:"application/pdf;"});
    //     var url = URL.createObjectURL(b);
    //     window.open(url,"_blank","");

    //     })
    //   .catch((error) => {
    //     throw new Error(error);
    // })
    
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
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="시작일자"
                      type="date"
                      className={classes.textField}
                      onChange={onChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              <Controller
                name="endDate"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="종료일자"
                    type="date"

                    className={classes.textField}
                    onChange={onChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              
              <Autocomplete
                className={classes.textField}
                name="ab"
                options={vendor}
                getOptionLabel={(option) => option.title}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="거래처선택" variant="outlined" />}
                onChange={(event, newValue) => {
                  console.log(newValue.title);
                  setVendorName(newValue.title);

                }}
              />
              <Autocomplete
                className={classes.textField}
                name="aa"
                options={dash1}
                getOptionLabel={(option) => option.title}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="항목선택" variant="outlined" />}
                onChange={(event, newValue) => {
                  //setType(newValue.title);
                }}
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
