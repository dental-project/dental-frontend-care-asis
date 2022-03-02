import React, { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

import { useDispatch } from "react-redux";

import { parts } from "modules/parts";
import { AutoScaleAxis } from "chartist";

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
  const { handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();

  const [partNameData, setPartNameData] = useState("");

  useEffect(() => {
    if (modalType === "파트수정") {
      setPartNameData(partObj.partName);
    } else {
      console.log("추가");
      setPartNameData("");
      reset({
        partName: "",
      });
    }
  }, [open]);










  const onSubmit = data => {
   
    console.log(data);

    if (data.partName === undefined || data.partName === "")
      return alert("파트명을 입력하세요.");
  
    //checkSpace(data.partName);


    if (modalType === "추가") {
      const content = {
        part_name: data.partName,
      };

      dispatch(parts.addPartMiddleware(content));
    } else if (modalType === "파트수정") {
      const contents = {
        seq_id: partObj.seqId,
        part_name: data.partName,
      };

      dispatch(parts.updatePartMiddleware(partObj.seqId, contents));
    } else if (modalType === "삭제") {
      dispatch(parts.deletePartMiddleware(seqId));
    }

    

  };

  // const checkSpace = (str) => {
  //   if (str.search(/\s/) != -1) {
  //     return alert("공백을 제거하세요.")
  //   }
  // }

  
  return (
    <Modal open={open} modalType={modalType}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalType === "삭제" ? null : (
          <>
            <Controller
              control={control}
              name="partName"
              render={({ field: { onChange, value } }) => (
                <TextField
                  className={classes.textField}
                  label="파트명"
                  variant="outlined"
                  defaultValue={partNameData}
                  onChange={onChange}
                />
              )}
            />
          </>
        )}
        <Button type="submit" className={classes.button} color="info" round>
          {modalType}
        </Button>
      </form>
      <Button className={classes.button} color="danger" round onClick={close}>
        취소
      </Button>
    </Modal>
  );
};

export default PartModalContainer;
