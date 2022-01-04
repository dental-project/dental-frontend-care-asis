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
import ToastGrid from "components/ToastGrid/ToastGrid.js";

// Material
import TextField from "@material-ui/core/TextField";
import CustomInput from "components/CustomInput/CustomInput.js";

// api
import axios from 'axios';

// Form 양식
import { useForm, Controller } from "react-hook-form";


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

  useEffect( () => { 
    // axios.get('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7ae87beac78e68f74c38e26c2f779f84')
    //   .then((result) => {
    //     //console.log(result);
    //   })
    //   .catch(() => {
    //     console.log("실패");
    //   })

    //setTime(null);
  },[]);
   
  const onSubmit = (data) => {
    console.log(data);
  };

  const dateFormat = "YYYY-MM-DD";

  return (
    <Container 
      fixed
      style={{maxWidth: "100%", background:"#E4E4E4"}}
    >
      <Grid container>
        <Grid item xs={3} className={classes.grid}>
          <Card>
            <CardHeader>
              <Typography>추가,수정</Typography>
            </CardHeader>
            <CardBody>

              
              <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                  id="date"
                  label="접수일"
                  type="date"
                  defaultValue="2022-01-02"
                  className={classes.textFieldDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="date"
                  label="완성일"
                  type="date"
                  defaultValue="2022-01-03"
                  className={classes.textFieldDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Controller
                  name="customerName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="time"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      
                    />
                  )}
                  rules={{ 
                    required: 'time',
                  }}
                />
                          
                <Controller
                  name="patientName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="치과"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: '치과명을 입력 해주세요.' }}
                />  

                <Controller
                  name="patientName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="이름"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: '이름을 입력 해주세요.' }}
                />


                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="가공금액"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: '가공금액을 입력 해주세요.' }}
                />
                 <Button
                  type="submit"
                  className={classes.button} 
                  color="info" 
                  round
                >
                  저장
                </Button>
              </form>
            
            </CardBody>
          </Card>
        </Grid>

        <Grid item xs={9} className={classes.grid}>
          <Card>
            <CardHeader>
              <Typography>추가,수정</Typography>
            </CardHeader>
            <CardBody>
            <ToastGrid />
              </CardBody>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}