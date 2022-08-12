import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";

// @material
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

// @mui material components
import Card from "@mui/material/Card";

import ReceptionModalContainer from "containers/ReceptionModalContainer";
import PrintModalContainer from "containers/PrintModalContainer";
import DetailButtonRenderer from "components/ToastGridRenderer/DetailRenderer.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { receptions } from "modules/receptions";
import { receptionDetails } from "modules/receptionDetails";
import { items } from "modules/items";
import { useDispatch, useSelector } from "react-redux";

// Soft UI Dashboard React components
import SoftBox from "components/Soft/SoftBox";
import SoftInput from "components/Soft/SoftInput";
import SoftButton from "components/Soft/SoftButton";
import SoftTypography from "components/Soft/SoftTypography";
import MiniStatisticsCard from "components/MiniStatisticsCard";
import { apis } from "apis/axios";

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(1),
  },
  textField: {
    width: "100%",
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
  customText: {
    color: "#26c6da",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#1993A8",
    },
  },
  button: {
    width: "100%",
  },
}));

export default function ReceptionRegister() {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ reception }) => reception);
  const [gridData, setGridData] = useState([]);
  const selectDetailData = useSelector(({ receptionDetail }) => receptionDetail.data);
  const [seqId, setSeqId] = useState();


  // 수정 해야함
  const [selectReceptionData, setSelectReceptionData] = useState({});
  const [receptionStartDate, setReceptionStartDate] = useState(new Date());
  const [receptionEndDate, setReceptionEndDate] = useState(new Date());
  const [completeStartDate, setCompleteStartDate] = useState(new Date());
  const [completeEndDate, setCompleteEndDate] = useState(new Date());


  const [receptionDate, setReceptionDate] = useState();
  const [completeDate, setCompleteDate] = useState();


  const [vendorAutoReset, setVendorAutoReset] = useState("전체");
  const [patientNameAutoReset, setPatientNameAutoReset] = useState("전체");
  const [searchType, setSearchType] = useState("");
  const [printData, setPrintData] = useState({});

  const vendorNameArr = ["전체"];
  const patientNameArr = ["전체"];

  data.map( data => {
    console.log(data)
    vendorNameArr.push( data.vendorName )
    patientNameArr.push( data.patientName )
  });

  const set1 = new Set(vendorNameArr);
  const set2 = new Set(patientNameArr);
  const auto1 = [...set1];
  const auto2 = [...set2];

  useEffect(() => {
    
    let formData = new FormData(document.getElementById("formSearchData"));
    const dateSelect = formData.get("dateSelect");
    const result = searchTypeCheck(dateSelect, "", "", "default");
    
    apis
      .receptionSearch({
        params: result
      })
      .then((result) => {
        console.log(result);
        setGridData(result.data)
      })
      .catch((error) => {
        throw new Error(error);
      });

  }, []);

  useEffect(() => {
    dispatch(receptions.getReceptionMiddleware());
    dispatch(items.getItemMiddleware());
    setOpenReceptionModal(false);
  }, [count]);

  useEffect(() => {
    setVendorAutoReset("전체");
  }, [vendorAutoReset]);

  useEffect(() => {
    setPatientNameAutoReset("전체");
  }, [patientNameAutoReset]);

  // 추가 모달
  const [openReceptionAddModal, setOpenReceptionModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleReceptionModalOpen = () => {
    setOpenReceptionModal(true);
  };
  const handleReceptionModalClose = () => {
    setOpenReceptionModal(false);
  };

  // 출력 모달
  const [openPrint, setOpenPrint] = useState(false);
  const handleClickOpenPrint = () => {
    
    let formData = new FormData(document.getElementById("formSearchData"));
    const dateSelect = formData.get("dateSelect");
    const vendorName = formData.get("vendorName");
    const chartNumber = formData.get("chartNumber");
    
    setPrintData(searchTypeCheck(dateSelect, vendorName, chartNumber));
    setOpenPrint(true);
  };
  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  const receptionModalOpen = () => {
    setModalType("추가");
    handleReceptionModalOpen();
  };

  const onUpdateButtonClicked = receptionObj => {
    const sellMasterId = receptionObj.seqId;
    setModalType("접수수정");
    dispatch(receptionDetails.getReceptionDetailSelectMiddleware(sellMasterId));
    //setSelectReceptionData(receptionObj);
    handleReceptionModalOpen();
  };

  const onDetailButtonClicked = receptionObj => {

    history.push({
      pathname: "/dental/receptionDetail",
      seqId: receptionObj.seqId,
      state: [receptionObj],
    });
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    setSearchType("");
    handleReceptionModalOpen();
  };

  const columns = [
    { name: "seq_id", header: "codeNo", align: "center", hidden: true },
    {
      name: "receiptDate",
      header: "접수일자",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "completionDate",
      header: "완성일자",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "deliveryDate",
      header: "배달일자",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "vendorName",
      header: "거래처",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "chartNumber",
      header: "차트번호",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "upper",
      header: "Upper",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "lower",
      header: "Lower",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bite",
      header: "Bite",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    // {
    //   name: "appliance",
    //   header: "Appliance",
    //   align: "center",
    //   whiteSpace: "nowrap",
    //   resizable: true,
    //   sortable: true,
    //   filter: "select",
    // },
    {
      name: "patientName",
      header: "환자명",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "description",
      header: "비고",
      align: "center",
      whiteSpace: "nowrap",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "detail",
      header: "상세보기",
      align: "center",
      renderer: {
        type: DetailButtonRenderer,
        options: {
          onDetailButtonClicked,
        },
      },
    },
    {
      name: "update",
      header: "접수수정",
      align: "center",
      renderer: {
        type: UpdateButtonRenderer,
        options: {
          onUpdateButtonClicked,
        },
      },
    },
    {
      name: "remove",
      header: "삭제",
      align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onRemoveButtonClicked,
        },
      },
    },
  ];

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    
    return date.getFullYear() + '-' + month + '-' + day;
}

  // const onReceptionDateChange = (startDate, endDate) => {
  //   setReceptionStartDate(startDate);
  //   setReceptionEndDate(endDate);
  // }

  // const onCompleteDateChange = (startDate, endDate) => {
  //   setCompleteStartDate(startDate);
  //   setCompleteEndDate(endDate);
  // }

  const searchTypeCheck = (dateSelect, vendorName, chartNumber, type) => {

    if(type !== "default") {
      if(vendorName === "" || chartNumber === "") return alert("검색어를 입력하세요.");
    }
    
    let result;
 
    setSearchType("search");
    
    if(dateSelect === "reception") {
      result = {
        receptionDate: { 
          startDate:  (receptionStartDate), 
          endDate: dateFormat(receptionEndDate) 
        }
      }
    } else {
      result = {
        completeDate: { 
          startDate: dateFormat(completeStartDate), 
          endDate: dateFormat(completeEndDate) 
        }
      } 
    }

    result.vendorName = vendorName === "전체" ? "" : vendorName;
    result.chartNumber = chartNumber === "전체" ? "" : parseInt(chartNumber);

    return result;
  }

  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formSearchData"));
    const dateSelect = formData.get("dateSelect");
    const vendorName = formData.get("vendorName");
    const chartNumber = formData.get("chartNumber");
    
    const result = searchTypeCheck(dateSelect, vendorName, chartNumber);
    
    apis
      .receptionSearch({
        params: result
      })
      .then((result) => {
        setGridData(result.data)
      })
      .catch((error) => {
        throw new Error(error);
      });

  }

  return (
    <>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} xl={12}>
              <MiniStatisticsCard
                title={{ text: "전체 등록 리스트" }}
                count={data.length}
                percentage={{ color: "success", text: "개" }}
                icon={{ color: "info", component: "AllList" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox>
                <SoftTypography variant="h5" gutterBottom>
                  접수 리스트
                </SoftTypography>
                <SoftBox display="flex" alignItems="center" lineHeight={0}>
                  {/* <Icon
                    sx={{
                      fontWeight: "bold",
                      color: ({ palette: { info } }) => info.main,
                      mt: -0.5,
                    }}
                  >
                    done
                  </Icon>
                  <SoftTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;<strong>30 done</strong> this month
                  </SoftTypography> */}
                </SoftBox>
              </SoftBox>
              <SoftBox px={2}>
                <SoftButton 
                  variant="gradient" 
                  color="dark"
                  style={{marginRight: "5px"}}
                  onClick={e => receptionModalOpen(e)}
                >
                  접수추가
                </SoftButton>
                <SoftButton 
                  variant="gradient" 
                  color="dark"
                  onClick={e => handleClickOpenPrint(e)}
                >
                  PDF 출력
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox>
              <form id="formSearchData" onSubmit={onSubmit}>
                {/* <SoftBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} xl={4}>
                      <RangeDatePicker
                        name="receiptDate"
                        startDate={receptionStartDate}
                        endDate={receptionEndDate}
                        onChange={(startDate, endDate) =>
                          onReceptionDateChange(startDate, endDate)
                        }
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date(2100, 0, 1)}
                        startDatePlaceholder="시작 날짜"
                        endDatePlaceholder="종료 날짜"
                        monthFormat="YYYY MM"
                        disabled={false}
                      />
                    </Grid>
                  </Grid>
                </SoftBox> */}
                <SoftBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={2} xl={2}>
                      {/* <RangeDatePicker
                        name="completeDate"
                        startDate={completeStartDate}
                        endDate={completeEndDate}
                        onChange={(startDate, endDate) =>
                          onCompleteDateChange(startDate, endDate)
                        }
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date(2100, 0, 1)}
                        monthFormat="YYYY MM"
                        disabled={false}
                      /> */}
                      <TextField
                        className={classes.textField}
                        type="date"
                        name="receiptDate"
                        label="접수일자"
                        size="small"
                        defaultValue={dateFormat(new Date())}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                      <TextField
                        className={classes.textField}
                        type="date"
                        name="receiptDate"
                        label="완성일자"
                        size="small"
                        defaultValue={dateFormat(new Date())}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                      <Autocomplete
                        freeSolo
                        className={classes.grid}
                        options={auto1}
                        value={vendorAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        size="small"
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setVendorAutoReset("");
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
                    <Grid item xs={12} sm={2} xl={2}>
                      <Autocomplete
                        freeSolo
                        className={classes.grid}
                        options={auto2}
                        value={patientNameAutoReset}
                        filterOptions={filterOptions}
                        size="small"
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setPatientNameAutoReset("");
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="chartNumber"
                            label="환자명"
                            variant="outlined"
                          />
                        )}
                      />
                      {/* <Autocomplete
                        freeSolo
                        className={classes.grid}
                        options={auto2}
                        value={chartNumberAutoReset}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setChartNumberAutoReset("");
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="chartNumber"
                            label="차트번호"
                            variant="outlined"
                          />
                        )}
                      /> */}
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                      <SoftButton
                        type="submit"
                        form="formSearchData"
                        variant="outlined"
                        color="info"
                        size="medium"
                        fullWidth
                        style={{marginTop: "5px", marginBottom: "10px"}}
                      >
                        검색
                      </SoftButton>
                    </Grid>
                  </Grid>
                </SoftBox>
              </form>
              <SoftBox px={2}>
                <ToastGrid
                  columns={columns}
                  data={gridData}
                  bodyHeight={500}
                  summary={{
                    height: 30,
                    position: 'top',
                    columnContent: {
                      receiptDate: {
                        template: function(valueMap) {
                          return `검색 리스트: ${valueMap.cnt} 개`;
                        }
                      }
                    }
                  }}
                />
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <ReceptionModalContainer
        modalType={modalType}
        open={openReceptionAddModal}
        close={handleReceptionModalClose}
        seqId={seqId}
        selectReceptionData={selectReceptionData} // 접수 수정 데이터
        selectDetailData={selectDetailData}
      />
      <PrintModalContainer 
        open={openPrint} 
        close={handleClosePrint}
        printData={printData}             
      />
    </>
  );
}