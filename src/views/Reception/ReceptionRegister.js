import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

// core components
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

// Material
import TextField from "@material-ui/core/TextField";

import ReceptionModalContainer from "containers/ReceptionModalContainer";
//import PrintModal from "components/Modal/PrintModal.js"

import PrintModalContainer from "containers/PrintModalContainer";

import DetailButtonRenderer from "components/ToastGridRenderer/DetailRenderer.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { receptions } from "modules/receptions";
import { receptionDetails } from "modules/receptionDetails";
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

export default function ReceptionRegister() {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ reception }) => reception);
  const receptionDetailData = useSelector(({ receptionDetail }) => receptionDetail.data);

  const [seqId, setSeqId] = useState();
  const [receptionObj, setReceptionObj] = useState({});
  const [receptionDetailArr, setReceptionDetailArr] = useState([]);

  useEffect(() => {
    dispatch(receptions.getReceptionMiddleware());
    dispatch(receptionDetails.getReceptionDetailMiddleware());
    setOpenReceptionModal(false);
  }, [count]);

  // 추가 모달
  const [openReceptionAddModal, setOpenReceptionModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleReceptionModalOpen = () => {
    setOpenReceptionModal(true);
  };
  const handleReceptionModalClose = () => {
    setOpenReceptionModal(false);
  };

  // 출력 모달
  const [openPrint, setOpenPrint] = useState(false);
  const handleClickOpenPrint = () => {
    setOpenPrint(true);
  };
  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  const onDetailButtonClicked = () => {
    history.push("/dental/receptionDetail");
  };

  const receptionModalOpen = () => {
    setModalType("추가");
    handleReceptionModalOpen();
  };

  const onUpdateButtonClicked = receptionObj => {
    setModalType("접수수정");
    
    let detailArr = receptionDetailData.filter(
      data => data.sell_master_id === receptionObj.seqId
    );


    console.log(data);
    console.log(detailArr);
    console.log(receptionObj);
    console.log(receptionDetailArr);

    const sss = [];
    for (let i = 0; i<detailArr.length; i++) {
      //setUpdateData(i, columns[i].name, receptionDetailArr.partName);
          

      let element = data.filter(
        data => data.item_name === detailArr[i].itemName
      );

      sss.push({
        partName: 1,
        itemName: element[0].item_seq_id,
        unitPrice: 1,
        amount: detailArr[i].sell_count,
        normalPrice: detailArr[i].normal_price,
        discountPrice: detailArr[i].real_sell_price,
        finalPrice: detailArr[i].normal_price - detailArr[i].real_sell_price,
        discount: detailArr[i].discount,
      });
      
    }
    
     
    setReceptionObj(receptionObj);
    setReceptionDetailArr(sss);

    handleReceptionModalOpen();
  };

  const onRemoveButtonClicked = seqId => {
    setModalType("삭제");
    setSeqId(seqId);
    handleReceptionModalOpen();
  };

  const columns = [
    { name: "seq_id", header: "codeNo", align: "center", hidden: true },
    {
      name: "receipt_date",
      header: "접수일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "completion_date",
      header: "완성일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "delivery_date",
      header: "배달일자",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: { type: "date", options: { format: "yyyy.MM.dd" } },
    },
    {
      name: "vendor_name",
      header: "거래처",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "chart_number",
      header: "차트번호",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "upper",
      header: "Upper",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "lower",
      header: "Lower",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "bite",
      header: "Bite",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "appliance",
      header: "Appliance",
      align: "center",
      whiteSpace: "normal",
      resizable: true,
      sortable: true,
      filter: "select",
    },
    {
      name: "patient_name",
      header: "환자명",
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
      name: "detail",
      header: "상세보기",
      align: "center",
      renderer: {
        type: DetailButtonRenderer,
        options: {
          onDetailButtonClicked,
        },
      },
    },
    {
      name: "update",
      header: "접수수정",
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

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option.title,
  });

  const auto1 = [
    { title: "전체" },
    { title: "리더스탑치과" },
    { title: "이바른치과" },
    { title: "연세두리치과" },
    { title: "서울스위트치과" },
    { title: "연세바로치과" },
    { title: "서울시카고" },
  ];
  const auto2 = [
    { title: "전체" },
    { title: "최진실" },
    { title: "전윤화" },
    { title: "정보경" },
    { title: "이유림" },
    { title: "조유나" },
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
                onClick={e => receptionModalOpen(e)}
              >
                추가
              </Button>
            </CardHeader>
            <CardBody>
              <form className={classes.container} noValidate>
                <Grid
                  item
                  xs={4}
                  className={classes.grid}
                  style={{ float: "left" }}
                >
                  <TextField
                    id="date"
                    label="접수일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    style={{ width: "45%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="date"
                    label="완성일자"
                    type="date"
                    defaultValue="2022-01-12"
                    className={classes.textField}
                    style={{ width: "45%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  className={classes.grid}
                  style={{ float: "left" }}
                >
                  <Autocomplete
                    className={classes.grid}
                    options={auto1}
                    getOptionLabel={option => option.title}
                    filterOptions={filterOptions}
                    style={{
                      float: "left",
                      width: "200px",
                      marginLeft: "20px",
                    }}
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
                    getOptionLabel={option => option.title}
                    filterOptions={filterOptions}
                    style={{ float: "left", width: "200px" }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="환자명"
                        variant="outlined"
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    round
                    style={{ float: "left", width: "100px" }}
                  >
                    검색
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={classes.grid}
                  style={{ float: "right" }}
                >
                  <Button
                    color="danger"
                    round
                    style={{ width: "100%" }}
                    onClick={e => handleClickOpenPrint(e)}
                  >
                    출력
                  </Button>
                </Grid>
              </form>
              <BasicGrid columns={columns} data={data} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>
      <ReceptionModalContainer
        modalType={modalType}
        open={openReceptionAddModal}
        close={handleReceptionModalClose}
        seqId={seqId}
        receptionObj={receptionObj}
        receptionData={data}
        receptionDetailArr={receptionDetailArr}
      />
      <PrintModalContainer open={openPrint} close={handleClosePrint} />
    </>
  );
}
