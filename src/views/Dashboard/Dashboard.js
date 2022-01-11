import React, { useState, useEffect } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

// core components
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

// Material
import TextField from "@material-ui/core/TextField";
import CustomInput from "components/CustomInput/CustomInput.js";

// api
import axios from 'axios';

// Form 양식
import { useForm, Controller } from "react-hook-form";

import Modal from "components/Modal/Modal.js"
import DetailButtonRenderer from "components/ToastGridRenderer/DetailRenderer.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1)
  },

  textFieldDate: {
    width: "100%"
  },
  textField: {
    width: "100%",
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
  customText: {
    color: "#26c6da",
    fontWeight: "bold",
    cursor:"pointer",
    "&:hover": {
      color: "#1993A8"
    }
  },
  button: {
    width: "100%"
  }
}));

export default function Dashboard(props) {

  const classes = useStyles();
  const { watch,  handleSubmit, control } = useForm();


  // 모달
  const [openDashAddModal, setOpenDashModal] = useState(false);
  const [registerType, setRegisterType] = useState("");
  const [rowSeqId, setRowSeqId] = useState("");
  const [rowItemName, setRowItemName] = useState("");

  const handleDashModalOpen = () => {
      setOpenDashModal(true);
  };
  const handleDashModalClose = () => {
      setOpenDashModal(false);
  };

  const dashModalOpen = (e) => {
      setRegisterType("추가");
      handleDashModalOpen();
  }

  
  const onDetailButtonClicked = () => {
    //console.log(rowIndex);
  };

  const onUpdateButtonClicked = (seqId,partName) => {
    //console.log(rowIndex);
  };

  const onRemoveButtonClicked = (rowIndex) => {
    console.log(rowIndex);
  };

  const [dashData, setDentalData] = useState([]);
  const columns = [
    { name: 'customerName', header: '거래처명' },
    { name: 'phoneNumber', header: '전화번호' },
    { name: 'patientName', header: '환자명' },
    { name: 'receiptDate', header: '접수일자' },
    { name: 'completeDate', header: '완성일자' },
    { name: 'time', header: '시간'},
    { name: 'ModU', header: 'ModU'},
    { name: 'ModL', header: 'ModL'},
    { name: 'Bite', header: 'Bite'},
    { name: 'App', header: 'App'},
    { name: 'price', header: '기공금액(원)', align: 'center'},
    { name: 'classification', header: '구분'},
    {
      name: "detail",
      header: "상세보기",
      align: "center",
      renderer: {
        type: DetailButtonRenderer,
        options: {
          onDetailButtonClicked
        }
      }
    },
    {
      name: "update",
      header: "수정",
      align: "center",
      renderer: {
        type: UpdateButtonRenderer,
        options: {
          onUpdateButtonClicked
        }
      }
    },
    {
      name: 'remove',
      header: '삭제',
      align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onRemoveButtonClicked
        }
      }
    }
  ];


  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });


  const auto1 = [ { title: "전체" }, { title: "리더스탑치과" }, { title: "이바른치과" }, { title: "연세두리치과" }, { title: "서울스위트치과" }, { title: "연세바로치과" }, { title: "서울시카고" }];
  const auto2 = [ { title: "전체" }, { title: "최진실" }, { title: "전윤화" }, { title: "정보경" }, { title: "이유림" }, { title: "조유나" }]




  useEffect( () => { 
    axios
      .get("http://localhost:8000/api/vendor/")
      .then((result) => {
          console.log(result);
        setDentalData(result.data);
      })
      .catch((error) => {
        throw new Error(error);
    });
  },[]);
   


  const dateFormat = "YYYY-MM-DD";

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Card>
            <CardHeader>
              <Button
                type="submit"
                className={classes.button} 
                color="info" 
                round
                onClick={(e) => dashModalOpen(e)}
              >추가
              </Button>
            </CardHeader>
            <CardBody>

              
              <form className={classes.container} noValidate>
                <Grid item xs={5} className={classes.grid} style={{float: "left"}}>
                  <TextField
                    id="date"
                    label="접수일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    style={{width: "30%"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                
                  <TextField
                    id="date"
                    label="완성일자"
                    type="date"
                    defaultValue="2022-01-12"
                    className={classes.textField}
                    style={{width: "30%"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button
                    type="submit"
                    color="primary" 
                    round
                    style={{width: "28%"}}
                    //onClick={(e) => partModalOpen(e)}
                  >날짜 검색
                  </Button>
                </Grid>

                <Grid item xs={5} className={classes.grid} style={{float: "left"}}>
                  <Autocomplete
                    id="filter-demo"
                    className={classes.grid}
                    options={auto1}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    style={{float: "left", width: "200px", marginLeft: "20px"}}
                    renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                  />

                  <Autocomplete
                    id="filter-demo"
                    className={classes.grid}
                    options={auto2}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    style={{float: "left", width: "200px"}}
                    renderInput={(params) => <TextField {...params} label="환자명" variant="outlined" />}
                  />

                  <Button
                    type="submit"
                    color="primary" 
                    round
                    style={{float: "left", width: "150px"}}
                    //onClick={(e) => partModalOpen(e)}
                  >검색
                  </Button>
                </Grid>   

                <Grid item xs={2} className={classes.grid} style={{float: "right"}}>
                  <Button
                    type="submit"
                    color="danger" 
                    round
                    style={{width: "100%"}}
                    //onClick={(e) => partModalOpen(e)}
                  >출력
                  </Button>
                  </Grid>
              </form>
           
           



              <BasicGrid 
                type={"dash"}
                columns={columns}
                data={dashData}
              />
            </CardBody>
          </Card>
        </Grid>
      </Grid>

      <Modal      
        type={"dash"}         
        modalType={registerType}
        rowSeqId={rowSeqId}
        rowValue={rowItemName}
        open={openDashAddModal}
        close={handleDashModalClose}
      />

    </>
  );
}