import React, { useState, useEffect } from "react";
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
import PermIdentity from '@material-ui/icons/PermIdentity';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Axios
import axios from 'axios';

// api
import dbAxios from "api/dbAxios.js"

const useStyles = makeStyles((theme) => ({
  root: {
      width: "95%",
      margin: theme.spacing(1),
      '& label.Mui-focused': {
          color: '#C56ACE',
      },
      '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
              borderColor: '#C56ACE',
          },
      },
  },
  button: {
    width: "100%"
  },
  customText: {
    float: "left",
    paddingLeft: "30px",
    color: "#C56ACE",
    cursor:"pointer",
    "&:hover": {
      color: "#FF6CAB"
    }
  },
  customText2: {
    float: "right",
    paddingRight: "30px",
    color: "#C56ACE",
    cursor:"pointer",
    "&:hover": {
      color: "#FF6CAB"
    }
  }
}));


export default function Signin() {
    const classes = useStyles();
    
    let history = useHistory();
    
    useEffect(() => {

      axios
      .get('http://localhost:8000/api/users/')
      .then((result) => {
        console.log(result);
      })
      .catch(() => {
        console.log('실패');
      });
    }, []);





    const [inputs, setInputs] = useState({
      userid: '',
      passwd: '',
    });
  
    const handleChange = (e) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
    
    const loginBtn = () => {
      axios.post('http://localhost:8080/auth/login', { user_id: inputs.userid, password: inputs.passwd })
        .then((result) => { 

          console.log(result);

          result.data.returnCode === "200" ? history.push('/admin') : alert("로그인 정보가 일치하지 않습니다."); return;
        })
        .catch(error => {
          alert(error);
          throw new Error(error);
        });
    };

      
    
    return (
      <GridContainer>
        <GridItem xs={10} sm={4} md={3} style={{margin: "100px auto"}}>
          <Card>
            <CardHeader>
              <p 
                style={{
                  fontSize: "7vh",
                  fontWeight: "bold",
                  background: "linear-gradient(60deg, #FF6CAB, #7366FF)",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  lineHeight: "10vh"
                }}
              >iWidget
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                  <TextField
                    className={classes.root}
                    name="userid"
                    label="User ID"
                    variant="outlined"
                    icon={<PermIdentity />}
                    onChange={handleChange}
                  />
                  <TextField
                    className={classes.root}
                    name="passwd"
                    label="Password"
                    variant="outlined"
                    icon={<LockOutlinedIcon />}
                    onChange={handleChange}
                  />
                  <Button
                    className={classes.button} 
                    color="custom" 
                    round
                    onClick={ () => loginBtn() }
                  >
                    Login
                  </Button>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={6} sm={6} md={6} >
                  <p
                    className={classes.customText}
                    onClick={ () => history.push('/auth/signup') }
                  >
                    Create Account
                  </p>
                </GridItem>
                <GridItem xs={6} sm={6} md={6} >
                  <p
                    className={classes.customText2}
                  >
                    Forgot password?
                  </p>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
}