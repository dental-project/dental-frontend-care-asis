import React from "react";
import Modal from "components/Modal/Modal";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  textField: {
    width: "95%",
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
  inputs: {
    "& label.Mui-focused": {
      color: "#26c6da",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#26c6da",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#26c6da",
      },
    },
  },
  button: {
    width: "100%",
  },
}));

const ImageModalContainer = ({
  open,
  close,
  image,
}) => {
 
  return (
    <Modal open={open} close={close}>
      <div style={{width: "100%", textAlign: "right"}}>
        <IconButton aria-label="close" onClick={close} >
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <img src={image} />
      </div>
    </Modal>
     
  )
};

export default ImageModalContainer;
