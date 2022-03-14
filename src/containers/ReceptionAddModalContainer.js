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
  receptionObj,
  selectDetailData,
}) => {
  const classes = useStyles();
  const gridRef = React.createRef();

  const dispatch = useDispatch();
  const dentalAutoData = useSelector(({ dental }) => dental.data);
  const receptionData = useSelector(({ reception }) => reception.data);

  const [vendorSelectData, setVendorSelectData] = useState([]);

 
  useEffect(() => {
    if (modalType === "접수수정") {
     
      const index = dentalAutoData.findIndex(
        obj => obj.vendor_name === receptionObj.vendorName
      );
      const vendorSeqId = dentalAutoData[index].seq_id;

      axios
      .get(`http://localhost:8000/api/vendor/${vendorSeqId}/price/`)
      .then(result => {
        const selectData = result.data;
        setVendorSelectData(selectData);
      })
      .catch(error => {
        throw new Error(error);
      });

      // axios
      //   .get(`http://localhost:8000/api/sell/master/${receptionObj.seqId}/details/`)
      //   .then(result => {
      //     console.log(result);
      //     const selectData = result.data;
      //     // const newArray = selectData
      //     //   .filter(
      //     //     (arr, index, callback) =>
      //     //       index === callback.findIndex(t => t.part_name === arr.part_name)
      //     //   )
      //     //   .map(data => {
      //     //     return data.part_name;
      //     //   });

      //     setVendorSelectData(selectData);
      //     //setPartAutoData(newArray);
      //     //console.log(selectData);
      //     //console.log(newArray);
      //   })
      //   .catch(error => {
      //     throw new Error(error);
      //   });
    }
  }, [receptionObj.seqId]);
  
  

  
  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
  }, [dispatch]);

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
  };

  const onRemoveButtonClicked = rowKey => {
    gridRef.current.getInstance().removeRow(rowKey);
  };

  const removeReceptionDetail = index => {};

  const filterVendorName = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const vendorNameAuto = [];
  dentalAutoData.map(data => vendorNameAuto.push(data.vendor_name));

  const newArray = vendorSelectData
    .filter(
      (arr, index, callback) =>
        index === callback.findIndex(t => t.part_name === arr.part_name)
    )
    .map(data => {
      return { text: data.part_name, value: data.part_name };
    });

  const deduplication = (name, val) => {
    typeof Storage !== "undefined" &&
      localStorage.setItem(name, JSON.stringify(val));
  };

  deduplication("name", newArray);

  var something = {};

  for (let i = 0; i < newArray.length; i++) {
    something[newArray[i].value] = vendorSelectData
      .filter(data => data.part_name === newArray[i].value)
      .map(data => {
        return { text: data.item_name, value: data.item_name };
      });
  }

  console.log(newArray);
  console.log(vendorSelectData);

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
    const request_form = formData.get("request_form");


    if (
      receiptDate === "" ||
      completionDate === "" ||
      vendorName === "" ||
      patientName === ""
    )
      return alert("빈칸없이 입력하세요");

    const index = dentalAutoData.findIndex(
      obj => obj.vendor_name === vendorName
    );

    const master = {
      receipt_date: receiptDate,
      completion_date: completionDate,
      delivery_date: deliveryDate,
      chart_number: parseInt(chartNumber),
      upper: upper === "" ? true : false,
      lower: lower === "" ? true : false,
      bite: bite === "" ? true : false,
      appliance: appliance === "" ? true : false,
      patient_name: patientName,
      description: description,
      vendor_seq_id: dentalAutoData[index].seq_id,
      request_form: request_form,
    };

    const form = new FormData();

    form.append("receipt_date", receiptDate);
    form.append("completion_date", completionDate);
    form.append("delivery_date", deliveryDate);
    form.append("chart_number", parseInt(chartNumber));
    form.append("upper", upper === "" ? true : false);
    form.append("lower", lower === "" ? true : false);
    form.append("bite", bite === "" ? true : false);
    form.append("appliance", appliance === "" ? true : false);
    form.append("patient_name", patientName);
    form.append("description", description);
    form.append("vendor_seq_id", dentalAutoData[index].seq_id);
    form.append("request_form", request_form); 

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
        data => data.item_name === gridArr[i].itemName
      );

      detail.push({
        //master_seq_id: "", //  master_seq_id  // receptionObj.seqId
        item_seq_id: element[0].item_seq_id,
        amount: parseInt(gridArr[i].amount),
        normal_price: gridArr[i].normalPrice,
        real_sell_price: parseInt(gridArr[i].discountPrice),
        discount: parseFloat(gridArr[i].discount),

      });
    }

    form.append("detail", JSON.stringify(detail));
    //const data = { form };

    
    console.log(form);
    
    


    if (modalType === "추가") {
      dispatch(receptions.addReceptionMiddleware(form));
    } else if (modalType === "접수수정") {
      //dispatch(receptions.updateReceptionMiddleware(receptionObj.seqId, data));
    }
      
      //dispatch(receptions.addReceptionPriceMiddleware(priceContents));
   

  };

  const onChange = e => {
    const gridArr = gridRef.current.getInstance().getData();

    let rowId = e.changes[0].rowKey;
    var regNumber = /^[0-9]*$/;

    //console.log(e.changes[0].columnName);

    if (e.changes[0].columnName === "partName") {
      resetColumn(rowId, "itemReset");
    } else if (e.changes[0].columnName === "itemName") {
      let price = vendorSelectData.filter(
        data =>
          data.part_name === gridArr[rowId].partName &&
          data.item_name === gridArr[rowId].itemName
      );

      resetColumn(rowId, "itemReset");
      setColumnValue(rowId, "unitPrice", price[0].unit_price);
    } else if (e.changes[0].columnName === "amount") {
      if (regNumber.test(gridArr[rowId].amount) === false)
        return alert("정수만 입력 가능합니다.");

      resetColumn(rowId);
      setColumnValue(
        rowId,
        "normalPrice",
        gridArr[rowId].unitPrice * parseInt(gridArr[rowId].amount)
      );
    } else if (e.changes[0].columnName === "discountPrice") {
      if (regNumber.test(gridArr[rowId].discountPrice) === false) {
        resetColumn(rowId);
        return alert("정수만 입력 가능합니다.");
      }
      if (parseInt(gridArr[rowId].discountPrice) > gridArr[rowId].normalPrice) {
        resetColumn(rowId);
        return alert("할인금액이 정상가보다 금액이 큽니다.");
      }
      setColumnValue(
        rowId,
        "realSellPrice",
        gridArr[rowId].normalPrice - parseInt(gridArr[rowId].discountPrice)
      );
      setColumnValue(
        rowId,
        "discount",
        (
          (gridArr[rowId].discountPrice / gridArr[rowId].normalPrice) *
          100
        ).toFixed(2) + "%"
      );
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
                    modalType === "접수수정" ? receptionObj.receiptDate : ""
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
                    modalType === "접수수정" ? receptionObj.completionDate : ""
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
                    modalType === "접수수정" ? receptionObj.deliveryDate : ""
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
                    modalType === "접수수정" ? receptionObj.vendorName : ""
                  }
                  onChange={(event, newValue) => {
                    if (newValue === null) {
                      //setVendorId("");
                    }
                    if (newValue !== null) {
                      const index = dentalAutoData.findIndex(
                        obj => obj.vendor_name === newValue
                      );
                      const vendorSeqId = dentalAutoData[index].seq_id;

                      // const length = gridRef.current.getInstance().getData().length;

                      // // for(let i=0; i<length; i++) {
                      // //   resetColumn(i,"allReset");
                      // // }

                      gridRef.current.getInstance().restore();

                      axios
                        .get(
                          `http://localhost:8000/api/vendor/${vendorSeqId}/price/`
                        )
                        .then(result => {
                          const selectData = result.data;
                          const newArray = selectData
                            .filter(
                              (arr, index, callback) =>
                                index ===
                                callback.findIndex(
                                  t => t.part_name === arr.part_name
                                )
                            )
                            .map(data => {
                              return data.part_name;
                            });

                          setVendorSelectData(selectData);
                          //setPartAutoData(newArray);
                          //console.log(selectData);
                          //console.log(newArray);
                        })
                        .catch(error => {
                          throw new Error(error);
                        });
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
                    modalType === "접수수정" ? receptionObj.chartNumber : ""
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
                    modalType === "접수수정" ? receptionObj.patientName : ""
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
                    modalType === "접수수정" ? receptionObj.patientName : ""
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
                        modalType === "접수수정" ? receptionObj.upper : false
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
                        modalType === "접수수정" ? receptionObj.lower : false
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
                        modalType === "접수수정" ? receptionObj.bite : false
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
                          ? receptionObj.appliance
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
              id="request_form"
              name="request_form"
              multiple
              type="file"
            />
            <label htmlFor="request_form">
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
                  data={selectDetailData.map(data => {
                    return {
                      partName: data.part_name,
                      itemName: data.item_name,
                      unitPrice: data.unit_price,
                      amount: data.amount,
                      normalPrice: data.normal_price,
                      discountPrice: data.discount_price,
                      realSellPrice: data.real_sell_price,
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
