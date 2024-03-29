import React, { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { dentals } from 'modules/dentals';
import { businessTypes } from 'modules/businessTypes';
import { businessSectors } from 'modules/businessSectors';
import { banks } from 'modules/banks';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

// Soft UI Dashboard React components
import SuiButton from "components/Sui/SuiButton";

const useStyles = makeStyles(theme => ({
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
  }
}));

const DentalModalContainer = ({ modalType, open, close, seqId, dentalObj }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const businessTypeAutoData = useSelector(({businessType}) => businessType.data);
  const businessSectorAutoData = useSelector(({businessSector}) => businessSector.data);
  const bankAutoData = useSelector(({bank}) => bank.data);
  const [businessTypeIndex, setBusinessTypeIndex] = useState(0);
  const [businessSectorIndex, setBusinessSectorIndex] = useState(0);
  const [bankIndex, setBankIndex] = useState(0);

  useEffect(() => {
    dispatch(businessTypes.getBusinessTypeMiddleware());
    dispatch(businessSectors.getBusinessSectorMiddleware());
    dispatch(banks.getBankMiddleware());
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const autoType = [];
  businessTypeAutoData.map(data =>
    autoType.push(data.typeName)
  );

  const autoSector = [];
  businessSectorAutoData.map(data =>
    autoSector.push(data.sectorName)
  );

  const autoBank = [];
  bankAutoData.map(data =>
    autoBank.push(data.bankName)
  );
  
  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formData"));

    const vendorName = formData.get("vendorName");
    const ceo = formData.get("ceo");
    const tel = formData.get("tel");
    const mobile = formData.get("mobile");
    const fax = formData.get("fax");
    const businessNumber = formData.get("businessNumber");
    const businessTypeName = formData.get("businessTypeName");
    const businessSectorName = formData.get("businessSectorName");
    const postNumber = formData.get("postNumber");
    const address = formData.get("address");
    const bankName = formData.get("bankName");
    const bankAccount = formData.get("bankAccount");
    const description = formData.get("description");
    
    if (vendorName === "" || ceo === "" || businessNumber === "")
      return alert("빈칸없이 입력하세요");

    if (businessTypeName !== "") {
      setBusinessTypeIndex(businessTypeAutoData.findIndex(
        obj => obj.typeName === businessTypeName
      ));
    }
   
    if (businessSectorName !== "") {
      setBusinessSectorIndex(
        businessSectorAutoData.findIndex(
          obj => obj.sectorName === businessSectorName
        )
      );
    }

    if (bankName !== "") {
      setBankIndex(bankAutoData.findIndex(
        obj => obj.bankName === bankName
      ));
    }
 
    if (modalType === "추가") {
      const contents = {
        vendorName: vendorName,
        ceo: ceo,
        tel: tel,
        mobile: mobile,
        fax: fax,
        businessNumber: businessNumber,
        businessTypeNo:
          businessTypeName !== ""
            ? businessTypeAutoData[businessTypeIndex].typeNo
            : "",
        businessSectorNo:
          businessSectorName !== ""
            ? businessSectorAutoData[businessSectorIndex].sectorNo
            : "",
        postNumber: postNumber,
        address: address,
        bankNo: bankName !== "" ? bankAutoData[bankIndex].banknNo : "",
        bankAccount: bankAccount,
        description: description,
      };
      dispatch(dentals.addDentalMiddleware(contents));
    } else if (modalType === "치과수정") {
      const contents = {
        seqId: dentalObj.seqId,
        vendorName: vendorName,
        ceo: ceo,
        tel: tel,
        mobile: mobile,
        fax: fax,
        businessNumber: businessNumber,
        businessTypeNo: businessTypeAutoData[businessTypeIndex].typeNo,
        businessSectorNo: businessSectorAutoData[businessSectorIndex].sectorNo,
        postNumber: postNumber,
        address: address,
        bankNo: bankAutoData[bankIndex].bankNo,
        bankAccount: bankAccount,
        description: description,
      };
      
      dispatch(dentals.updateDentalMiddleware(dentalObj.seqId, contents));
    } else if (modalType === "치과삭제") {

      if (window.confirm("정말 삭제 하시겠습니까?")) {
        dispatch(dentals.deleteDentalMiddleware(seqId));
      }
      
    }
  }

  return (
    <Modal open={open} modalType={modalType} maxWidth={"xs"}>
      <form id="formData" onSubmit={onSubmit}>
        {modalType === "치과삭제" ? (
          <TextField
            className={classes.textField}
            label="거래처명"
            variant="outlined"
            disabled={true}
            defaultValue={dentalObj.vendorName}
          />
        ) : (
          <>
            <TextField
              className={classes.textField}
              name="vendorName"
              label="거래처명"
              variant="outlined"
              defaultValue={
                modalType === "치과수정" ? dentalObj.vendorName : ""
              }
            />
            <TextField
              className={classes.textField}
              name="ceo"
              label="대표명"
              variant="outlined"
              defaultValue={modalType === "치과수정" ? dentalObj.ceo : ""}
            />
            <TextField
              className={classes.textField}
              name="tel"
              label="전화번호"
              variant="outlined"
              defaultValue={modalType === "치과수정" ? dentalObj.tel : ""}
            />
            <TextField
              className={classes.textField}
              name="mobile"
              label="휴대폰번호"
              variant="outlined"
              defaultValue={modalType === "치과수정" ? dentalObj.mobile : ""}
            />
            <TextField
              className={classes.textField}
              name="fax"
              label="팩스번호"
              variant="outlined"
              defaultValue={modalType === "치과수정" ? dentalObj.fax : ""}
            />
            <TextField
              className={classes.textField}
              name="businessNumber"
              label="사업자번호"
              variant="outlined"
              defaultValue={
                modalType === "치과수정" ? dentalObj.businessNumber : ""
              }
            />
            <Autocomplete
              className={classes.textField}
              options={autoType}
              filterOptions={filterOptions}
              defaultValue={
                modalType === "치과수정" ? dentalObj.businessTypeName : ""
              }
              renderInput={params => (
                <TextField
                  {...params}
                  name="businessTypeName"
                  label="업태"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              className={classes.textField}
              options={autoSector}
              filterOptions={filterOptions}
              defaultValue={
                modalType === "치과수정" ? dentalObj.businessSectorName : ""
              }
              renderInput={params => (
                <TextField
                  {...params}
                  name="businessSectorName"
                  label="업종"
                  variant="outlined"
                />
              )}
            />
            <TextField
              className={classes.textField}
              name="postNumber"
              label="우편번호"
              variant="outlined"
              defaultValue={
                modalType === "치과수정" ? dentalObj.postNumber : ""
              }
            />
            <TextField
              className={classes.textField}
              name="address"
              label="주소"
              variant="outlined"
              defaultValue={modalType === "치과수정" ? dentalObj.address : ""}
            />
            <Autocomplete
              className={classes.textField}
              options={autoBank}
              filterOptions={filterOptions}
              defaultValue={modalType === "치과수정" ? dentalObj.bankName : ""}
              renderInput={params => (
                <TextField
                  {...params}
                  name="bankName"
                  label="은행"
                  variant="outlined"
                />
              )}
            />
            <TextField
              className={classes.textField}
              name="bankAccount"
              label="계좌번호"
              variant="outlined"
              defaultValue={
                modalType === "치과수정" ? dentalObj.bankAccount : ""
              }
            />
            <TextField
              className={classes.textField}
              name="description"
              label="비고"
              variant="outlined"
              defaultValue={
                modalType === "치과수정" ? dentalObj.description : ""
              }
            />
          </>
        )}
        <SuiButton
          type="submit"
          form="formData"
          variant="contained"
          color="info"
          size="medium"
          style={{float: "right", margin: "7px"}}
        >
          {modalType}
        </SuiButton>
      </form>
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
};

export default DentalModalContainer;
