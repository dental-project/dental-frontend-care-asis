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
import DateRangePicker from "components/DateRangePicker";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { receptions } from "modules/receptions";
import { receptionDetails } from "modules/receptionDetails";
import { items } from "modules/items";
import { useDispatch, useSelector } from "react-redux";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiButton from "components/Sui/SuiButton";
import MiniStatisticsCard from "components/MiniStatisticsCard";
import Project from "components/SuiProject";


// @mui material components
import Card from "@mui/material/Card";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


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
  const [seqId, setSeqId] = useState();
  const [selectReceptionData, setSelectReceptionData] = useState({});
  
  useEffect(() => {
    dispatch(receptions.getReceptionMiddleware());
    dispatch(items.getItemMiddleware());
    setOpenReceptionModal(false);
  }, [count]);

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
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
      <MenuItem onClick={e => receptionModalOpen(e)}>접수 추가</MenuItem>
      <MenuItem onClick={e => handleClickOpenPrint(e)}>PDF 출력</MenuItem>
    </Menu>
  );

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
    stringify: option => option.title,
  });

  const auto1 = [
    { title: "전체" },
    { title: "리더스탑치과" },
    { title: "이바른치과" },
    { title: "연세두리치과" },
    { title: "서울스위트치과" },
    { title: "연세바로치과" },
    { title: "서울시카고" },
  ];
  const auto2 = [
    { title: "전체" },
    { title: "최진실" },
    { title: "전윤화" },
    { title: "정보경" },
    { title: "이유림" },
    { title: "조유나" },
  ];

  return (
    <>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "전체 리스트" }}
                count="100개"
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
          <Project renderMenu={renderMenu}>
            
            {/* <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            </SuiBox> */}
              {/* <SuiBox color="text" px={2}>
                <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="medium" onClick={openMenu}>
                  more_vert
                </MoreVertIcon>
              </SuiBox>
              {renderMenu} */}
            {/* <Menu
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
              <MenuItem onClick={e => receptionModalOpen(e)}>접수 추가</MenuItem>
              <MenuItem onClick={e => handleClickOpenPrint(e)}>PDF 출력</MenuItem>
            </Menu> */}
            <SuiBox display="flex" px={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} xl={2}>
                  <DateRangePicker label={"접수일자"}/>
                  {/* <TextField
                    id="date"
                    label="접수일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={2} xl={2}>
                  <TextField
                    id="date"
                    label="완성일자"
                    type="date"
                    defaultValue="2022-01-12"
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} xl={2}>
                  <Autocomplete
                    className={classes.grid}
                    options={auto1}
                    getOptionLabel={option => option.title}
                    filterOptions={filterOptions}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="거래처명"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3} xl={2}>
                  <Autocomplete
                    className={classes.grid}
                    options={auto2}
                    getOptionLabel={option => option.title}
                    filterOptions={filterOptions}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="환자명"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2} xl={2}>
                  <SuiButton variant="outlined" color="info" size="large" style={{marginTop: "10px"}}>
                    검색
                  </SuiButton>
                </Grid>
              </Grid>
            </SuiBox>
            <SuiBox px={2}>
              <ToastGrid columns={columns} data={data} bodyHeight={500} />
            </SuiBox>
          </Project>
         
          {/* <Card> */}
            {/* <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiBox>
                <SuiTypography variant="h6" gutterBottom>
                  접수 리스트   
                </SuiTypography>
                <SuiBox display="flex" alignItems="center" lineHeight={0}>
                  <PlaylistAddCheckIcon fontSize="medium" />
                  <SuiTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;<strong>All</strong> list
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              <SuiBox color="text" px={2}>
                <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="medium" onClick={openMenu}>
                  more_vert
                </MoreVertIcon>
              </SuiBox>
              {renderMenu}
            </SuiBox> */}
            
          {/* </Card> */}
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