import React, { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { prices } from "modules/prices";
import { dentals } from "modules/dentals";
import { items } from "modules/items";

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

const PriceModalContainer = ({ modalType, open, close, seqId, priceObj }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dentalAutoData = useSelector(({ dental }) => dental.data);
  const itemAutoData = useSelector(({ item }) => item.data);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    dispatch(items.getItemMiddleware());
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const auto1 = [];
  dentalAutoData.map(data => auto1.push(data.vendorName + "/" + data.ceo));

  const auto2 = [];
  itemAutoData.map(data => auto2.push(data.itemName));

  const onSubmit = (e) => {
    e && e.preventDefault();

    if (modalType === "단가삭제") {
      dispatch(prices.deletePriceMiddleware(seqId));
      return;
    }

    let formData = new FormData(document.getElementById("formData"));
    const vendorName = formData.get("vendorName");
    const itemName = formData.get("itemName");
    const price = formData.get("price");
    const vendorNameArr = vendorName.split("/");

    if (vendorNameArr[0] === "" || itemName === "" || price === "")
      return alert("빈칸없이 입력하세요");

    const vendorNameIndex = dentalAutoData.findIndex(
      obj => obj.vendorName === vendorNameArr[0]
    );
    const itemNameIndex = itemAutoData.findIndex(
      obj => obj.itemName === itemName
    );

    if (modalType === "추가") {
      const content = {
        vendorSeqId: dentalAutoData[vendorNameIndex].seqId,
        itemSeqId: itemAutoData[itemNameIndex].seqId,
        price: price,
      };
      
      dispatch(prices.addPriceMiddleware(content));

    } else if (modalType === "단가수정") {
      const contents = {
        seqId: priceObj.seqId,
        vendorSeqId: dentalAutoData[vendorNameIndex].seqId,
        itemSeqId: itemAutoData[itemNameIndex].seqId,
        price: price,
      };

      dispatch(prices.updatePriceMiddleware(priceObj.seqId, contents));

    } 
  };

  return (
    <Modal open={open} modalType={modalType}>
      <form id="formData" onSubmit={onSubmit}>
        {modalType === "단가삭제" ? (
          <>
            <div style={{paddingTop: "50px",textAlign: "center" }}>{priceObj.vendorName}</div>
            <div style={{paddingBottom: "50px",textAlign: "center" }}>{priceObj.itemName}</div>
          </>
        ) : (
          <>
            <Autocomplete
              className={classes.textField}
              options={auto1}
              filterOptions={filterOptions}
              defaultValue={modalType === "단가수정" ? priceObj.vendorName : ""}
              renderInput={params => (
                <TextField
                  {...params}
                  name="vendorName"
                  label="거래처명"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              className={classes.textField}
              options={auto2}
              filterOptions={filterOptions}
              defaultValue={modalType === "단가수정" ? priceObj.itemName : ""}
              renderInput={params => (
                <TextField
                  {...params}
                  name="itemName"
                  label="장치명"
                  variant="outlined"
                />
              )}
            />
            <TextField
              className={classes.textField}
              name="price"
              label="단가"
              variant="outlined"
              defaultValue={modalType === "단가수정" ? priceObj.price : ""}
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

export default PriceModalContainer;
