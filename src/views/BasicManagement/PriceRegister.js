import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";


import PriceModalContainer from "containers/PriceModalContainer";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { useDispatch, useSelector } from "react-redux";

import { prices } from "modules/prices";

import axios from 'axios';

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
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

export default function PriceRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ price }) => price);
  const [gridData, setGridData] = useState([]);
  const [seqId, setSeqId] = useState("");
  const [priceObj, setPriceObj] = useState({});

  useEffect(() => {
    setGridData(data)
  }, [data]);

  useEffect(() => {
    dispatch(prices.getPriceMiddleware());
    setOpenPriceModal(false);
  }, [count]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });


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
      <MenuItem onClick={e => priceModalOpen(e)}>단가 추가</MenuItem>
    </Menu>
  );

  const vemndorNameArr = ["전체"];
  const partNameArr = ["전체"];
  const itemNameArr = ["전체"];
  
  data.map( (data) => {
    vemndorNameArr.push( data.vendorName )
    partNameArr.push( data.partName )
    itemNameArr.push( data.itemName )
  });

  const set1 = new Set(vemndorNameArr);
  const set2 = new Set(partNameArr);
  const set3 = new Set(itemNameArr);

  const auto1 = [...set1];
  const auto2 = [...set2];
  const auto3 = [...set3];

  // 모달
  const [openPriceAddModal, setOpenPriceModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handlePriceModalOpen = () => {
    setOpenPriceModal(true);
  };
  const handlePriceModalClose = () => {
    setOpenPriceModal(false);
  };

  const priceModalOpen = () => {
    closeMenu();
    setModalType("추가");
    handlePriceModalOpen();
  };

  const onUpdateButtonClicked = priceObj => {
    setModalType("단가수정");
    setPriceObj(priceObj);
    handlePriceModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handlePriceModalOpen();
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
      name: "partName",
      header: "파트명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "itemName",
      header: "장치명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "price",
      header: "단가",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "number",
    },
    {
      name: "update",
      header: "단가수정",
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
    const vendorName = formData.get("vendorName");
    const partName = formData.get("partName");
    const itemName = formData.get("itemName");

    if(vendorName === "" || partName === "" || itemName === "") {
      return alert("검색어를 선택하세요.");
    }

    console.log(data);
   
    const vendorData = data.filter(data => 
      data.vendorName === vendorName
    );

    const partData = data.filter(data => 
      data.partName === partName
    );

    const itemData = data.filter(data => 
      data.itemName === itemName
    );

    
    console.log(vendorName === "전체" ? "" : vendorData[0].vendorSeqId);
    console.log(partName === "전체" ? "" : partData[0].partSeqId);
    console.log(itemName === "전체" ? "" : itemData[0].itemSeqId);
    //console.log(partData);
    //console.log(itemData);

    axios
      .get("/api/sell/price/", {
        params : {
          vendorSeqId: vendorName === "전체" ? "" : vendorData[0].vendorSeqId,
          partSeqId: partName === "전체" ? "" : partData[0].partSeqId,
          itemSeqId: itemName === "전체" ? "" : itemData[0].itemSeqId,
        }
      })
      .then((result) => {
        console.log(result);
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
            <ProjectHeader title={"단가 리스트"} subTitle={"All List"}>
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
                      <Autocomplete
                        className={classes.grid}
                        options={auto2}
                        defaultValue={auto2[0]}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        renderInput={params => (
                          <TextField {...params} name="partName" label="파트명" variant="outlined" />
                        )}
                      />        
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        className={classes.grid}
                        options={auto3}
                        defaultValue={auto3[0]}
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
      <PriceModalContainer
        modalType={modalType}
        open={openPriceAddModal}
        close={handlePriceModalClose}
        seqId={seqId}
        priceObj={priceObj}
      />
    </>
  );
}
