import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Modal from "components/Modal/Modal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { receptions } from "modules/receptions";
import { dentals } from "modules/dentals";
import "tui-grid/dist/tui-grid.css";
import ToastGrid from "@toast-ui/react-grid";
import RowRemoveRenderer from "components/ToastGridRenderer/RowRemoveRenderer.js";

import { apis } from "apis/axios";
import axios from "axios";
import ButtonUpload from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    width: "97%",
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
  textField2: {
    float: "left",
    marginTop: "20px",
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
    marginTop: "20px",
  },
}));

const ReceptionModalContainer = ({
  modalType,
  open,
  close,
  seqId,
  selectReceptionData,
  selectDetailData,
}) => {
  const classes = useStyles();
  const gridRef = React.createRef();

  const dispatch = useDispatch();
  const dentalAutoData = useSelector(({ dental }) => dental.data);
  const [vendorSelectData, setVendorSelectData] = useState([]);
  const [detailDataArr, setDetailDataArr] = useState(selectDetailData);
  const [deleteDetailArr, setDeleteDetailArr] = useState([]);

  useEffect(() => {
    setDetailDataArr(selectDetailData);
  }, [selectDetailData]);

  console.log(dentalAutoData);

  // useEffect(() => {
  //   if (modalType === "접수수정") {
     
  //     const index = dentalAutoData.findIndex(
  //       obj => obj.vendorName === selectReceptionData.vendorName
  //     );
  //     const vendorSeqId = dentalAutoData[index].seqId;

  //     apis
  //       .vendorSelectPrice({
  //         vendorSeqId: vendorSeqId,
  //       })
  //       .then(result => {
  //         const selectData = result.data;
  //         setVendorSelectData(selectData);
  //       })
  //       .catch(err => {
  //         alert(err);
  //       });

  //     // axios
  //     // .get(`/api/vendor/${vendorSeqId}/price/`)
  //     //   .then(result => {
  //     //     console.log(result);
  //     //   const selectData = result.data;
  //     //   setVendorSelectData(selectData);
  //     // })
  //     // .catch(error => {
  //     //   throw new Error(error);
  //     // });

  //   }
  // }, [selectReceptionData.seqId]);
  
  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
  }, [dispatch]);

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
  };

  const onRemoveButtonClicked = seqId => {

    setDeleteDetailArr([]);

    const detailArr = detailDataArr.filter((data) => 
      data.seqId !== seqId 
    )

    setDeleteDetailArr([
      ...deleteDetailArr,
      seqId
    ]);

    setDetailDataArr(detailArr);
    
  };


  const filterVendorName = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const vendorNameAuto = [];
  dentalAutoData.map(data => vendorNameAuto.push(data.vendorName));

  const newArray = vendorSelectData
    .filter(
      (arr, index, callback) =>
        index === callback.findIndex(t => t.partName === arr.partName)
    )
    .map(data => {
      return { text: data.partName, value: data.partName };
    });

  const deduplication = (name, val) => {
    typeof Storage !== "undefined" &&
      localStorage.setItem(name, JSON.stringify(val));
  };

  deduplication("name", newArray);

  var something = {};

  for (let i = 0; i < newArray.length; i++) {
    something[newArray[i].value] = vendorSelectData
      .filter(data => data.partName === newArray[i].value)
      .map(data => {
        return { text: data.itemName, value: data.itemName };
      });
  }

  const columns = [
    {
      header: "파트명 (선택)",
      name: "partName",
      editor: {
        type: "select",
        options: {
          listItems: newArray,
        },
      },
      validation: { required: true },
      relations: [
        {
          targetNames: ["itemName"],
          listItems({ value }) {
            return something[value];
          },
          disabled({ value }) {
            return !value;
          },
        },
      ],
    },
    {
      header: "장치명 (선택)",
      name: "itemName",
      editor: {
        type: "select",
        options: {
          listItems: [],
        },
      },
      validation: { required: true },
    },
    {
      header: "단가",
      name: "unitPrice",
      validation: { required: true },
    },
    {
      header: "수량 (입력)",
      name: "amount",
      editor: "text",
      validation: { required: true },
    },
    {
      header: "정상가",
      name: "normalPrice",
      validation: { required: true },
    },
    {
      header: "할인금액 (입력)",
      name: "discountPrice",
      editor: "text",
      validation: { required: true },
    },
    {
      header: "최종금액",
      name: "realSellPrice",
      validation: { required: true },
    },
    {
      header: "할인율 ",
      name: "discount",
      validation: { required: true },
    },
    {
      name: "update",
      header: "삭제",
      align: "center",
      renderer: {
        type: RowRemoveRenderer,
        options: {
          onRemoveButtonClicked,
        },
      },
    },
  ];

  const onSubmit = e => {
    e && e.preventDefault();

    if(modalType === "삭제") {
      
      dispatch(receptions.deleteReceptionMiddleware(seqId));
     
    }


    let formData = new FormData(document.getElementById("formData"));

    const receiptDate = formData.get("receiptDate");
    const completionDate = formData.get("completionDate");
    const deliveryDate = formData.get("deliveryDate");
    const vendorName = formData.get("vendorName");
    const chartNumber = formData.get("chartNumber");
    const patientName = formData.get("patientName");
    const description = formData.get("description");
    const upper = formData.get("upper");
    const lower = formData.get("lower");
    const bite = formData.get("bite");
    const appliance = formData.get("appliance");
    const requestForm = formData.get("requestForm");

    if (
      receiptDate === "" ||
      completionDate === "" ||
      vendorName === "" ||
      patientName === ""
    )
      return alert("빈칸없이 입력하세요");
    
    const index = dentalAutoData.findIndex(
      obj => obj.vendorName === vendorName
    );

    // const master = {
    //   receiptDate: receiptDate,
    //   completionDate: completionDate,
    //   deliveryDate: deliveryDate,
    //   chartNumber: parseInt(chartNumber),
    //   upper: upper === "" ? true : false,
    //   lower: lower === "" ? true : false,
    //   bite: bite === "" ? true : false,
    //   appliance: appliance === "" ? true : false,
    //   patientName: patientName,
    //   description: description,
    //   vendorSeqId: dentalAutoData[index].seqId,
    //   requestForm: requestForm,
    // };

    const form = new FormData();

    

    const gridArr = gridRef.current.getInstance().getData();

    if (gridArr.length === 0) return alert("그리드 행을 추가 해주세요.");

    for (let i = 0; i < gridArr.length; i++) {
      if (gridArr[i].partName === null || gridArr[i].partName === "") {
        return alert(i + 1 + "번째 행 파트명을 선택하세요.");
      } else if (gridArr[i].itemName === null || gridArr[i].itemName === "") {
        return alert(i + 1 + "번째 행 장치명을 선택하세요.");
      } else if (gridArr[i].amount === null || gridArr[i].amount === "") {
        return alert(i + 1 + "번째 행 수량을 입력하세요.");
      } else if (
        gridArr[i].discountPrice == null ||
        gridArr[i].discountPrice === ""
      ) {
        return alert(i + 1 + "번째 행 할인금액을 입력하세요.");
      }
    }

    const detail = [];
   
    for (let i = 0; i < gridArr.length; i++) {
      let element = vendorSelectData.filter(
        data => data.itemName === gridArr[i].itemName
      );

      detail.push({
        //master_seq_id: "", //  master_seq_id  // receptionObj.seqId
        seqId: gridArr[i].seqId,
        itemSeqId: element[0].itemSeqId,
        amount: parseInt(gridArr[i].amount),
        normalPrice: gridArr[i].normalPrice,
        realSellPrice: parseInt(gridArr[i].realSellPrice),
        discount: parseFloat(gridArr[i].discount),
      });
    }

    form.append("receiptDate", receiptDate);
    form.append("completionDate", completionDate);
    form.append("deliveryDate", deliveryDate);
    form.append("chartNumber", parseInt(chartNumber));
    form.append("upper", upper === "" ? true : false);
    form.append("lower", lower === "" ? true : false);
    form.append("bite", bite === "" ? true : false);
    form.append("appliance", appliance === "" ? true : false);
    form.append("patientName", patientName);
    form.append("description", description);
    form.append("vendorSeqId", dentalAutoData[index].seqId);

    if(modalType === "접수수정" && requestForm.name === "") {
      //form.append("requestForm", selectReceptionData.requestForm); 
      console.log("dz");
    } else {
      form.append("requestForm", requestForm); 
    }
    
    form.append("detail", JSON.stringify(detail));
   
    if (modalType === "추가") {
 
      dispatch(receptions.addReceptionMiddleware(form));
    } else if (modalType === "접수수정") {

      form.append("deleteRow", [deleteDetailArr]);
   
      dispatch(receptions.updateReceptionMiddleware(selectReceptionData.seqId, form));
    } 
      
  };

  const onChange = e => {
    const gridArr = gridRef.current.getInstance().getData();

    let rowId = e.changes[0].rowKey;
    var regNumber = /^[0-9]*$/;

    if (e.changes[0].columnName === "partName") {
      resetColumn(rowId, "itemReset");
    } else if (e.changes[0].columnName === "itemName") {
      let price = vendorSelectData.filter(data =>
        data.partName === gridArr[rowId].partName &&
        data.itemName === gridArr[rowId].itemName
      );

      resetColumn(rowId, "itemReset");
      setColumnValue(rowId, "unitPrice", price[0].unitPrice);
    } else if (e.changes[0].columnName === "amount") {

      if (regNumber.test(gridArr[rowId].amount) === false)
        return alert("정수만 입력 가능합니다.");

      resetColumn(rowId);
      setColumnValue(rowId, "normalPrice", gridArr[rowId].unitPrice * parseInt(gridArr[rowId].amount));

    } else if (e.changes[0].columnName === "discountPrice") {

      if (regNumber.test(gridArr[rowId].discountPrice) === false) {
        resetColumn(rowId);
        return alert("정수만 입력 가능합니다.");
      }
      if (parseInt(gridArr[rowId].discountPrice) > gridArr[rowId].normalPrice) {
        resetColumn(rowId);
        return alert("할인금액이 정상가보다 금액이 큽니다.");
      }
      setColumnValue(rowId, "realSellPrice", gridArr[rowId].normalPrice - parseInt(gridArr[rowId].discountPrice));
      setColumnValue(rowId, "discount", ((gridArr[rowId].discountPrice / gridArr[rowId].normalPrice) * 100).toFixed(2) + "%");
    }
  };

  const setColumnValue = (rowId, columnName, value) => {
    gridRef.current.getInstance().setValue(rowId, columnName, value, false);
  };

  const resetColumn = (rowId, type) => {
    if (type === "itemReset") {
      gridRef.current.getInstance().setValue(rowId, "unitPrice", "", false);
      gridRef.current.getInstance().setValue(rowId, "amount", "", false);
      gridRef.current.getInstance().setValue(rowId, "normalPrice", "", false);
    }

    gridRef.current.getInstance().setValue(rowId, "discountPrice", "", false);
    gridRef.current.getInstance().setValue(rowId, "realSellPrice", "", false);
    gridRef.current.getInstance().setValue(rowId, "discount", "", false);
  };

  return (
    <Modal
      open={open}
      modalType={modalType}
      screen={modalType === "삭제" ? false : true}
    >
      <form id="formData" onSubmit={onSubmit}>
        {modalType === "삭제" ? null : (
          <>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  type="date"
                  name="receiptDate"
                  label="접수일자"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.receiptDate : ""
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  type="date"
                  name="completionDate"
                  label="완성일자"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.completionDate : ""
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  type="date"
                  name="deliveryDate"
                  label="배달일자"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.deliveryDate : ""
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  className={classes.textField}
                  options={vendorNameAuto}
                  filterOptions={filterVendorName}
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.vendorName : ""
                  }
                  onChange={(event, newValue) => {

                    if (newValue !== null) {
                      const index = dentalAutoData.findIndex(
                        obj => obj.vendorName === newValue
                      );
                      const vendorSeqId = dentalAutoData[index].seqId;
                      gridRef.current.getInstance().restore();


                      apis
                        .vendorSelectPrice(
                          vendorSeqId,
                        )
                        .then(result => {
                          const selectData = result.data;
                          selectData
                            .filter(
                              (arr, index, callback) =>
                                index ===
                                callback.findIndex(
                                  t => t.partName === arr.partName
                                )
                            )
                            .map(data => {
                              return data.partName;
                            });

                          setVendorSelectData(selectData);
                        })
                        .catch(err => {
                          alert(err);
                        });


                      // axios
                      //   .get(
                      //     `/api/vendor/${vendorSeqId}/price/`
                      //   )
                      //   .then(result => {
       
                      //     const selectData = result.data;
                      //     selectData
                      //       .filter(
                      //         (arr, index, callback) =>
                      //           index ===
                      //           callback.findIndex(
                      //             t => t.partName === arr.partName
                      //           )
                      //       )
                      //       .map(data => {
                      //         return data.partName;
                      //       });

                      //     setVendorSelectData(selectData);
                      //   })
                      //   .catch(error => {
                      //     throw new Error(error);
                      //   });
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="vendorName"
                      label="거래처명"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  name="chartNumber"
                  label="차트번호"
                  variant="outlined"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.chartNumber : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  name="patientName"
                  label="환자명"
                  variant="outlined"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.patientName : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="description"
                  label="비고"
                  variant="outlined"
                  defaultValue={
                    modalType === "접수수정" ? selectReceptionData.description : ""
                  }
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  label="Upper"
                  control={
                    <Checkbox
                      className={classes.textField}
                      name="upper"
                      color="primary"
                      defaultChecked={
                        modalType === "접수수정" ? selectReceptionData.upper : false
                      }
                    />
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  label="Lower"
                  control={
                    <Checkbox
                      className={classes.textField}
                      name="lower"
                      color="primary"
                      defaultChecked={
                        modalType === "접수수정" ? selectReceptionData.lower : false
                      }
                    />
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  label="Bite"
                  control={
                    <Checkbox
                      className={classes.textField}
                      name="bite"
                      color="primary"
                      defaultChecked={
                        modalType === "접수수정" ? selectReceptionData.bite : false
                      }
                    />
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  label="Appliance"
                  control={
                    <Checkbox
                      className={classes.textField}
                      name="appliance"
                      color="primary"
                      defaultChecked={
                        modalType === "접수수정"
                          ? selectReceptionData.appliance
                          : false
                      }
                    />
                  }
                />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "30px", fontSize: "30px" }}
            >
              {"image.png"}
            </Grid>

            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="requestForm"
              name="requestForm"
              multiple
              type="file"
            />
            <label htmlFor="requestForm">
              <ButtonUpload component="span" className={classes.button}>
                Upload
              </ButtonUpload>
            </label>

            <Grid item xs={12}>
              <Button
                className={classes.button}
                color="info"
                round
                onClick={handleAppendRow}
              >
                그리드 행추가
              </Button>

              {modalType === "추가" ? (
                <ToastGrid
                  ref={gridRef}
                  columns={columns}
                  rowHeight={20}
                  bodyHeight={200}
                  virtualScrolling={true}
                  heightResizable={true}
                  rowHeaders={["rowNum"]}
                  onAfterChange={onChange}
                />
              ) : (
                <ToastGrid
                  ref={gridRef}
                  data={detailDataArr.map(data => {
                    return {
                      seqId: data.seqId,
                      partName: data.partName,
                      itemName: data.itemName,
                      unitPrice: data.unitPrice,
                      amount: data.amount,
                      normalPrice: data.normalPrice,
                      discountPrice: data.discountPrice,
                      realSellPrice: data.realSellPrice,
                      discount: data.discount,
                    };
                  })}
                  columns={columns}
                  rowHeight={20}
                  bodyHeight={200}
                  virtualScrolling={true}
                  heightResizable={true}
                  rowHeaders={["rowNum"]}
                  onAfterChange={onChange}
                />
              )}
            </Grid>
          </>
        )}
        <Button
          type="submit"
          form="formData"
          className={classes.button}
          color="info"
          round
        >
          {modalType}
        </Button>
      </form>
      <Button className={classes.button} color="danger" round onClick={close}>
        취소
      </Button>
    </Modal>
  );
};

export default ReceptionModalContainer;