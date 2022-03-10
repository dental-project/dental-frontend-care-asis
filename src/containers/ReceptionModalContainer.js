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

import { dentals } from "modules/dentals";
import "tui-grid/dist/tui-grid.css";

import { apis } from "apis/axios";
import axios from "axios";
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
  receptionData,
  selectDetailData,
}) => {
  const classes = useStyles();
  const gridRef = React.createRef();


  const dispatch = useDispatch();
  const dentalAutoData = useSelector(({ dental }) => dental.data);

  const [rowData, setRowData] = useState(selectDetailData);
  const [changeVendorSeqId, setChangeVendorSeqId] = useState("");
  const [partAutoData, setPartAutoData] = useState([]);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    
  }, []);

  useEffect(() => {
    setRowData(selectDetailData);
  }, [selectDetailData]);
  

//   useEffect(() => {
    
//     if (changeVendorSeqId == "") return;

//     console.log(changeVendorSeqId);

//     //setPartAutoData([]);
    
//     async function fetchData() {
//       const response = axios(
//         `http://localhost:8000/api/vendor/${changeVendorSeqId}/price/`
//       )
//         .then(result => {
//           const vendorPartData = result.data;
//           console.log(vendorPartData);
//           vendorPartData.map(data => {
//             //console.log(data.part_name);


// setTimeout(function () {
//   setPartAutoData([...partAutoData, data.part_name]);
// }, 3000);


            
//           });
//         })
//         .catch(error => {
//           throw new Error(error);
//         });
//       console.log(response);      
//     }
//     fetchData();
           
