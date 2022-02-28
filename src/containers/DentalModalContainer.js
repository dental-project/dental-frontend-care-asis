import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from 'react-redux';

import { dentals } from 'modules/dentals';
import { businessTypes } from 'modules/businessTypes';
import { businessSectors } from 'modules/businessSectors';
import { banks } from 'modules/banks';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

const DentalModalContainer = ({ modalType, open, close, seqId, dentalObj }) => {

    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const dispatch = useDispatch();

    const businessTypeAutoData = useSelector(({businessType}) => businessType.data);
    const businessSectorAutoData = useSelector(({businessSector}) => businessSector.data);
    const bankAutoData = useSelector(({bank}) => bank.data);

    const [typeNo, setTypeNo] = useState("");
    const [sectorNo, setSectorNo] = useState("");
    const [bankNo, setBankNo] = useState("");
    const [businessTypeData, setBusinessTypeData] = useState("");
    const [businessSectorData, setBusinessSectorData] = useState("");
    const [bankData, setBankData] = useState("");
  
    useEffect(() => {
      dispatch(businessTypes.getBusinessTypeMiddleware());
      dispatch(businessSectors.getBusinessSectorMiddleware());
      dispatch(banks.getBankMiddleware());
    }, []);
   
  useEffect(() => {
    if (modalType === "치과수정") {
      setBusinessTypeData(dentalObj.businessTypeName)
      setBusinessSectorData(dentalObj.businessSectorName);
      setBankData(dentalObj.bankName);
    } else {
      setBusinessTypeData("");
      setBusinessSectorData("");
      setBankData("");
    }
    }, [
      dentalObj.businessTypeName,
      dentalObj.businessSectorName,
      dentalObj.bankName,
    ]);

    const autoType = [];
    businessTypeAutoData.map(data =>
      autoType.push(data.type_name)
    );

    const autoSector = [];
    businessSectorAutoData.map(data =>
      autoSector.push(data.sector_name)
    );

    const autoBank = [];
    bankAutoData.map(data =>
      autoBank.push(data.bank_name)
    );
    
    const onSubmit = (data) => {

      console.log(data);

      if(modalType === "추가") {

        if(typeNo === "") return alert("업태를 선택하세요");
        if(sectorNo === "") return alert("업종을 선택하세요");
        if(bankNo === "") return alert("은행을 선택하세요");

        const contents = {
          vendor_name: data.vendorName,
          ceo: data.ceo,
          tel: data.tel,
          mobile: data.mobile,
          fax: data.fax,
          business_number: data.businessNumber,
          business_type_no: typeNo,
          business_sector_no: sectorNo,
          post_number: data.postNumber,
          address: data.address,
          bank_no: bankNo,
          bank_account: data.bankAccount,
          description: data.description
        };
    
        dispatch(dentals.addDentalMiddleware(contents));

      } else if(modalType === "치과수정") {
        
        if(typeNo === "") return alert("업태를 선택하세요");
        if(sectorNo === "") return alert("업종을 선택하세요");
        if(bankNo === "") return alert("은행을 선택하세요");

        const contents = {
          seq_id: dentalObj.seqId,
          vendor_name: data.vendorName,
          ceo: data.ceo,
          tel: data.tel,
          mobile: data.mobile,
          fax: data.fax,
          business_number: data.businessNumber,
          business_type_no: typeNo,
          business_sector_no: sectorNo,
          post_number: data.postNumber,
          address: data.address,
          bank_no: bankNo,
          bank_account: data.bankAccount,
          description: data.description
        };
       
        dispatch(dentals.updateDentalMiddleware(dentalObj.seqId, contents))
    
      } else if(modalType === "삭제") {
        dispatch(dentals.deleteDentalMiddleware(seqId));
      }      
    }

    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option,
    });

    return (
      <Modal open={open} modalType={modalType}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {modalType === "삭제" ? null : (
            <>
              <Controller
                name="vendorName"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="거래처명"
                    variant="outlined"
                    defaultValue={
                      dentalObj.vendorName ? dentalObj.vendorName : ""
                    }
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "거래처명을 입력하세요.",
                }}
              />
              <Controller
                name="ceo"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="대표명"
                    variant="outlined"
                    defaultValue={dentalObj.ceo ? dentalObj.ceo : ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "대표명을 입력하세요.",
                }}
              />
              <Controller
                name="tel"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="전화번호"
                    variant="outlined"
                    defaultValue={dentalObj.tel ? dentalObj.tel : ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "전화번호를 입력하세요.",
                }}
              />
              <Controller
                name="mobile"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="휴대폰번호"
                    variant="outlined"
                    defaultValue={dentalObj.mobile ? dentalObj.mobile : ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "전화번호를 입력하세요.",
                }}
              />
              <Controller
                name="fax"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="팩스번호"
                    variant="outlined"
                    defaultValue={dentalObj.fax ? dentalObj.fax : ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "팩스번호를 입력하세요.",
                }}
              />
              <Controller
                name="businessNumber"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="사업자번호"
                    variant="outlined"
                    defaultValue={
                      dentalObj.businessNumber ? dentalObj.businessNumber : ""
                    }
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "사업자번호를 입력하세요.",
                }}
              />
              <Autocomplete
                className={classes.textField}
                value={businessTypeData}
                options={autoType}
                filterOptions={filterOptions}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setTypeNo("");
                  } else {
                    const index = businessTypeAutoData.findIndex(
                      obj => obj.type_name === newValue
                    );
                    const typeIndex = businessTypeAutoData[index].type_no;
                    setBusinessTypeData(newValue);
                    setTypeNo(typeIndex);
                    console.log(newValue);
                  }
                }}
                renderInput={params => (
                  <TextField {...params} label="업태" variant="outlined" />
                )}
              />
              <Autocomplete
                className={classes.textField}
                value={modalType === "치과수정" ? businessSectorData : ""}
                options={autoSector}
                filterOptions={filterOptions}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setSectorNo("");
                  } else {
                    const index = businessSectorAutoData.findIndex(
                      obj => obj.sector_name === newValue
                    );
                    const sectorIndex = businessSectorAutoData[index].sector_no;
                    setBusinessSectorData(newValue);
                    setSectorNo(sectorIndex);
                  }
                }}
                renderInput={params => (
                  <TextField {...params} label="업종" variant="outlined" />
                )}
              />
              <Controller
                name="postNumber"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="우편번호"
                    variant="outlined"
                    defaultValue={
                      dentalObj.postNumber ? dentalObj.postNumber : ""
                    }
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "우편번호를 입력하세요.",
                }}
              />
              <Controller
                name="address"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="주소"
                    variant="outlined"
                    defaultValue={dentalObj.address ? dentalObj.address : ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "주소를 입력하세요.",
                }}
              />
              <Autocomplete
                className={classes.textField}
                value={modalType === "치과수정" ? bankData : null}
                options={autoBank}
                filterOptions={filterOptions}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setBankNo("");
                  } else {
                    const index = bankAutoData.findIndex(
                      obj => obj.bank_name === newValue
                    );
                    const bankIndex = bankAutoData[index].bank_no;
                    setBankData(newValue);
                    setBankNo(bankIndex);
                  }
                }}
                renderInput={params => (
                  <TextField {...params} label="은행" variant="outlined" />
                )}
              />
              <Controller
                name="bankAccount"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="계좌번호"
                    variant="outlined"
                    defaultValue={
                      dentalObj.bankAccount ? dentalObj.bankAccount : ""
                    }
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "계좌번호를 입력하세요.",
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.textField}
                    label="비고"
                    variant="outlined"
                    defaultValue={
                      dentalObj.description ? dentalObj.description : ""
                    }
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
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
}

export default DentalModalContainer;
