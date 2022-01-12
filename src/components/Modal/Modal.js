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
  

  const dash1 = [ { title: "마포한그루" }, { title: "연세유라인" }, { title: "미소유" }, { title: "연세미엘치과" }, { title: "연세키즈사랑" }, { title: "연세윤치과" }, 
                  { title: "군포 에미담치과" }, { title: "연세키즈투틴치과" }, { title: "중구강약안면외과" }, { title: "라임프로" }, { title: "연세후" }, 
                  { title: "스노우화이트" }, { title: "과천 연세스위트" }, { title: "연세두리치과" }, { title: "서울늘편한" }, { title: "이바른치과" }, { title: "약수 연세치과" }, ];

  const dash2 = [ { title: "파트명1" }, { title: "파트명2" }, { title: "파트명3" }, { title: "파트명4" }, { title: "파트명5" }, { title: "파트명6" }, { title: "파트명7" } ];
  const dash3 = [ { title: "CRS" }, { title: "장치명1" }, { title: "장치명2" }, { title: "장치명3" }, { title: "장치명4" }, { title: "장치명5" } ];

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


  

  const dental1 = [ { title: "1" }, { title: "2" }, { title: "3" }, { title: "4" }, { title: "5" }, { title: "6" }, { title: "7" }, { title: "8" }, { title: "9" }, { title: "10" } ];
  const dental2 = [ { title: "제조" }, { title: "보건업" } ];
  const dental3 = [ { title: "치과기공소" }, { title: "치과병원" } ];
  


  useEffect( () => {
      axios
        .get("http://localhost:8000/api/code/part/")
        .then((result) => {

          //console.log(result.data);

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
                  label="접수일자"
                  type="date"
                  defaultValue="2022-01-11"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="완성일자"
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
                  renderInput={(params) => <TextField {...params} label="치과" variant="outlined" />}
                />  

                <Controller
                  name="partName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="이름"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "이름을 입력하세요."
                  }}
                />
                


                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash2}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                /> 
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash3}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
                /> 
               
                  <div style={{align: "center"}}>test.png</div>

              <Button
              className={classes.button} 
              color="info" 
              round
              >이미지 업로드
              </Button> 

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




  const Part = () => (
    <>
      <DialogContent>
        <DialogContentText>
          파트 {props.modalType}
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
                      label="파트명"
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
          장치 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          { 
            props.modalType === "삭제"
            ? null
            : (
              <>
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={aaa}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="장치명"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "장치명을 입력하세요."
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

  const Dental = () => (
    <>
      <DialogContent>
        <DialogContentText>
          치과 {props.modalType}
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
                      label="거래처명"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "거래처명을 입력하세요."
                  }}
                />
              
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="대표"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "대표명을 입력하세요."
                  }}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="전화번호"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "전화번호를 입력하세요."
                  }}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="팩스번호"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "팩스번호를 입력하세요."
                  }}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="등록번호"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "등록번호를 입력하세요."
                  }}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dental2}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  style={{ width: "95%" }}
                  renderInput={(params) => <TextField {...params} label="업태" variant="outlined" />}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dental3}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  style={{ width: "95%" }}
                  renderInput={(params) => <TextField {...params} label="업종" variant="outlined" />}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="우편번호"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "우편번호를 입력하세요."
                  }}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="주소"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "주소를 입력하세요."
                  }}
                />
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="비고"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
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











  const Price = () => (
    <>
      <DialogContent>
        <DialogContentText>
          단가 {props.modalType}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          { 
            props.modalType === "삭제"
            ? null
            : (
              <>
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash1}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash2}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash3}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
                />  
                <Controller
                  name="itemName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="단가"
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "단가를 입력하세요."
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















  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.partModalType}</DialogTitle>
        {
          props.type === "dash"
          ? <Dashboard />
          : null
        }
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
          ? <Dental />
          : null
        }
        {
          props.type === "price"
          ? <Price />
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
