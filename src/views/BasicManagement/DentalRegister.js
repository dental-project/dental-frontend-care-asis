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

// Toast Grid
import ToastGrid from "@toast-ui/react-grid";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";
import DentalModalContainer from "containers/DentalModalContainer";

import { useDispatch, useSelector } from "react-redux";
import { dentals } from "modules/dentals";
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

  button: {
    width: "100%",
  },
}));

export default function DentalRegister() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data, count } = useSelector(({ dental }) => dental);
  const [gridData, setGridData] = useState([]);
  const [vendorAutoReset, setVendorAutoReset] = useState("전체");
  const [seqId, setSeqId] = useState("");
  const [dentalObj, setDentalObj] = useState({});

  useEffect(() => {
    setGridData(data);
  }, [data]);

  useEffect(() => {
    dispatch(dentals.getDentalMiddleware());
    setOpenDentalModal(false);
  }, [count]);
  
  useEffect(() => {
    setVendorAutoReset("전체");
  }, [vendorAutoReset]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option,
  });

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

  const onRemoveButtonClicked = (seqId, dentalObj)  => {
    setModalType("치과삭제");
    setSeqId(seqId);
    setDentalObj(dentalObj);
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
      header: "치과삭제",
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
    
    apis
      .dentalSearch({
        params: { vendorName: vendorName === "전체" ? "" : vendorName },
      })
      .then(result => {
        setGridData(result.data);
      })
      .catch(err => {
        alert(err);
      });
    
  };

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
                  치과 리스트
                </SoftTypography>
                <SoftBox display="flex" alignItems="center" lineHeight={0}></SoftBox>
              </SoftBox>
              <SoftBox px={2}>
                <SoftButton 
                  variant="gradient" 
                  color="dark"
                  style={{marginRight: "5px"}}
                  onClick={e => dentalModalOpen(e)}
                >
                  치과 추가
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox>   
              <form id="formSearchData" onSubmit={onSubmit}>
                <SoftBox display="flex" px={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} xl={3}>
                      <Autocomplete
                        freeSolo
                        className={classes.grid}
                        options={auto1}
                        value={vendorAutoReset}
                        getOptionLabel={option => option}
                        filterOptions={filterOptions}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setVendorAutoReset("");
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="vendorName"
                            label="거래처명"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                      <SoftButton
                        type="submit"
                        form="formSearchData"
                        variant="outlined"
                        color="info"
                        size="medium"
                        fullWidth
                        style={{marginTop: "5px", marginBottom: "10px"}}
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
