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
  const partAutoData = useSelector(({ part }) => part.data);

  const [partSeqId, setPartSeqId] = useState("");
  console.log(itemObj);

  const [partNameData, setPartNameData] = useState("");
  const [itemNameData, setItemNameData] = useState("");

  useEffect(() => {
    dispatch(parts.getPartMiddleware());
  }, []);

  useEffect(() => {
    if (modalType === "수정") {
      setPartNameData(itemObj.partName);
      setItemNameData(itemObj.itemName);
    } else {
      setPartNameData("");
      setItemNameData("");
    }
  }, [open]);

  const auto = [];
  partAutoData.map(data => auto.push(data.part_name));
  
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
      console.log(contents);
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
              className={classes.textField}
              value={partNameData}
              options={auto}
              filterOptions={filterOptions}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  setPartSeqId("");
                } else {
                  const index = partAutoData.findIndex(
                    obj => obj.part_name === newValue
                  );
                  const partIndex = partAutoData[index].seq_id;
                  setPartNameData(newValue);
                  setPartSeqId(partIndex);
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
                field: { onChange },
              }) => (
                <TextField
                  className={classes.textField}
                  label="장치명"
                  variant="outlined"
                  defaultValue={itemNameData}
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

export default ItemModalContainer;
