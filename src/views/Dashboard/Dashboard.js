import React ,{useState, useEffect} from 'react'

// @material-ui/core
import { makeStyles, Card, CardHeader, CardContent } from "@material-ui/core";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomSelectBox from "components/CoustomSelectBox/CustomSelectBox.js"

// api
import axios from 'axios';

// redux
import { connect } from 'react-redux';

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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomSelectBox setDashId={setDashId}/>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          
        </GridItem>
      </GridContainer>
    </div>
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