//   }, [changeVendorSeqId]);




  
  // useEffect(() => {
  //   dispatch(receptions.getVendorPartMiddleware(vendorSeqId));
  //   console.log(vendorSeqId);
  // }, [vendorSeqId]);



  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const auto1 = ["App", "Part"];
  const auto2 = ["기공", "item"];

  // const handleAppendRow = () => {
  //   gridRef.current.getInstance().appendRow({});
  // };

  const onRemoveButtonClicked = rowKey => {
    gridRef.current.getInstance().removeRow(rowKey);
  };

  const removeReceptionDetail = index => {};

  const filterVendorName = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.vendor_name,
  });

  const vendorNameAuto = [];
    dentalAutoData.map( (data) => vendorNameAuto.push({ vendor_name: data.vendor_name }));



  // const newArray = receptionData
  //   .filter(
  //     (arr, index, callback) =>
  //       index === callback.findIndex(t => t.part_name === arr.part_name)
  //   )
  //   .map(data => {
  //     return { text: data.part_name, value: data.part_name };
  //   });

  // const deduplication = (name, val) => {
  //   typeof Storage !== "undefined" &&
  //     localStorage.setItem(name, JSON.stringify(val));
  // };

  // deduplication("name", newArray);

  // var something = {};

  // for (let i = 0; i < newArray.length; i++) {
  //   something[newArray[i].value] = receptionData
  //     .filter(data => data.part_name === newArray[i].value)
  //     .map(data => {
  //       return { text: data.item_name, value: data.item_name };
  //     });
  // }

  // const columns = [
  //   {
  //     header: "파트명 (선택)",
  //     name: "partName",
  //     editor: {
  //       type: "select",
  //       options: {
  //         listItems: newArray,
  //       },
  //     },
  //     validation: { required: true },
  //     relations: [
  //       {
  //         targetNames: ["itemName"],
  //         listItems({ value }) {
  //           return something[value];
  //         },
  //         disabled({ value }) {
  //           return !value;
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     header: "장치명 (선택)",
  //     name: "itemName",
  //     editor: {
  //       type: "select",
  //       options: {
  //         listItems: [],
  //       },
  //     },
  //     validation: { required: true },
  //   },
  //   {
  //     header: "단가",
  //     name: "unitPrice",
  //     validation: { required: true },
  //   },
  //   {
  //     header: "수량 (입력)",
  //     name: "amount",
  //     editor: "text",
  //     validation: { required: true },
  //   },
  //   {
  //     header: "정상가",
  //     name: "normalPrice",
  //     validation: { required: true },
  //   },
  //   {
  //     header: "할인금액 (입력)",
  //     name: "discountPrice",
  //     editor: "text",
  //     validation: { required: true },
  //   },
  //   {
  //     header: "최종금액",
  //     name: "finalPrice",
  //     validation: { required: true },
  //   },
  //   {
  //     header: "할인율 ",
  //     name: "discount",
  //     validation: { required: true },
  //   },
  //   {
  //     name: "update",
  //     header: "삭제",
  //     align: "center",
  //     renderer: {
  //       type: RowRemoveRenderer,
  //       options: {
  //         onRemoveButtonClicked,
  //       },
  //     },
  //   },
  // ];

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

    const detailArr = [];
    for (let i = 0; i < selectDetailData.length; i++) {
      detailArr.push({
        part_name: formData.get("normalPrice_" + i),
        item_name: formData.get("itemPrice_" + i),
        unit_price: parseInt(formData.get("unitPrice_" + i)),
        amount: parseInt(formData.get("amount_" + i)),
        normal_price: parseInt(formData.get("normalPrice_" + i)),
        discount_price: parseInt(formData.get("discountPrice_" + i)),
        real_sell_price: parseInt(formData.get("realSellPrice_" + i)),
        discount: formData.get("discount_" + i),
      });
    }

    console.log(detailArr);

    return;

    // if (
    //   receiptDate === "" ||
    //   completionDate === "" ||
    //   vendorName === "" ||
    //   patientName === ""
    // )
    //   return alert("빈칸없이 입력하세요");

    // const index = dentalAutoData.findIndex(
    //   obj => obj.vendor_name === vendorName
    // );

    // if (modalType === "추가") {
    //   const contents = {
    //     receipt_date: receiptDate,
    //     completion_date: completionDate,
    //     delivery_date: deliveryDate,
    //     chart_number: parseInt(chartNumber),
    //     upper: upper === "" ? true : false,
    //     lower: lower === "" ? true : false,
    //     bite: bite === "" ? true : false,
    //     appliance: appliance === "" ? true : false,
    //     patient_name: patientName,
    //     request_form: "/test/test.png",
    //     description: description,
    //     vendor_seq_id: dentalAutoData[index].seq_id,
    //   };

    //   const gridArr = gridRef.current.getInstance().getData();

    //   if (gridArr.length === 0) return alert("그리드 행을 추가 해주세요.");

    //   for (let i = 0; i < gridArr.length; i++) {
    //     if (gridArr[i].partName === null || gridArr[i].partName === "") {
    //       return alert(i + 1 + "번째 행 파트명을 선택하세요.");
    //     } else if (gridArr[i].itemName === null || gridArr[i].itemName === "") {
    //       return alert(i + 1 + "번째 행 장치명을 선택하세요.");
    //     } else if (gridArr[i].amount === null || gridArr[i].amount === "") {
    //       return alert(i + 1 + "번째 행 수량을 입력하세요.");
    //     } else if (
    //       gridArr[i].discountPrice == null ||
    //       gridArr[i].discountPrice === ""
    //     ) {
    //       return alert(i + 1 + "번째 행 할인금액을 입력하세요.");
    //     }
    //   }

    //   const priceContents = [];
    //   for (let i = 0; i < gridArr.length; i++) {
    //     let element = receptionData.filter(
    //       data => data.item_name === gridArr[i].itemName
    //     );

    //     priceContents.push({
    //       sell_master_id: "",
    //       item_seq_id: element[0].item_seq_id,
    //       sell_count: parseInt(gridArr[i].amount),
    //       normal_price: parseInt(gridArr[i].normalPrice),
    //       real_sell_price: parseInt(gridArr[i].discountPrice),
    //       discount: parseFloat(gridArr[i].discount),
    //     });
    //   }

    //   dispatch(receptions.addReceptionMiddleware(contents, priceContents));
    // } else if (modalType === "접수수정") {
    //   const gridArr = gridRef.current.getInstance().getData();
    //   console.log(gridArr);
    // } else if (modalType === "삭제") {
    //   // const arr = receptionDetailData.filter(
    //   //   data => data.sell_master_id === seqId
    //   // );

    //   dispatch(receptions.deleteReceptionMiddleware(seqId));
    // }
  };

  // const onChange = e => {
  //   const gridArr = gridRef.current.getInstance().getData();

  //   let rowId = e.changes[0].rowKey;
  //   var regNumber = /^[0-9]*$/;

  //   if (e.changes[0].columnName === "partName") {
  //     resetColumn(rowId, "itemReset");
  //   } else if (e.changes[0].columnName === "itemName") {
  //     let price = receptionData.filter(
  //       data =>
  //         data.part_name === gridArr[rowId].partName &&
  //         data.item_name === gridArr[rowId].itemName
  //     );

  //     resetColumn(rowId, "itemReset");
  //     setColumnValue(rowId, "unitPrice", price[0].unit_price);
  //   } else if (e.changes[0].columnName === "amount") {
  //     if (regNumber.test(gridArr[rowId].amount) === false)
  //       return alert("정수만 입력 가능합니다.");

  //     resetColumn(rowId);
  //     setColumnValue(
  //       rowId,
  //       "normalPrice",
  //       gridArr[rowId].unitPrice * parseInt(gridArr[rowId].amount)
  //     );
  //   } else if (e.changes[0].columnName === "discountPrice") {
  //     if (regNumber.test(gridArr[rowId].discountPrice) === false) {
  //       resetColumn(rowId);
  //       return alert("정수만 입력 가능합니다.");
  //     }
  //     if (
  //       parseInt(gridArr[rowId].discountPrice) >
  //       gridArr[rowId].normalPrice
  //     ) {
  //       resetColumn(rowId);
  //       return alert("할인금액이 정상가보다 금액이 큽니다.");
  //     }
  //     setColumnValue(
  //       rowId,
  //       "finalPrice",
  //       gridArr[rowId].normalPrice -
  //         parseInt(gridArr[rowId].discountPrice)
  //     );
  //     setColumnValue(
  //       rowId,
  //       "discount",
  //       (
  //         (gridArr[rowId].discountPrice / gridArr[rowId].normalPrice) *
  //         100
  //       ).toFixed(2) + "%"
  //     );
  //   }
  // };

  // const setColumnValue = (rowId, columnName, value) => {
  //   gridRef.current
  //     .getInstance()
  //     .setValue(rowId, columnName, value, false);
  // };

  // const resetColumn = (rowId, type) => {
  //   if (type === "itemReset") {
  //     gridRef.current
  //       .getInstance()
  //       .setValue(rowId, "unitPrice", "", false);
  //     gridRef.current.getInstance().setValue(rowId, "amount", "", false);
  //     gridRef.current
  //       .getInstance()
  //       .setValue(rowId, "normalPrice", "", false);
  //   }
  //   gridRef.current
  //     .getInstance()
  //     .setValue(rowId, "discountPrice", "", false);
  //   gridRef.current
  //     .getInstance()
  //     .setValue(rowId, "finalPrice", "", false);
  //   gridRef.current.getInstance().setValue(rowId, "discount", "", false);
  // };


  const addRow = () => {
   
    const obj = {
      part_name: "",
      item_name: "",
      unit_price: "",
      amount: "",
    }

    setRowData(rowData.concat(obj));
    
  }




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
                  getOptionLabel={(option) => option.vendor_name}
                  filterOptions={filterVendorName}
                  // getOptionSelected={(option, value) => {
                  //   //console.log(value);
                  //   return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                  // }}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      const index = dentalAutoData.findIndex(obj => obj.vendor_name === newValue.vendor_name)
                      const vendorSeqId = dentalAutoData[index].seq_id
                       
                      
                      setPartAutoData([]);
                            
                      axios
                        .get(
                          `http://localhost:8000/api/vendor/${vendorSeqId}/price/`
                        )
                        .then(result => {
                          const vendorPartData = result.data;
                         
                          const newArray = vendorPartData
                            .filter(
                              (arr, index, callback) =>
                                index === callback.findIndex(t => t.part_name === arr.part_name)
                            )
                            .map(data => {
                              return data.part_name;
                            });
                          setPartAutoData(newArray);
                          
                          // vendorPartData.map(data => {
                          //   setPartAutoData([...partAutoData, data.part_name]);
                          // });


                        })
                        .catch(error => {
                          throw new Error(error);
                        });
                    }
                  }}
                  renderInput={(params) => <TextField {...params} name="vendorName" label="거래처명" variant="outlined" />}
                />




                {/* <Autocomplete
                  className={classes.textField}
                  name="vendorName"
                  control={control}
                  options={vendorNameAuto}
                  
                  getOptionLabel={(option) => option}
                  filterOptions={filterVendorName}
                  // defaultValue={
                  //   modalType === "접수수정" ? receptionObj.vendorName : ""
                  // }
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      const index = dentalAutoData.findIndex(
                        obj => obj.vendor_name === newValue
                      );

                      const vendorSeqId = dentalAutoData[index].seq_id;
                      console.log(vendorSeqId);
                      
                      //setVendorSeqId(dentalAutoData[index].seq_id);
                      dispatch(receptions.getVendorPartMiddleware(vendorSeqId));
                    } else if (newValue === null) {
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
                /> */}
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
                    modalType === "접수수정" ? receptionObj.description : ""
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








