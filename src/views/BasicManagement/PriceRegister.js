import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

import PriceModalContainer from "containers/PriceModalContainer";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { useDispatch, useSelector } from "react-redux";

import { prices } from "modules/prices";

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
  const [seqId, setSeqId] = useState("");
  const [priceObj, setPriceObj] = useState({});

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
                <Autocomplete
                  className={classes.grid}
                  options={auto1}
                  defaultValue={auto1[0]}
                  getOptionLabel={option => option}
                  filterOptions={filterOptions}
                  renderInput={params => (
                    <TextField
                      {...params}
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
                    <TextField {...params} label="파트명" variant="outlined" />
                  )}
                />
                <Autocomplete
                  className={classes.grid}
                  options={auto3}
                  defaultValue={auto3[0]}
                  getOptionLabel={option => option}
                  filterOptions={filterOptions}
                  renderInput={params => (
                    <TextField {...params} label="장치명" variant="outlined" />
                  )}
                />
                <Button
                  type="submit"
                  color="primary"
                  round
                  style={{ float: "left", width: "100px" }}
                  //onClick={(e) => partModalOpen(e)}
                >
                  검색
                </Button>
              </Grid>
              <BasicGrid type={"price"} columns={columns} data={data} />
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
