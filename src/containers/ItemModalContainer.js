import React, { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { items } from "modules/items";
import { parts } from "modules/parts";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

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

const ItemModalContainer = ({
  modalType,
  open,
  close,
  seqId,
  itemObj,
}) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const partData = useSelector(({ part }) => part.data);

  const [partSeqId, setPartSeqId] = useState(itemObj.seqId);

  const [partName, setPartName] = useState(itemObj.partName);
  
  useEffect(() => {
    dispatch(parts.getPartMiddleware());
    setPartName();
    //setPartName(itemObj.partName);
  }, []);

  useEffect(() => {
    setPartName(itemObj.partName);
  }, [itemObj.partName]);

  const auto = [];
  //partData.map(data => auto.push({ part_name: data.part_name }));
  partData.map(data => auto.push(data.part_name));
  console.log(auto);
  const onSubmit = data => {
    if (modalType === "추가") {
      if (partSeqId === "") return alert("파트명을 선택하세요.");

      const content = {
        part_seq_id: partSeqId,
        item_name: data.itemName,
      };
      console.log(content);
      dispatch(items.addItemMiddleware(content));
    } else if (modalType === "수정") {
      if (partSeqId === "") return alert("파트명을 선택하세요.");

      const contents = {
        seq_id: itemObj.seqId,
        part_seq_id: partSeqId,
        item_name: data.itemName,
      };

      dispatch(items.updateItemMiddleware(itemObj.seqId, contents));
    } else if (modalType === "삭제") {
      dispatch(items.deleteItemMiddleware(seqId));
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  return (
    <Modal open={open} modalType={modalType}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalType === "삭제" ? null : (
          <>
            <Autocomplete
              value={partName}
              className={classes.textField}
              name="partName"
              //control={control}
              //inputValue={partName}
              id="controllable-states-demo"
              options={auto}
              //getOptionLabel={option => option}
              //filterOptions={filterOptions}
              getOptionSelected={(option, value) => {
                return (
                  option?.id === value?.id ||
                  option?.name.toLowerCase() === value?.name.toLowerCase()
                );
              }}
              // onInputChange={(event, newInputValue) => {
              //   setPartName(newInputValue.part_name);
              // }}
              onChange={(event, newValue) => {
                
                if (newValue === null) {
                  setPartSeqId("");
                } else {
                  const partSeqId = partData.findIndex(obj => obj.part_name === newValue);
                 
                  setPartName(newValue);
                  setPartSeqId(partSeqId);
                }
              }}
              renderInput={params => (
                <TextField {...params} label="파트명" variant="outlined" />
              )}
            />
            <Controller
              name="itemName"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.textField}
                  label="장치명"
                  variant="outlined"
                  defaultValue={itemObj.itemName ? itemObj.itemName : ""}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "장치명을 입력하세요.",
              }}
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

export default ItemModalContainer;
