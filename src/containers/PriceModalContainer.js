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
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch();

  const dentalAutoData = useSelector(({ dental }) => dental.data);
  const itemAutoData = useSelector(({ item }) => item.data);

  const [vendorSeqId, setVendorSeqId] = useState("");
  const [itemSeqId, setItemSeqId] = useState("");

  const [vendorNameData, setVendorNameData] = useState("");
  const [itemNameData, setItemNameData] = useState("");
  const [priceData, setPriceData] = useState("");

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    dispatch(items.getItemMiddleware());
  }, []);

  useEffect(() => {
    if (modalType === "단가수정") {
      setVendorNameData(priceObj.vendorName);
      setItemNameData(priceObj.itemName);
      setPriceData(priceObj.price);
    } else {
      setVendorNameData("");
      setItemNameData("");
      setPriceData("");
    }
  }, [open]);

  const auto1 = [];
  dentalAutoData.map(data => auto1.push(data.vendor_name + "/" + data.ceo));

  const auto2 = [];
  itemAutoData.map(data => auto2.push(data.item_name));

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const onSubmit = data => {
    if (modalType === "추가") {
      if (vendorSeqId == "") return alert("거래처명을 선택하세요.");
      if (itemSeqId == "") return alert("장치명을 선택하세요.");

      const content = {
        vendor_seq_id: vendorSeqId,
        item_seq_id: itemSeqId,
        price: data.price,
      };
      dispatch(prices.addPriceMiddleware(content));
    } else if (modalType === "단가수정") {
      const contents = {
        seq_id: priceObj.seqId,
        vendor_seq_id: vendorSeqId,
        item_seq_id: itemSeqId,
        price: priceObj.price,
      };

      dispatch(prices.updatePriceMiddleware(priceObj.seqId, contents));
    } else if (modalType === "삭제") {
      dispatch(prices.deletePriceMiddleware(seqId));
    }
  };

  return (
    <Modal open={open} modalType={modalType}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalType === "삭제" ? null : (
          <>
            <Autocomplete
              className={classes.textField}
              value={vendorNameData}
              options={auto1}
              filterOptions={filterOptions}
              onChange={(event, newValue) => {
                const vendorNameArr = newValue.split("/");
                if (newValue === null) {
                  setVendorSeqId("");
                } else {
                  const index = dentalAutoData.findIndex(
                    obj => obj.vendor_name === vendorNameArr[0]
                  );
                  const vendorSeqId = dentalAutoData[index].seq_id;
                  setVendorNameData(vendorNameArr[0]);
                  setVendorSeqId(vendorSeqId);
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="거래처명"
                  placeholder="Favorites"
                />
              )}
            />
            <Autocomplete
              className={classes.textField}
              value={itemNameData}
              options={auto2}
              filterOptions={filterOptions}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  setItemSeqId("");
                } else {
                  const index = itemAutoData.findIndex(
                    obj => obj.item_name === newValue
                  );
                  const itemIndex = itemAutoData[index].seq_id;
                  setItemNameData(newValue);
                  setItemSeqId(itemIndex);
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="장치명"
                  placeholder="Favorites"
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <TextField
                  className={classes.textField}
                  label="단가"
                  variant="outlined"
                  defaultValue={priceData}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "단가를 입력하세요.",
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

export default PriceModalContainer;
