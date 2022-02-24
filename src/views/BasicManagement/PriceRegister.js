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

  useEffect(() => {
    dispatch(prices.getPriceMiddleware());
    setOpenPriceModal(false);
  }, [count]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option.title,
  });

  const [seqId, setSeqId] = useState("");
  const [priceObj, setPriceObj] = useState({});

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
      name: "vendor_name",
      header: "거래처명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "part_name",
      header: "파트명",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "item_name",
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

  const auto1 = [{ title: "전체" }, { title: "Dental.A 치과기공소" }];
  const auto2 = [
    { title: "전체" },
    { title: "Diagnostic Study Models" },
    { title: "Removale App" },
    { title: "Fixed App" },
    { title: "Functional App" },
  ];
  const auto3 = [
    { title: "전체" },
    { title: "asdasdasd" },
    { title: "테스트 기공" },
    { title: "테스트 기공2" },
    { title: "테스트 기공3" },
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
                  id="filter-demo"
                  className={classes.grid}
                  options={auto1}
                  getOptionLabel={option => option.title}
                  filterOptions={filterOptions}
                  style={{ float: "left", width: "200px", marginLeft: "20px" }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="거래처명"
                      variant="outlined"
                    />
                  )}
                />

                <Autocomplete
                  id="filter-demo"
                  className={classes.grid}
                  options={auto2}
                  getOptionLabel={option => option.title}
                  filterOptions={filterOptions}
                  style={{ float: "left", width: "200px" }}
                  renderInput={params => (
                    <TextField {...params} label="파트명" variant="outlined" />
                  )}
                />

                <Autocomplete
                  id="filter-demo"
                  className={classes.grid}
                  options={auto3}
                  getOptionLabel={option => option.title}
                  filterOptions={filterOptions}
                  style={{ float: "left", width: "200px" }}
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
