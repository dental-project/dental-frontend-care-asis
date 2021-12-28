import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// redux
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    borderBottom: '3px solid #00acc1',
    '&:hover': {
      borderColor: '#00CBE6'
    }
  },
  color: {
    color: "#fff"
  }
}));

function CustomSelectBox(props) {

  const classes = useStyles();
  const [dashId, setDashId] = useState(0);
  const [openDash, setOpenDash] = useState(false);

  const handleDashIdChange = (e) => {
    setDashId(e.target.value);
    props.setDashId(e.target.value);
  };
  
  const handleDashClose = () => {
    setOpenDash(false);
  };

  const handleDashOpen = () => {
    setOpenDash(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.color} id="demo-controlled-open-select-label" >대시보드명 선택</InputLabel>
        <Select
          className={classes.color}
          open={openDash}
          onClose={handleDashClose}
          onOpen={handleDashOpen}
          value={dashId}
          onChange={handleDashIdChange}
        >
        {
          props.dashboard.map( (item,i) => (
            <MenuItem value={i} key={i}>{item.dashname}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
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
)(CustomSelectBox)