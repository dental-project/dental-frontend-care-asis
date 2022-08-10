import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// @mui material components
import Card from "@mui/material/Card";

import PriceModalContainer from "containers/PriceModalContainer";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { useDispatch, useSelector } from "react-redux";
import { prices } from "modules/prices";
import { apis } from "apis/axios";

// Soft UI Dashboard React components
import SoftBox from "components/Soft/SoftBox";
import SoftButton from "components/Soft/SoftButton";
import SoftTypography from "components/Soft/SoftTypography";
import MiniStatisticsCard from "components/MiniStatisticsCard";

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
  const [vendorAutoReset, setVendorAutoReset] = useState("전체");
  const [partAutoReset, setPartAutoReset] = useState("전체");
  const [itemAutoReset, setItemAutoReset] = useState("전체");

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

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

  const onRemoveButtonClicked = (seqId, priceObj) => {
    setModalType("단가삭제");
    setSeqId(seqId);
    setPriceObj(priceObj);
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
      header: "단가삭제",
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

    priceSearchCheck();

  }

  const priceSearchCheck = () => {
    let formData = new FormData(document.getElementById("formSearchData"));
    const vendorName = formData.get("vendorName");
    const partName = formData.get("partName");
    const itemName = formData.get("itemName");

    if(vendorName === "" || partName === "" || itemName === "") {
      return alert("검색어를 선택하세요.");
    }

    const vendorData = data.filter(data => 
      data.vendorName === vendorName
    );

    const partData = data.filter(data => 
      data.partName === partName
    );

    const itemData = data.filter(data => 
      data.itemName === itemName
    );

    const parameter = {
      vendorSeqId: vendorName === "전체" ? "" : vendorData[0].vendorSeqId,
      partSeqId: partName === "전체" ? "" : partData[0].partSeqId,
      itemSeqId: itemName === "전체" ? "" : itemData[0].itemSeqId,
    };
    
    axiosPriceSearch(parameter);
  }

  const axiosPriceSearch = (parameter) => {
    apis
    .priceSearch({
      params: parameter
    })
    .then(result => {
      console.log(result);
      setGridData(result.data);
    })
    .catch(err => {
      alert(err);
    });
  }

  return (
    <>
      <SoftBox Box py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} xl={12}>
              <MiniStatisticsCard
                title={{ text: "전체 등록 리스트" }}
                count={data.length}
                percentage={{ color: "success", text: "EA" }}
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
                  단가 리스트
                </SoftTypography>
                <SoftBox display="flex" alignItems="center" lineHeight={0}>
    
                </SoftBox>
              </SoftBox>
              <SoftBox px={2}>
                <SoftButton 
                  variant="gradient" 
                  color="dark"
                  style={{marginRight: "5px"}}
                  onClick={e => priceModalOpen(e)}
                >
                  단가추가
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox>
              <form id="formSearchData" onSubmit={onSubmit}>
                <SoftBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        className={classes.grid}
                        options={auto1}
                        value={vendorAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setVendorAutoReset("전체");
                          } else {
                            setVendorAutoReset(newValue);
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
                      <Autocomplete
                        className={classes.grid}
                        options={auto2}
                        value={partAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setPartAutoReset("전체");
                          } else {
                            setPartAutoReset(newValue);
                          }
                        }}
                        renderInput={params => (
                          <TextField {...params} name="partName" label="파트명" variant="outlined" />
                        )}
                      />        
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        className={classes.grid}
                        options={auto3}
                        value={itemAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setItemAutoReset("전체");
                          } else {
                            setItemAutoReset(newValue);
                          }
                        }}
                        renderInput={params => (
                          <TextField {...params} name="itemName" label="장치명" variant="outlined" />
                        )}
                      />       
                    </Grid>
                    <Grid item xs={12} sm={3} xl={3}>
                      <SoftButton
                        type="submit"
                        form="formSearchData"
                        variant="outlined"
                        color="info"
                        size="large"
                        style={{width: "95%", margin: "10px"}}
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
                      vendorName: {
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