{/* <Autocomplete
              className={classes.textField}
              options={auto}
              filterOptions={filterOptions}
              defaultValue={modalType === "수정" ? itemObj.partName : ""}
              renderInput={params => (
                <TextField {...params} name="partName" label="파트명" variant="outlined"  />
              )}
            /> */}


              {rowData.map((data, index) => {
                return (
                  <Grid container spacing={1} key={index}>
                    <Grid item xs={2}>
                      <Autocomplete
                        className={classes.textField}
                        options={partAutoData}
                        filterOptions={filterOptions}
                        defaultValue={
                          modalType === "접수수정" ? data.part_name : ""
                        }
                     
                        onChange={(event, newValue) => {
                          if(newValue !== null) {
                             
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name={"partName_" + index}
                            label="파트명"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Autocomplete
                        className={classes.textField}
                        options={auto2}
                        filterOptions={filterOptions}
                        defaultValue={
                          modalType === "접수수정" ? data.item_name : ""
                        }
                        getOptionSelected={(option, value) => {
                          return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name={"itemName_" + index}
                            label="장치명"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        className={classes.textField}
                        name={"unitPrice_" + index}
                        label="단가"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.item_name : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        className={classes.textField}
                        name={"amount_" + index}
                        label="수량 (입력)"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.amount : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        className={classes.textField}
                        name={"normalPrice_" + index}
                        label="정상가"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.normal_price : ""
                        }
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        className={classes.textField}
                        name={"discountPrice_" + index}
                        label="할인금액 (입력)"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.discount_price : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        className={classes.textField}
                        name={"realSellPrice_" + index}
                        label="최종금액"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.real_sell_price : ""
                        }
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        className={classes.textField}
                        name={"discount_" + index}
                        label="할인율 (%)"
                        variant="outlined"
                        defaultValue={
                          modalType === "접수수정" ? data.discount : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={removeReceptionDetail}
                      >
                        삭제
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  color="info"
                  round
                  onClick={addRow}
                >
                  단가 행 추가
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "30px", fontSize: "30px" }}
            >
              {"image.png"}
            </Grid>

            <Button className={classes.button} color="info" round>
              이미지 업로드
            </Button>
            {/* <Grid item xs={12}>
              <Button
                className={classes.button}
                color="info"
                round
                onClick={handleAppendRow}
              >
                그리드 행추가
              </Button>

              {modalType === "접수수정" ? (
                <ToastGrid
                  ref={gridRef}
                  columns={columns}
                  rowHeight={20}
                  bodyHeight={200}
                  virtualScrolling={true}
                  heightResizable={true}
                  rowHeaders={["rowNum"]}
                  onAfterChange={onChange}
                  data={receptionDetailArr}
                />
              ) : (
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
              )}
            </Grid> */}
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
