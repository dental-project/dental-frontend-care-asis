import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { apis } from "apis/axios";

import { useDispatch, useSelector } from "react-redux";
import { dentals } from "modules/dentals";

// Soft UI Dashboard React components
import SuiButton from "components/Sui/SuiButton";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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



const PrintModalContainer = ({ open, close, printData}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, count } = useSelector(({ dental }) => dental);
  const [printType, setPrintType] = useState([]);
  const [reportSeqId, setReportSeqId] =useState("");

  const vendorNameArr = [];

  data.map(data => {
    vendorNameArr.push(data.vendorName);
  });

  const set1 = new Set(vendorNameArr);

  useEffect(() => {
    apis
      .getReportCode()
      .then((result) => {
        setPrintType(result.data);
      })
      .catch((error) => {
        throw new Error(error);
      });

  },[]);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
  }, [] );


  const handleChange = (e) => {
    setReportSeqId(e.target.value);
  }

  const onReportPrint = (e) => {
    e && e.preventDefault();

    if (reportSeqId === "")
      return alert("출력 타입을 선택하세요.");
    
    printData.reportSeqId = reportSeqId;
   
    apis
      .reportPrint(reportSeqId, { data: printData } )
      .then(result => {
        var b = new Blob([result.data], { type: "application/pdf;" });
        var url = URL.createObjectURL(b);
        window.open(url, "_blank", "");
      })
      .catch(err => {
        alert(err);
      });

    }

    return (
      <Modal open={open} modalType={"PDF 출력"}>
        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel id="demo-simple-select-outlined-label">타입선택</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            defaultValue={""}
            onChange={handleChange}
            label="타입선택"
          >
            {
              printType.map(data => (
                <MenuItem key={data.seqId} value={data.seqId}>{data.reportName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <SuiButton
        
          variant="contained"
          color="info"
          size="medium"
          onClick={(e) => onReportPrint(e)}
          style={{float: "right", margin: "7px"}}
        >
          출력
        </SuiButton>
      
      <SuiButton
          style={{float: "right", marginTop: "7px"}}
          variant="contained"
          color="secondary"
          size="medium"
          onClick={close}
        >
          취소
        </SuiButton>
      </Modal>
    );
}

export default PrintModalContainer;
