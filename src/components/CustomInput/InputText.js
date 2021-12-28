import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PermIdentity from '@material-ui/icons/PermIdentity';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';

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
    } 
}));

export default function InputText(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  const {
    name,
    labelText,
    icon
  } = props;

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

    props.onCreate(inputs);
  }

  return (
    <div>
      <TextField
        name={name}
        className={classes.root}
        label={labelText}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               { icon === "userIcon" ? <PermIdentity /> : null } 
               { icon === "passwdIcon" ? <LockOutlinedIcon /> : null }
            </InputAdornment>
          ),
        }}
        
        onChange={handleChange}
      />
      
    </div>
  );
}