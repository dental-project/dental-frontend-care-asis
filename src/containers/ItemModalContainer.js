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
  
  const dispatch = useDispatch();
  const partAutoData = useSelector(({ part }) => part.data);

  const [partSeqId, setPartSeqId] = useState("");
  const [partNameData, setPartNameData] = useState("");
  const [itemNameData, setItemNameData] = useState("");

  useEffect(() => {
    dispatch(parts.getPartMiddleware());
  }, []);

  const auto = [];
  partAutoData.map(data => auto.push(data.part_name));
  console.log(itemObj);

  



  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formData"));
    const partName = formData.get("partName");
    const itemName = formData.get("itemName");

    if (partName === "" || itemName === "") return alert("빈칸없이 입력하세요");

    const index = partAutoData.findIndex(
      obj => obj.part_name === partName
    );

    if(modalType === "추가") {

      const content = {
        part_seq_id: partAutoData[index].seq_id,
        item_name: itemName,
      };
      dispatch(items.addItemMiddleware(content));
    } else if(modalType === "수정") {
      const contents = {
        seq_id: seqId,
        part_seq_id: partAutoData[index].seq_id,
        item_name: itemName,
      };
      dispatch(items.updateItemMiddleware(itemObj.seqId, contents));
    } else if(modalType === "삭제") {
      dispatch(items.deleteItemMiddleware(seqId));
    }

  };


    // const itemName = (data.itemName === undefined || data.itemName === "") && modalType === "수정" ? itemNameData: data.itemName;

    // if ((itemName === undefined || itemName === "") && modalType !== "삭제")
    //   return alert("장치명을 입력하세요.");

    // if (modalType === "추가") {

    //   const content = {
    //     part_seq_id: partSeqId,
    //     item_name: data.itemName,
    //   };
      
    //   dispatch(items.addItemMiddleware(content));
    // } else if (modalType === "수정") {
    


    //   const contents = {
    //     seq_id: itemObj.seqId,
    //     part_seq_id: partSeqId,
    //     item_name: data.itemName,
    //   };
    //   console.log(contents);
    //   dispatch(items.updateItemMiddleware(itemObj.seqId, contents));
    // } else if (modalType === "삭제") {
    //   dispatch(items.deleteItemMiddleware(seqId));
    // }
  

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  return (
    <Modal open={open} modalType={modalType}>
      <form id="formData" onSubmit={onSubmit}>
        {modalType === "삭제" ? null : (
          <>
            <Autocomplete
              className={classes.textField}
              
              //value={partNameData}
              options={auto}
              filterOptions={filterOptions}
              // onChange={(event, newValue) => {
              //   if (newValue === null) {
              //     setPartSeqId("");
              //   } else {
              //     const index = partAutoData.findIndex(
              //       obj => obj.part_name === newValue
              //     );
              //     const partIndex = partAutoData[index].seq_id;
              //     setPartNameData(newValue);
              //     setPartSeqId(partIndex);
              //   }
              // }}
              defaultValue={modalType === "수정" ? itemObj.partName : ""}
              renderInput={params => (
                <TextField {...params} name="partName" label="파트명" variant="outlined"  />
              )}
            />
            <TextField
              className={classes.textField}
              name="itemName"
              label="장치명"
              variant="outlined"
              defaultValue={modalType === "수정" ? itemObj.itemName : ""}
            />
          </>
        )}
        <Button type="submit" form="formData" className={classes.button} color="info" round>
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
