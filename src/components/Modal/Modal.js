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
  const [ autoCompleteData, setAutoCompleteData ] = useState([]);

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  


  const aaa = [
    { title: "Removale App" },
    { title: "Fixed App" },
    { title: "Functional App" },
    { title: "Splints" },
    { title: "Diagnostic Study Models" },
    { title: "Tooth Positioner" },
    { title: "Indirect Bonding System" },
    { title: "Distalizing" },
    { title: "Sample" },
    { title: "test" },
    { title: "test1" },
    { title: "ㄴㅇㅎㄴㅇㅎㄴㅇㅎ" }
  ];



  const bbb = [
    { title: "테스트 기공" },
    { title: "테스트 기공2" },
    { title: "테스트 기공3" },
    { title: "기공4 테스트" },
    { title: "asdasdasd" }
  ];



  useEffect( () => {
      axios
        .get("http://localhost:8000/api/code/part/")
        .then((result) => {

          //setAutoCompleteData(result.data.part_name);
          
          //setAutoCompleteData(result.data);
         
          console.log(result.data);

          //result.data.map( (data) => {title: data.part_name} )



          //const dataArr = result.data.map( (data) => data.part_name );          
          
          //dataArr.map( (data) => console.log( {title: data} ) );
          
          // console.log(autoData);
          //setAutoCompleteData(autoData);

          //const a = result.data.map( (data) => { title: data.part_name } );

          //console.log(a);



        })
        .catch((error) => {
          throw new Error(error);
        });
  }, []);

  //console.log(autoCompleteData);
  
  const onSubmit = (data) => {
  
    if(props.type === "part") {
      if(props.modalType === "추가") {
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
      } else if(props.modalType === "수정") {
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
      } else if(props.modalType === "삭제") {
        axios
        .delete("http://localhost:8000/api/code/part/" + props.rowSeqId + "/")
        .then((result) => {
          console.log(result);
          })
        .catch((error) => {
          throw new Error(error);
        });
      }
    }
  }

  const Part = () => (
    <>
      <DialogContent>
        <DialogContentText>
          파트명 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          { 
            props.modalType === "삭제"
            ? null
            : (
              <>
                <Controller
                  name="partName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="기공명"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "파트명을 입력하세요."
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
          >{props.modalType}
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
  
  const Item = () => (
    <>
      <DialogContent>
        <DialogContentText>
          종목 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          { 
            props.modalType === "삭제"
            ? null
            : (
              <>
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="파트명"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "기공명을 입력하세요."
                  }}
                />
              
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={aaa}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
              
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo1"
                  options={bbb}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="종목명" variant="outlined" />}
                />
                            
            </>
            )
          }


          <Button
            type="submit"
            className={classes.button} 
            color="info" 
            round
          >{props.modalType}
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

  const Delete = () => (
    <>
      <DialogContent>
          <DialogContentText>
              삭제 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleSubmit(onSubmit)}>
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
          props.type === "item"
          ? <Item />
          : null
        }
        {
          props.type === "dental"
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
