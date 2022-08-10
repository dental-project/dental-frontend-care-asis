import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import ItemModalContainer from "containers/ItemModalContainer";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import "tui-grid/dist/tui-grid.css";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { useDispatch, useSelector } from "react-redux";
import { items } from "modules/items";
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

 
}));

export default function ItemRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ item }) => item);
  const [gridData, setGridData] = useState([]);
  const [partAutoReset, setPartAutoReset] = useState("전체");
  const [itemAutoReset, setItemAutoReset] = useState("전체");
  const [seqId, setSeqId] = useState();
  const [itemObj, setItemObj] = useState({});

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const partNameArr = [];
  const itemNameArr = ["전체"];

  data.map( (data) => {
    partNameArr.push( data.partName )
    itemNameArr.push( data.itemName )
  });
 
  const set1 = new Set(partNameArr.sort());
  const set2 = new Set(itemNameArr);
  
  const auto1 = [...set1];
  auto1.unshift("전체");
  const auto2 = [...set2];

  useEffect(() => {
    setGridData(data)
  }, [data]);

  useEffect(() => {
    dispatch(items.getItemMiddleware());
    setOpenItemModal(false);
  }, [count]);

  useEffect(() => {
    setItemAutoReset("전체");
  }, [itemAutoReset]);

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
    setModalType("장치수정");
    setItemObj(itemObj);
    handleItemModalOpen();
  };

  const onRemoveButtonClicked = (seqId, itemObj) => {
    setModalType("장치삭제");
    setSeqId(seqId);
    setItemObj(itemObj);
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
      header: "장치삭제",
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

    apis
      .itemSearch({
        params: {
          partSeqId: partName === "전체" ? "" : dataArr[0].partSeqId,
          itemName: itemName === "전체" ? "" : itemName,
        },
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
      <SoftBox py={3}>
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
                  장치 리스트
                </SoftTypography>
                <SoftBox display="flex" alignItems="center" lineHeight={0}>
                </SoftBox>
              </SoftBox>
              <SoftBox px={2}>
                <SoftButton 
                  variant="gradient" 
                  color="dark"
                  style={{marginRight: "5px"}}
                  onClick={e => itemModalOpen(e)}
                >
                  장치추가
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
                        freeSolo
                        className={classes.grid}
                        options={auto2}
                        value={itemAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setItemAutoReset("");
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
                      partName: {
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
