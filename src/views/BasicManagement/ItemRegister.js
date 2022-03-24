import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@mui/icons-material/Add';
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
}));

export default function ItemRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ item }) => item);
  const [gridData, setGridData] = useState([]);

  const [seqId, setSeqId] = useState();
  const [itemObj, setItemObj] = useState({});

  useEffect(() => {
    setGridData(data)
  }, [data]);

  useEffect(() => {
    dispatch(items.getItemMiddleware());
    setOpenItemModal(false);
  }, [count]);

  const auto1 = ["전체"];
  const auto2 = ["전체"];

  data.map( (data) => {
    auto1.push( data.partName )
    auto2.push( data.itemName )
  });
 
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

    let formData = new FormData(document.getElementById("formData"));
    const partName = formData.get("partName");
    const itemName = formData.get("itemName");

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
        console.log(result.data);
        
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
              <Grid item xs={12} className={classes.grid}>
                <form id="formData" onSubmit={onSubmit}>
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
                  <Button
                    type="submit"
                    form="formData"
                    style={{ float: "left"}}
                    variant="outlined"
                  >
                    검색
                  </Button>
                </form>

                <Button
                  type="submit"
                  color="info"
                  style={{ float: "right"}}
                  onClick={e => itemModalOpen(e)}
                >
                <AddIcon/>추가
              </Button>
              </Grid>

            </CardHeader>
            <CardBody>
              <ToastGrid columns={columns} data={gridData} bodyHeight={500} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>
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
