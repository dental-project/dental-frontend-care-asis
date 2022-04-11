import React from "react";
import Modal from "components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { parts } from "modules/parts";

// Soft UI Dashboard React components
import SuiButton from "components/Sui/SuiButton";

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

const PartModalContainer = ({ modalType, open, close, seqId, partObj }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formData"));
    const partName = formData.get("partName");

    if (partName === "") return alert("파트명을 입력하세요");

    if (modalType === "추가") {

      const content = {
        partName: partName,
      };
      dispatch(parts.addPartMiddleware(content));
    } else if(modalType === "파트수정") {

      const contents = {
        seqId: seqId,
        partName: partName,
      };

      dispatch(parts.updatePartMiddleware(partObj.seqId, contents));
    } else if (modalType === "파트삭제") {
      dispatch(parts.deletePartMiddleware(seqId));
    }

  }
  
  return (
    <Modal open={open} modalType={modalType}>
      <form id="formData" onSubmit={onSubmit} encType="multipart/form-data">
        {modalType === "파트삭제" ? (
          <div style={{padding: "50px",textAlign: "center" }}>{partObj.partName}</div>
        ) : (
          <>
            <TextField
              className={classes.textField}
              name="partName"
              label="파트명"
              variant="outlined"
              defaultValue={modalType === "파트수정" ? partObj.partName : ""}
            />
          </>
        )}
        <SuiButton
          type="submit"
          form="formData"
          variant="outlined"
          color="info"
          size="medium"
          style={{float: "right", margin: "7px"}}
        >
          {modalType}
        </SuiButton>
      </form>
      <SuiButton
          style={{float: "right", marginTop: "7px"}}
          variant="outlined"
          color="error"
          size="medium"
          onClick={close}
        >
          취소
        </SuiButton>
    </Modal>
  );
};

export default PartModalContainer;
