import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

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

import axios from "axios";

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
  
  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(parts.getPartMiddleware());
    setOpenPartModal(false);
  }, [count]);



  
  
  const auto1 = ["전체"];
  data.map( (data) => auto1.push( data.partName ));

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const [seqId, setSeqId] = useState("");
  const [partObj, setPartObj] = useState({});

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
    setModalType("추가");
    handlePartModalOpen();
  };

  const onUpdateButtonClicked = partObj => {
    setModalType("파트수정");
    setPartObj(partObj);
    handlePartModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
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
    const partName = formData.get("partName");

    if (partName === "") return alert("검색어를 입력하세요.");

    console.log(partName);

    axios
      .get("/api/code/part/", {
        params: {
          partName: partName === "전체" ? "" : partName,
        },
      })
      .then(result => {
        setGridData(result.data);
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  const [autoReset, setAutoReset] = useState("전체");

  useEffect(() => {
    setAutoReset("전체");
  }, [autoReset]);

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
                onClick={e => partModalOpen(e)}
              >
                추가
              </Button>
            </CardHeader>
            <CardBody>
              <Grid item xs={6} className={classes.grid}>
                <form id="formSearchData" onSubmit={onSubmit}>
                  <Autocomplete
                    freeSolo
                    className={classes.grid}
                    options={auto1}
                    //defaultValue={aaa}
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
                  <Button
                    type="submit"
                    form="formSearchData"
                    variant="outlined"
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
