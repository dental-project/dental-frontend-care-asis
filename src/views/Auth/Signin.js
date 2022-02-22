import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// react-router-dom components
//  import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiInput from "components/Sui/SuiInput";
import SuiButton from "components/Sui/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// Axios
import axios from "axios";

function SignIn() {
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
    <BasicLayout
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
          <Socials />
        </SuiBox>
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
            {/* <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox> */}
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="dark" fullWidth onClick={() => loginBtn()}>
                sign in
              </SuiButton>
            </SuiBox>
            {/* <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox> */}
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
