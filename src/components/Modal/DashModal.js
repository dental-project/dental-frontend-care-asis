import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({

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



function DashModal(props) {

  const classes = useStyles();

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  
  const top100Films = [
    { title: 'Removale App' },
    { title: 'Fixed App' },
    { title: 'Functional App' },
    { title: 'Splints' },
    { title: 'Diagnostic Study Models' },
    { title: "Tooth Positioner" },
    { title: "Indirect Bonding System" },
    { title: "Distalizing" },
    { title: "Sample" },
    { title: "Test1" },
    { title: "Test2" },
    { title: "Test3" }
  ];

  const DashAdd = () => (
    <>
      <DialogContent>
        <DialogContentText>
          파트 등록
        </DialogContentText>
        {/* <TextField
          type="text"
          margin="dense"
          name="dashboardName"
          label="번호"
          variant="outlined"
          autoFocus
          fullWidth
          onChange={handleDashboardInfo}
        /> */}
      
        <Autocomplete
          id="filter-demo"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          filterOptions={filterOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} variant="contained" color="secondary">취소</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">추가</Button>
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


  // 대시보드 정보
  const [inputs, setInputs] = useState({
    dashboardName: '',
  });

  const handleDashboardInfo = (e) => {

    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

  }

  const handleSubmit = (e) => {
    // e.preventDefault(); // 페
 
    // if(props.dashModalType === "대시보드 추가") {
    //   props.dispatch({ 
    //     type: 'dashboardAdd', 
    //     dashboardAdd: {
    //       id:inputs.dashboardName, 
    //       dashname: inputs.dashboardName,
    //       web: [],
    //       tablet: [],
    //       mobile: []
    //     }
    //   });
    //   props.setDashId(props.dashboard.length);
    //   alert("추가가 완료 되었습니다."); 
    // }
    // props.close();
  }

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.dashModalType}</DialogTitle>
        {
          props.dashModalType === "추가" 
          ? <DashAdd />
          : <DashDelete />
        }
      </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboard: state
  }
}

export default connect(
  mapStateToProps
)(DashModal)
