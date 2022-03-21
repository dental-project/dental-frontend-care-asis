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

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    setOpenDentalModal(false);
  }, [count]);
  console.log(data);
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

  const [seqId, setSeqId] = useState("");
  const [dentalObj, setDentalObj] = useState({});

  const auto1 = ["전체"];
  const auto2 = ["전체"];
  const auto3 = ["전체"];

  data.map( (data) => {
    auto1.push( data.vendorName )
    auto2.push( data.ceo )
    auto3.push( data.tel )
  });


  console.log(data);




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
    },
    {
      name: "businessTypeName",
      header: "업태",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "businessSectorName",
      header: "업종",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "postNumber",
      header: "우편번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "address",
      header: "주소",
      align: "center",
      whiteSpace: "normal",
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

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Card>
            <CardHeader>
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
                    <TextField {...params} label="대표" variant="outlined" />
                  )}
                />
                <Autocomplete
                  className={classes.grid}
                  options={auto3}
                  defaultValue={auto2[0]}
                  getOptionLabel={option => option}
                  filterOptions={filterOptions}
                  style={{ float: "left", width: "200px" }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="전화번호"
                      variant="outlined"
                    />
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
              <ToastGrid columns={columns} data={data} bodyHeight={500} />
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
