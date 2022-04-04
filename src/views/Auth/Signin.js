import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom"; 

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiInput from "components/Sui/SuiInput";
import SuiButton from "components/Sui/SuiButton";

// Authentication layout components
import LoginLayout from "layouts/authentication/LoginLayout";
import Separator from "layouts/authentication/Separator";

// Images
import curved6 from "assets/img/curved-images/curved14.jpg";
import toothImg from "assets/img/toothImg.svg";

import { apis } from "apis/axios";

function SignIn() {
    const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  //  const [agreement, setAgremment] = useState(true);

  //  const handleSetAgremment = () => setAgremment(!agreement);
  const history = useHistory();
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

    apis
      .login({
        userid: inputs.userid,
        password: inputs.passwd,
      })
      .then(result => {
        
        if (result.data.status === "SUCCESS") {
          history.push("/dental");
        } else {
          alert(result.data.message);
        }
      })
      .catch(err => {
        alert(err);
      });

  };

  return (
    <LoginLayout
      title="Dental Clinic"
      description="덴탈 A 사이트"
      image={curved6}
    >
      <Card>
        {/* <SuiBox p={3} mb={1} textAlign="center"> */}
        <SuiBox pt={3} mb={1} textAlign="center">
          {/* <SuiTypography variant="h5" fontWeight="bold">
          {/* Login 
          {/* </SuiTypography> */} 
            <img
              src={toothImg}
              // style={{ width: "30%", height: "30%", marginTop: "20px" }}
            />
        </SuiBox>
        {/* <SuiBox mb={2}> */}
          {/* <Socials /> */}
        {/* </SuiBox> */}
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput name="userid" placeholder="Name" onChange={handleChange} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                name="passwd"
                placeholder="Password"
                onChange={handleChange}
              />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="dark" fullWidth onClick={() => loginBtn()}>
                sign in
              </SuiButton>
            </SuiBox>
            
          </SuiBox>
        </SuiBox>
      </Card>
    </LoginLayout>
  );
}

export default SignIn;
