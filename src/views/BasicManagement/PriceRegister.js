import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
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
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Card>
            <CardHeader>
              <Button
                type="submit"
                className={classes.button}
                color="info"
                round
                onClick={e => priceModalOpen(e)}
              >
                추가
              </Button>
            </CardHeader>
            <CardBody>
              <Grid item xs={12} className={classes.grid}>
                <form id="formSearchData" onSubmit={onSubmit}>
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
                  <Button
                    type="submit"
                    form="formSearchData"
                    color="primary"
                    round
                    style={{ float: "left", width: "100px" }}
                    //onClick={(e) => partModalOpen(e)}
                  >
                    검색
                  </Button>
                </form>
              </Grid>
              <ToastGrid columns={columns} data={gridData} bodyHeight={500} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>

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
