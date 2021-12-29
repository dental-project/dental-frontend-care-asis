import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// Material
import TextField from '@material-ui/core/TextField';

// Axios
import axios from 'axios';

// Form 양식
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function Signup() {
    const classes = useStyles();
    let history = useHistory();
   
    const { watch,  handleSubmit, control } = useForm();
    const password = useRef();
    password.current = watch("passwd");
   
    const onSubmit = (data) => {
     
      if(data.passwd !== data.passwdConfirm) {
        return alert("비밀번호가 서로 일치하지 않습니다.");
      }


      axios
        .get("http://localhost:8000/api/users/",
          { 
            userid: data.userid, 
            password: data.passwd,
            username: data.userName,
            email: data.email,
            tel: data.tel,
            vendor_id: data.vendorid
          }
        
        )
        .then((result) => {
          console.log(result);
        })
        .catch(() => {
          console.log("실패");
      });





//       axios.post('http://localhost:8000/api/users', 
//           { 
//             userid: data.userid, 
//             password: data.passwd,
//             username: data.userName,
//             email: data.email,
//             tel: data.tel,
//             vendor_id: data.vendorid
//           }
//         )
//         .then((result) => { 

// console.log(result);

//           //result.data.returnCode === "200" && history.push('/admin');
//           //result.data.returnCode === "801" && alert("이미 존재하는 아이디 입니다.");
//         })
//         .catch(error => {
//           alert(error);
//           throw new Error(error);
//         });

    }

    return (
      <GridContainer>
        <GridItem xs={10} sm={4} md={3} style={{margin: "50px auto"}}>
          <Card>
            <CardHeader style={{margin: "20px auto"}}>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} >

                {/* <TextField
                  className={classes.root}
                  type="password"
                  //name="password"
                  label="Password"
                  variant="outlined"
                  {...register('password', { required: true, minLength: 7 })}
                />   */}
               
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="userid"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          className={classes.root} 
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
                          className={classes.root} 
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
                          className={classes.root} 
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
                          className={classes.root} 
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
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          className={classes.root} 
                          label="Email"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{ 
                        required: '이메일을 입력 해주세요.' ,
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "이메일 형식을 입력하세요."
                        }
                      }}
                    />  
                    <Controller
                      name="tel"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          className={classes.root} 
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

                    <Controller
                      name="vendorid"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          className={classes.root} 
                          label="Dental ID"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{ 
                        required: '치과 아이디를 입력하세요.',
                      }}
                    />   

                    <Button
                      type="submit"
                      className={classes.button} 
                      color="info" 
                      round
                    >
                      Sign up
                    </Button>

                  </form>  

                </GridItem>
              </GridContainer>
            </CardBody>
          
              
            
            <CardFooter>
                <p style={{margin: "0 auto"}}>Already have an account? </p>
            </CardFooter>
            <CardFooter style={{marginTop: "-20px"}}>
                <p 
                    className={classes.customText} 
                    style={{margin: "0 auto"}}
                    onClick={ () => history.goBack() }
                >
                    Sign In
                </p> 
            </CardFooter>
            
          </Card>
        </GridItem>
      </GridContainer>
    );
}