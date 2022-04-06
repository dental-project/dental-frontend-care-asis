import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { apis } from "apis/axios";

import { useDispatch, useSelector } from "react-redux";
import { dentals } from "modules/dentals";



const useStyles = makeStyles((theme) => ({
    textField: {
      width: "95%",
      margin: theme.spacing(1),
      '& label.Mui-focused': {
          color: '#00acc1',
      },
      '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
              borderColor: '#00acc1',
          },
      },
    },
    inputs: {
      '& label.Mui-focused': {
        color: '#26c6da',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#26c6da',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#26c6da',
        },
      },
    },
    button: {
      width: "100%"
    }
  }));



const PrintModalContainer = ({ open, close}) => {

  const classes = useStyles();
  
  const dispatch = useDispatch();
  const { data, count } = useSelector(({ dental }) => dental);

  const [vendorName, setVendorName] = useState('');
  const [type, setType] = useState('');

  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());


  const vendorNameArr = [];

  data.map(data => {
    vendorNameArr.push(data.vendorName);
  });

  const set1 = new Set(vendorNameArr);
  const vendorAutoData = [...set1];

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
  }, [] );

  const vendor = ["Dental.A 치과기공소", "거래처명", "거래처명2"];
  const dash1 = ["시간별완성현황", "일생산현황", "치과매출현황", "파트별매출현황", "치과별월매출현황", "월생산현황표"];
  


  


  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option,
  });


const onSubmit = (e) => {
  e && e.preventDefault();

  let formData = new FormData(document.getElementById("formData"));
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const vendorName = formData.get("vendorName");
  const type = formData.get("type");

  if (startDate === "" || endDate === "" || vendorName === "" || type === "")
    return alert("모두 선택해주세요");
  
  const index = vendorAutoData.findIndex(data => data === vendorName);
  
  apis
    .receptionReport({
      data: {
        receiptDate: startDate,
        completionDate: endDate,
        vendorSeqId: data[index].seqId,
        reportType: type,
      },
    })
    .then(result => {
      console.log(result);
      var b = new Blob([result.data], { type: "application/pdf;" });
      var url = URL.createObjectURL(b);
      window.open(url, "_blank", "");
    })
    .catch(err => {
      alert(err);
    });

    // axios({
    //   method: "POST",
    //   url: "/api/sell/report/",
    //   responseType: "blob",
    //   data: {
    //     receiptDate: data.startDate,
    //     completionDate: data.endDate,
    //     vendorSeqId: vendorSeqId,
    //     reportType: type,
    //   },
    // })
    //   .then(result => {
    //     console.log(result);
    //     var b = new Blob([result.data], { type: "application/pdf;" });
    //     var url = URL.createObjectURL(b);
    //     window.open(url, "_blank", "");
    //   })
    //   .catch(error => {
    //     throw new Error(error);
    //   });
      
    }

    return (
      <Modal open={open}>
        <form id="formData" onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            type="date"
            name="startDate"
            label="시작일자"
            defaultValue={startDateValue}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={classes.textField}
            type="date"
            name="endDate"
            label="종료일자"
            defaultValue={endDateValue}
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            className={classes.textField}
            options={vendorAutoData}
            filterOptions={filterOptions}
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
            options={dash1}
            filterOptions={filterOptions}
            renderInput={params => (
              <TextField
                {...params}
                name="type"
                label="항목선택"
                variant="outlined"
              />
            )}
          />
          <Button
            type="submit"
            form="formData"
            className={classes.button}
            color="info"
            round
          >
            {"출력"}
          </Button>
        </form>
        <Button className={classes.button} color="danger" round onClick={close}>
          취소
        </Button>
      </Modal>
    );
}

export default PrintModalContainer;
