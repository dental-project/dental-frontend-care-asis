import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";



import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";
import DentalModalContainer from "containers/DentalModalContainer";

import { dentals } from "modules/dentals";

import { useDispatch, useSelector } from "react-redux";

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

export default function DentalRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ dental }) => dental);
  const [gridData, setGridData] = useState([]);
  
  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    setOpenDentalModal(false);
  }, [count]);
  
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const [seqId, setSeqId] = useState("");
  const [dentalObj, setDentalObj] = useState({});

  const vendorNameArr = ["전체"];

  data.map( (data) => {
    vendorNameArr.push(data.vendorName);
  });

  const set1 = new Set(vendorNameArr);
  const auto1 = [...set1];
  
  // 모달
  const [openDentalAddModal, setOpenDentalModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDentalModalOpen = () => {
    setOpenDentalModal(true);
  };
  const handleDentalModalClose = () => {
    setOpenDentalModal(false);
  };

  const dentalModalOpen = e => {
    setModalType("추가");
    handleDentalModalOpen();
  };

  const onUpdateButtonClicked = dentalObj => {
    setModalType("치과수정");
    setDentalObj(dentalObj);
    handleDentalModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handleDentalModalOpen();
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
      name: "ceo",
      header: "대표",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "tel",
      header: "전화번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "fax",
      header: "팩스번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "businessNumber",
      header: "사업자번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "businessTypeName",
      header: "업태",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "businessSectorName",
      header: "업종",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "postNumber",
      header: "우편번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
      hidden: true,
    },
    {
      name: "address",
      header: "주소",
      align: "center",
      
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bankName",
      header: "은행",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bankAccount",
      header: "계좌번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "description",
      header: "비고",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "update",
      header: "치과수정",
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
    const vendorName = formData.get("vendorName");
    
    if (vendorName === "") 
      return alert("검색어를 입력하세요.");
    
    axios
      .get("/api/vendor/", {
        params: {
          vendorName: vendorName === "전체" ? "" : vendorName,
        },
      })
      .then(result => {
        setGridData(result.data);
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Card>
            <CardHeader>
              <Grid item xs={12} className={classes.grid}>
                <form id="formSearchData" onSubmit={onSubmit}>
                  <Autocomplete
                    freeSolo
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
                  <Button
                    type="submit"
                    form="formSearchData"
                    variant="outlined"
                  >
                    검색
                  </Button>
                </form>
              </Grid>
              <Button
                type="submit"
                className={classes.button}
                color="info"
                round
                onClick={e => dentalModalOpen(e)}
              >
                추가
              </Button>
            </CardHeader>
            <CardBody>
              <ToastGrid columns={columns} data={gridData} bodyHeight={500} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>

      <DentalModalContainer
        modalType={modalType}
        open={openDentalAddModal}
        close={handleDentalModalClose}
        seqId={seqId}
        dentalObj={dentalObj}
      />
    </>
  );
}
