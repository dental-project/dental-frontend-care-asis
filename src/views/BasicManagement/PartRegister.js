import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";


// Toast Grid
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { parts } from "modules/parts";

import { useDispatch, useSelector } from "react-redux";

import PartModalContainer from "containers/PartModalContainer";

import "tui-grid/dist/tui-grid.css";
import ToastGrid from "@toast-ui/react-grid";

import { apis } from "apis/axios";


// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiButton from "components/Sui/SuiButton";
import MiniStatisticsCard from "components/MiniStatisticsCard";

import ProjectHeader from "components/SuiProject/ProjectHeader";
import ProjectBody from "components/SuiProject/ProjectBody";


// @mui material components
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

function PartRegister() {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const { data, count } = useSelector(({ part }) => part);
  const [gridData, setGridData] = useState([]);
  const [autoReset, setAutoReset] = useState("전체");
  const [seqId, setSeqId] = useState("");
  const [partObj, setPartObj] = useState({});
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(parts.getPartMiddleware());
    setOpenPartModal(false);
  }, [count]);

  useEffect(() => {
    setAutoReset("전체");
  }, [autoReset]);

  // 자동완성
  const auto1 = ["전체"];
  data.map( (data) => auto1.push( data.partName ));

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  // 모달
  const [modalType, setModalType] = useState("");
  const [openPartAddModal, setOpenPartModal] = useState(false);
  const handlePartModalOpen = () => {
    setOpenPartModal(true);
  };
  const handlePartModalClose = () => {
    setOpenPartModal(false);
  };

  const partModalOpen = () => {
    closeMenu();
    setModalType("추가");
    handlePartModalOpen();
  };

  const onUpdateButtonClicked = partObj => {
    setModalType("파트수정");
    setPartObj(partObj);
    handlePartModalOpen();
  };

  const onRemoveButtonClicked = (seqId, partObj) => {
    setModalType("파트삭제");
    setSeqId(seqId);
    setPartObj(partObj);
    handlePartModalOpen();
  };

  // Toast Grid options value
  const columns = [
    { name: "seqId", header: "CodeNo", align: "center", hidden: true },
    {
      name: "partName",
      header: "파트명",
      align: "center",
      sortable: true,
      filter: "select",
    },
    {
      name: "update",
      header: "파트수정",
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
      header: "파트삭제",
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
    const partName = formData.get("partName");

    if (partName === "") return alert("검색어를 입력하세요.");

    apis
      .partSearch({
        params: { partName: partName === "전체" ? "" : partName },
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
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "전체 등록 리스트" }}
                count={data.length}
                percentage={{ color: "success", text: "개" }}
                icon={{ color: "info", component: "AllList" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "검색한 개수" }}
                count={data.length}
                percentage={{ color: "success", text: "개" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <ProjectHeader title={"파트 리스트"} subTitle={"All List"}>
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
                <MenuItem onClick={e => partModalOpen(e)}>파트 추가</MenuItem>
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
                        value={autoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setAutoReset("");
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="partName"
                            label="파트명"
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
      <PartModalContainer
        modalType={modalType}
        open={openPartAddModal}
        close={handlePartModalClose}
        seqId={seqId}
        partObj={partObj}
      />
    </>
  );
}

export default PartRegister;
