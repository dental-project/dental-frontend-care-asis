import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

// core components
import Grid from "@material-ui/core/Grid";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";

// Material
import TextField from "@material-ui/core/TextField";

import ReceptionModalContainer from "containers/ReceptionModalContainer";
import PrintModalContainer from "containers/PrintModalContainer";
import DetailButtonRenderer from "components/ToastGridRenderer/DetailRenderer.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { receptions } from "modules/receptions";
import { receptionDetails } from "modules/receptionDetails";
import { items } from "modules/items";
import { useDispatch, useSelector } from "react-redux";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiButton from "components/Sui/SuiButton";
import MiniStatisticsCard from "components/MiniStatisticsCard";
import ProjectHeader from "components/SuiProject/ProjectHeader";
import ProjectBody from "components/SuiProject/ProjectBody";

// @mui material components
import Card from "@mui/material/Card";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

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
  const selectDetailData = useSelector(({ receptionDetail }) => receptionDetail.data);
  const [gridData, setGridData] = useState([]);
  const [seqId, setSeqId] = useState("");
  const [selectReceptionData, setSelectReceptionData] = useState({});
  const [selectedValue, setSelectedValue] = useState("reception");
  const [receptionStartDate, setReceptionStartDate] = useState(new Date());
  const [receptionEndDate, setReceptionEndDate] = useState(new Date());
  const [completeStartDate, setCompleteStartDate] = useState(new Date());
  const [completeEndDate, setCompleteEndDate] = useState(new Date());
  const [vendorAutoReset, setVendorAutoReset] = useState("전체");
  const [chartNumberAutoReset, setChartNumberAutoReset] = useState("전체");
  
  const [searchType, setSearchType] = useState("");

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(receptions.getReceptionMiddleware());
    dispatch(items.getItemMiddleware());
    setOpenReceptionModal(false);
  }, [count]);

  useEffect(() => {
    setVendorAutoReset("전체");
  }, [vendorAutoReset]);

  useEffect(() => {
    setChartNumberAutoReset("전체");
  }, [chartNumberAutoReset]);

  const vendorNameArr = ["전체"];
  const chartNumberArr = ["전체"];

  data.map( data => {
    vendorNameArr.push( data.vendorName )
    chartNumberArr.push( data.chartNumber.toString() )
  });

  const set1 = new Set(vendorNameArr);
  const set2 = new Set(chartNumberArr);

  const auto1 = [...set1];
  const auto2 = [...set2];

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
    closeMenu();
    setOpenPrint(true);
  };
  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  const receptionModalOpen = () => {
    closeMenu();
    setModalType("추가");
    handleReceptionModalOpen();
  };

  const onUpdateButtonClicked = receptionObj => {
    setModalType("접수수정");
    
    const sellMasterId = receptionObj.seqId;
  
    dispatch(receptionDetails.getReceptionDetailSelectMiddleware(sellMasterId));
    setSelectReceptionData(receptionObj);
    handleReceptionModalOpen();
  };

  const onDetailButtonClicked = receptionObj => {
    history.push({
      pathname: "/dental/receptionDetail",
      seqId: receptionObj.seqId,
      detail: [selectDetailData],
      state: [receptionObj],
    });
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handleReceptionModalOpen();
  };

  const columns = [
    { name: "seq_id", header: "codeNo", align: "center", hidden: true },
    {
      name: "receiptDate",
      header: "접수일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "completionDate",
      header: "완성일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "deliveryDate",
      header: "배달일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "vendorName",
      header: "거래처",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "chartNumber",
      header: "차트번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "upper",
      header: "Upper",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "lower",
      header: "Lower",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bite",
      header: "Bite",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "appliance",
      header: "Appliance",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "patientName",
      header: "환자명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "description",
      header: "비고",
      align: "center",
      whiteSpace: "normal",
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

  const onReceptionDateChange = (startDate, endDate) => {
    setReceptionStartDate(startDate);
    setReceptionEndDate(endDate);
  }

  const onCompleteDateChange = (startDate, endDate) => {
    setCompleteStartDate(startDate);
    setCompleteEndDate(endDate);
  }

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formSearchData"));
    const dateSelect = formData.get("dateSelect");
    const vendorName = formData.get("vendorName");
    const chartNumber = formData.get("chartNumber");
    
    if(vendorName === "" || chartNumber === "") return alert("검색어를 입력하세요.");

    setSearchType("search");

    let receptionParams;
    let completeParams;

    if(dateSelect === "reception") {
      receptionParams = {
        receptionDate: { 
          startDate: dateFormat(receptionStartDate), 
          endDate: dateFormat(receptionEndDate) 
        },
        vendorName: vendorName === "전체" ? "" : vendorName,
        chartNumber: chartNumber === "전체" ? "" : parseInt(chartNumber),
      }
    } else {
      completeParams = {
        completeDate: { 
          startDate: dateFormat(completeStartDate), 
          endDate: dateFormat(completeEndDate) 
        },
        vendorName: vendorName === "전체" ? "" : vendorName,
        chartNumber: chartNumber === "전체" ? "" : parseInt(chartNumber),
      }
    }
  
    apis
      .receptionSearch({
        params:  dateSelect === "reception" ? receptionParams : completeParams,
      })
      .then(result => {
        setGridData(result.data);
      })
      .catch(err => {
        alert(err);
      });

  }

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "전체 리스트" }}
                count={data.length}
                percentage={{ color: "success", text: "EA" }}
                icon={{ color: "info", component: "AllList" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <ProjectHeader title={"접수 리스트"} subTitle={"All List"}>
              <MoreVertIcon
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                fontSize="medium"
                onClick={openMenu}
              >
                more_vert
              </MoreVertIcon>
              <Menu
                id="simple-menu"
                anchorEl={menu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(menu)}
                onClose={closeMenu}
              >
                <MenuItem onClick={e => receptionModalOpen(e)}>
                  접수 추가
                </MenuItem>
                <MenuItem onClick={e => handleClickOpenPrint(e)}>
                  PDF 출력
                </MenuItem>
              </Menu>
            </ProjectHeader>
            <ProjectBody>
              <form id="formSearchData" onSubmit={onSubmit}>
                <SuiBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <FormControlLabel
                      checked={selectedValue === "reception"}
                      onChange={handleChangeRadio}
                      name="dateSelect"
                      value="reception"
                      control={<Radio color="primary" />}
                      label="접수일자"
                    />
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
                </SuiBox>
                <SuiBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <FormControlLabel
                      checked={selectedValue === "complete"}
                      onChange={handleChangeRadio}
                      name="dateSelect"
                      value="complete"
                      control={<Radio color="primary" />}
                      label="완성일자"
                    />
                    <Grid item xs={12} sm={4} xl={4}>
                      <RangeDatePicker
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                      <SuiButton
                        type="submit"
                        form="formSearchData"
                        variant="outlined"
                        color="info"
                        size="large"
                        style={{ width: "95%", margin: "10px" }}
                      >
                        검색
                      </SuiButton>
                    </Grid>
                  </Grid>
                </SuiBox>
              </form>
              <SuiBox px={2}>
                <ToastGrid
                  columns={columns}
                  data={searchType === "" ? data : gridData}
                  bodyHeight={500}
                />
                {/* {searchType === "" ? (
                  <ToastGrid
                    columns={columns}
                    data={data}
                    bodyHeight={500}
                  />
                ) : (
                  <ToastGrid
                    columns={columns}
                    data={gridData}
                    bodyHeight={500}
                  />
                )} */}
              </SuiBox>
            </ProjectBody>
          </Card>
        </SuiBox>
      </SuiBox>
      <ReceptionModalContainer
        modalType={modalType}
        open={openReceptionAddModal}
        close={handleReceptionModalClose}
        seqId={seqId}
        selectReceptionData={selectReceptionData} // 접수 수정 데이터
        selectDetailData={selectDetailData}
      />
      <PrintModalContainer open={openPrint} close={handleClosePrint} />
    </>
  );
}