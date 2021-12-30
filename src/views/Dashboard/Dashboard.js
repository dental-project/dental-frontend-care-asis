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

// tui Grid
import DataTable from "components/Table/DataTable.js";

// Material
import TextField from "@material-ui/core/TextField";
import CustomInput from "components/CustomInput/CustomInput.js";

// api
import axios from 'axios';

// redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    flexGrow: 1,
    margin: '8px',
    backgroundColor: "#303238",
    color: "#fff",
  }
}));

function Dashboard(props) {

  const classes = useStyles();
  const [dashId, setDashId] = useState(0);

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
   
  return (
    <Container 
      fixed
      style={{maxWidth: "100%", background:"#E4E4E4"}}
    >
      <Grid 
        container
      >
        <Grid item xs={12}>
          <Card>
          <CardHeader>
            <Typography>추가,수정</Typography>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="거래처명"
              id="username"
              formControlProps={{
                fullWidth: false
              }}
            />
          
            <CustomInput
              labelText="전화번호"
              id="email-address"
              formControlProps={{
                fullWidth: false
              }}
            />
        
            <CustomInput
              labelText="환자명"
              id="first-name"
              formControlProps={{
                fullWidth: false
              }}
            />
          

          </CardBody>
        </Card>

        </Grid>
        <Grid item xs={12} >
          <DataTable />
        </Grid>
        
      </Grid>



     
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboard: state
  }
}

export default connect(
  mapStateToProps
)(Dashboard)