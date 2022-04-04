import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";


import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";
import DentalModalContainer from "containers/DentalModalContainer";

import { dentals } from "modules/dentals";

import { useDispatch, useSelector } from "react-redux";

import { apis } from "apis/axios";

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

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(1),
  },

  textFieldDate: {
    width: "100%",
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

export default function DentalRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ dental }) => dental);
  const [gridData, setGridData] = useState([]);
  const [vendorAutoReset, setVendorAutoReset] = useState("전체");
  const [seqId, setSeqId] = useState("");
  const [dentalObj, setDentalObj] = useState({});

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    setOpenDentalModal(false);
  }, [count]);
  
  useEffect(() => {
    setVendorAutoReset("전체");
  }, [vendorAutoReset]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const vendorNameArr = ["전체"];

  data.map( (data) => {
    vendorNameArr.push(data.vendorName);
  });

  const set1 = new Set(vendorNameArr);
  const auto1 = [...set1];
  
  // 모달
  const [openDentalAddModal, setOpenDentalModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDentalModalOpen = () => {
    setOpenDentalModal(true);
  };
  const handleDentalModalClose = () => {
    setOpenDentalModal(false);
  };

  const dentalModalOpen = e => {
    closeMenu();
    setModalType("추가");
    handleDentalModalOpen();
  };

  const onUpdateButtonClicked = dentalObj => {
    setModalType("치과수정");
    setDentalObj(dentalObj);
    handleDentalModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handleDentalModalOpen();
  };

  const columns = [
    {
      name: "vendorName",
      header: "거래처명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "ceo",
      header: "대표",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "tel",
      header: "전화번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "fax",
      header: "팩스번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "businessNumber",
      header: "사업자번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "businessTypeName",
      header: "업태",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "businessSectorName",
      header: "업종",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "postNumber",
      header: "우편번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "address",
      header: "주소",
      align: "center",
      
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bankName",
      header: "은행",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bankAccount",
      header: "계좌번호",
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
      name: "update",
      header: "치과수정",
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

  const onSubmit = e => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formSearchData"));
    const vendorName = formData.get("vendorName");
    
    if (vendorName === "") 
      return alert("검색어를 입력하세요.");
    
    apis
      .dentalSearch({
        params: { vendorName: vendorName === "전체" ? "" : vendorName },
      })
      .then(result => {
        setGridData(result.data);
      })
      .catch(err => {
        alert(err);
      });
    
  };

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
            <ProjectHeader title={"치과 리스트"} subTitle={"All List"}>
              <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="medium" onClick={openMenu}>
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
                <MenuItem onClick={e => dentalModalOpen(e)}>치과 추가</MenuItem>
              </Menu>
            </ProjectHeader>
            <ProjectBody>         
              <form id="formSearchData" onSubmit={onSubmit}>
                <SuiBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} xl={3}>
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
                    <Grid item xs={12} sm={3} xl={3}>
                      <SuiButton
                        type="submit"
                        form="formSearchData"
                        variant="outlined"
                        color="info"
                        size="large"
                        style={{width: "95%", margin: "10px"}}
                      >
                        검색
                      </SuiButton>
                    </Grid>
                  </Grid>
                </SuiBox>
              </form>
              <SuiBox px={2}>
                <ToastGrid columns={columns} data={gridData} bodyHeight={500} />
              </SuiBox>
            </ProjectBody>
          </Card>
        </SuiBox>
      </SuiBox>
      <DentalModalContainer
        modalType={modalType}
        open={openDentalAddModal}
        close={handleDentalModalClose}
        seqId={seqId}
        dentalObj={dentalObj}
      />
    </>
  );
}
