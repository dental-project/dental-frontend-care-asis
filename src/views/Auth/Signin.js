import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// react-router-dom components
//  import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiInput from "components/Sui/SuiInput";
import SuiButton from "components/Sui/SuiButton";

// Authentication layout components
import LoginLayout from "layouts/LoginLayout";

// Images
import curved6 from "assets/img/curved-images/curved14.jpg";

// Axios
import axios from "axios";

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
    axios
      .post("http://localhost:8000/api/users/login/", {
        userid: inputs.userid,
        password: inputs.passwd,
      })
      .then((result) => {
        //  console.log(result);
        if (result.data.status === "SUCCESS") {
          history.push("/dashboard");
        } else {
          alert(result.data.message);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <LoginLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          {/* <Socials /> */}
        </SuiBox>
        {/* <Separator /> */}
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
