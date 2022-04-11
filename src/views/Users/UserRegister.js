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
import { useForm } from "react-hook-form";

// Soft UI Dashboard React components
// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiButton from "components/Sui/SuiButton";
import ProjectHeader from "components/SuiProject/ProjectHeader";
import ProjectBody from "components/SuiProject/ProjectBody";

// @mui material components
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useDispatch, useSelector } from "react-redux";
import { dentals } from "modules/dentals";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "98%",
    margin: theme.spacing(1),
    '& label.Mui-focused': {
        color: '#00acc1',
    },
    '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
            borderColor: '#00acc1',
        },
    },
  }
}));

export default function Signup() {
    const classes = useStyles();
   
    const { watch,  handleSubmit } = useForm();

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
   
    const onSubmit = (e) => {
     
      e && e.preventDefault();

      let formData = new FormData(document.getElementById("formData"));
      const userid = formData.get("userid");
      const passwd = formData.get("passwd");
      const passwdConfirm = formData.get("passwdConfirm");
      const userName = formData.get("userName");
      const tel = formData.get("tel");
      const vendorName = formData.get("vendorName");

      
      
      const index = dentalAutoData.findIndex(data =>
        data.vendorName === vendorName
      )
     
      if(passwd !== passwdConfirm) {
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
            userid: userid, 
            password: passwd,
            username: userName,
            tel: tel,
            vendor_id: dentalAutoData[index].seqId,
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
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <ProjectHeader title={"유저 회원가입"} subTitle={"Sign up"}></ProjectHeader>
            <ProjectBody>
              <form id="formData" onSubmit={onSubmit}>
               <CSRFToken />
                 <TextField
                   className={classes.textField}
                   name="userid"
                   label="User ID"
                   variant="outlined"
                 />
                 <TextField
                   className={classes.textField}
                   type="password"
                   name="passwd"
                   label="Password"
                   variant="outlined"
                 />
                 <TextField
                   className={classes.textField} 
                   type="password"
                   name="passwdConfirm"
                   label="Password Confirm"
                   variant="outlined"
                 />
                 <TextField
                   className={classes.textField} 
                   name="userName"
                   label="User Name"
                   variant="outlined"
                 />
                 <TextField
                   className={classes.textField}
                   name="tel" 
                   label="Tel"
                   variant="outlined"
                 />
                 <Autocomplete
                   className={classes.textField}
                   options={auto1}
                   filterOptions={filterOptions}
                   renderInput={params => (
                     <TextField 
                       {...params} 
                       name="vendorName" 
                       label="거래처명" 
                       variant="outlined" 
                     />
                   )}
                 />
                <SuiButton
                  type="submit"
                  form="formData"
                  variant="outlined"
                  color="info"
                  style={{width: "98%", marginTop: "20px", marginLeft: "9px", marginBottom: "20px"}}
                >
                  Sign up
                </SuiButton>
             </form>  
            </ProjectBody>
          </Card>
        </SuiBox>
      </SuiBox>
    </>
  );
}