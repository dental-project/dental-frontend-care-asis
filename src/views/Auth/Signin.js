import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom"; 

// core components
import Grid from '@material-ui/core/Grid';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import CSRFToken from "components/CSRF/CSRFToken";

// Material
import TextField from "@material-ui/core/TextField";


// Axios
import axios from "axios";


// image
import toothImg from "images/toothImg.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
  },
  textField: {
    width: "96%",
    margin: theme.spacing(1),
    "& label.Mui-focused": {
      color: "#00acc1",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#00acc1",
      },
    },
  },
  button: {
    width: "100%",
  },
  titleText: {
    fontSize: "5vh",
    fontWeight: "bold",
    background: "linear-gradient(60deg, #00acc1, #26c6da)",
    color: "transparent",
    WebkitBackgroundClip: "text"
  },
  customText: {
    float: "left",
    marginTop: "10px",
    color: "#26c6da",
    cursor: "pointer",
    "&:hover": {
      color: "#1993A8",
    },
  },
  customText2: {
    float: "right",
    marginTop: "10px",
    color: "#26c6da",
    cursor: "pointer",
    "&:hover": {
      color: "#1993A8",
    },
  },
}));





export default function Signin() {
  const classes = useStyles();
  let history = useHistory();

  const [inputs, setInputs] = useState({
    userid: "",
    passwd: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const loginBtn = () => {

    // const url = "/users/login/";
    // const param = {
    //     userid: inputs.userid,
    //     password: inputs.passwd
    // }

    // const result = dbAxios(url,param);
         
    const xtoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const config = {
      withCredentials: true,
      headers:{
        'X-CSRFToken':xtoken
      }
    }      

    axios
      .post("/api/users/login/", {
        userid: inputs.userid,
        password: inputs.passwd,
      },config)
      .then((result) => {
        result.data.status === "SUCCESS"
          ? history.push("/dental")
          : alert(result.data.message);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11} sm={8} md={3} >
        <Card>
          <CardHeader>
            <img
              src={toothImg}
              style={{ width: "30%", height: "30%", marginTop: "20px" }}
            />
            <Typography className={classes.titleText}>Dental Clinic</Typography>
          </CardHeader>
          <CardBody>
            <CSRFToken />
            <TextField
              className={classes.textField}
              name="userid"
              label="User ID"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              type="password"
              className={classes.textField}
              name="passwd"
              label="Password"
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              className={classes.button}
              color="info"
              round
              onClick={() => loginBtn()}
            >
              Login
            </Button>
            {/* <Typography
              className={classes.customText}
              onClick={() => history.push("/auth/signup")}
            >
              Create Account
            </Typography> */}
            {/* <Typography className={classes.customText2}>Forgot password?</Typography> */}
          </CardBody>
        </Card>
      </Grid>
    </Grid>
  );
}