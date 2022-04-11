import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

// core components
import Grid from '@material-ui/core/Grid';
// import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CSRFToken from "components/CSRF/CSRFToken"; 
// Material
import TextField from '@material-ui/core/TextField';

// Axios
import axios from 'axios';

// Form 양식
import { useForm, Controller } from "react-hook-form";

// Soft UI Dashboard React components
import SuiButton from "components/Sui/SuiButton";

import { useDispatch, useSelector } from "react-redux";
import { dentals } from "modules/dentals";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "99%",
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
    width: "99%",
    marginLeft: "15px"
  }
}));

export default function Signup() {
    const classes = useStyles();
   
    const { watch,  handleSubmit, control } = useForm();

    const dispatch = useDispatch();
    const dentalAutoData = useSelector(({ dental }) => dental.data);

    const vendorNameArr = [];

    dentalAutoData.map(data => {
      vendorNameArr.push( data.vendorName )
    });

    const set1 = new Set(vendorNameArr);
    const auto1 = [...set1];

    useEffect(() => {
      dispatch(dentals.getDentalMiddleware());
    }, []);

    const filterOptions = createFilterOptions({
      matchFrom: "start",
      stringify: option => option,
    });

    const password = useRef();
    password.current = watch("passwd");
   
    const onSubmit = (data) => {
     
      if(data.passwd !== data.passwdConfirm) {
        return alert("비밀번호가 서로 일치하지 않습니다.");
      }

      const xtoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const config = {
        withCredentials: true,
        headers:{
          'X-CSRFToken':xtoken
        }
      }   

      axios
        .post("/api/users/user/",
          { 
            userid: data.userid, 
            password: data.passwd,
            username: data.userName,
            tel: data.tel,
            vendor_id: data.vendorid
          },
          config
        
        )
        .then((result) => {
          console.log(result);
        })
        .catch(() => {
          console.log("실패");
      });

    }

    return (
      <Grid
        container
        direction="row"
      >
        <Grid item xs={12} sm={12} md={12} >
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
            
              <form onSubmit={handleSubmit(onSubmit)}>
                <CSRFToken />
                <Controller
                  name="userid"
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

                <Controller
                  name="passwd"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      type="password"
                      label="Password"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: '패스워드를 입력 해주세요.'
                  }}
                />

                <Controller
                  name="passwdConfirm"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      type="password"
                      label="Password Confirm"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: '입력한 패스워드를 확인 해주세요.' }}
                />        

                <Controller
                  name="userName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="User Name"
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
                  name="tel"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="Tel"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: '휴대폰 번호를 입력 해주세요.',
                    pattern: {
                      value: /^\d{3}\d{3,4}\d{4,}$/,
                      message: "휴대폰 형식을 입력하세요."
                    }
                  }}
                />
                
                <Autocomplete
                  className={classes.textField}
                  options={auto1}
                  getOptionLabel={option => option}
                  filterOptions={filterOptions}
                  onChange={(event, newValue) => {
                    
                  }}
                  renderInput={params => (
                    <TextField {...params} name="partName" label="파트명" variant="outlined" />
                  )}
                />
                
                
             
               
               
                <SuiButton
                  type="submit"
                  className={classes.button}
                  variant="outlined"
                  color="info"
                  size="medium"
                >
                  Sign up
                </SuiButton>
                
              </form>  
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    );
}