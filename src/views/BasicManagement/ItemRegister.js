import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";


import Card from "@mui/material/Card";

// Material
import TextField from "@material-ui/core/TextField";

import ItemModalContainer from "containers/ItemModalContainer";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";

import "tui-grid/dist/tui-grid.css";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { items } from "modules/items";

import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';

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

 
}));

export default function ItemRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ item }) => item);
  const [gridData, setGridData] = useState([]);

  const [seqId, setSeqId] = useState();
  const [itemObj, setItemObj] = useState({});

  const partNameArr = ["전체"];
  const itemNameArr = ["전체"];

  data.map( (data) => {
    partNameArr.push( data.partName )
    itemNameArr.push( data.itemName )
  });
 
  const set1 = new Set(partNameArr);
  const set2 = new Set(itemNameArr);

  const auto1 = [...set1];
  const auto2 = [...set2];

  useEffect(() => {
    setGridData(data)
  }, [data]);

  useEffect(() => {
    dispatch(items.getItemMiddleware());
    setOpenItemModal(false);
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
      <MenuItem onClick={e => itemModalOpen(e)}>장치 추가</MenuItem>
    </Menu>
  );

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  // 모달
  const [openItemAddModal, setOpenItemModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleItemModalOpen = () => {
    setOpenItemModal(true);
  };
  const handleItemModalClose = () => {
    setOpenItemModal(false);
  };

  const itemModalOpen = e => {
    closeMenu();
    setModalType("추가");
    handleItemModalOpen();
  };

  const onUpdateButtonClicked = itemObj => {
    setModalType("수정");
    setItemObj(itemObj);
    handleItemModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handleItemModalOpen();
  };

  const columns = [
    {
      name: "partName",
      header: "파트명",
      align: "center",
      sortable: true,
      filter: "select",
    },
    {
      name: "itemName",
      header: "장치명",
      align: "center",
      sortable: true,
      filter: "select",
    },
    {
      name: "update",
      header: "장치수정",
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

  const onSubmit = (e) => {
    e && e.preventDefault();

    let formData = new FormData(document.getElementById("formSearchData"));
    const partName = formData.get("partName");
    const itemName = formData.get("itemName");

    if (partName === "" || itemName === "") {
      return alert("검색어를 입력하세요.");
    }

    const dataArr = data.filter(data => 
      data.partName === partName
    );

    axios
      .get("/api/code/item/", {
        params : {
          partSeqId: partName === "전체" ? "" : dataArr[0].partSeqId,
          itemName: itemName === "전체" ? "" : itemName,
        }
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
          <Card>
            <ProjectHeader title={"장치 리스트"} subTitle={"All List"}>
              <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="medium" onClick={openMenu}>
                more_vert
              </MoreVertIcon>
              {renderMenu}
            </ProjectHeader>
            <ProjectBody>
              <form id="formSearchData" onSubmit={onSubmit}>
                <SuiBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        className={classes.grid}
                        options={auto1}
                        defaultValue={auto1[0]}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        renderInput={params => (
                          <TextField {...params} name="partName" label="파트명" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        freeSolo
                        className={classes.grid}
                        options={auto2}
                        defaultValue={auto2[0]}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        renderInput={params => (
                          <TextField {...params} name="itemName" label="장치명" variant="outlined" />
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
      <ItemModalContainer
        modalType={modalType}
        open={openItemAddModal}
        close={handleItemModalClose}
        seqId={seqId}
        itemObj={itemObj}
      />
    </>
  );
}
