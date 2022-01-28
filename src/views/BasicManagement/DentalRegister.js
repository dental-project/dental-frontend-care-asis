import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";


import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";
import DentalModalContainer from "containers/DentalModalContainer";

import { dentals } from 'modules/dentals';

import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    grid: {
      padding: theme.spacing(1)
    },
  
    textFieldDate: {
      width: "100%"
    },
    textField: {
      width: "100%",
      margin: theme.spacing(1),
      '& label.Mui-focused': {
          color: '#00acc1',
      },
      '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
              borderColor: '#00acc1',
          },
      },
    },
    customText: {
      color: "#26c6da",
      fontWeight: "bold",
      cursor:"pointer",
      "&:hover": {
        color: "#1993A8"
      }
    },
    button: {
      width: "100%"
    }
  }));

export default function DentalRegister() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const dentalData = useSelector(({dental}) => dental.data);
  
    useEffect(() => {
      dispatch(dentals.getDentalMiddleware());
      console.log(dentalData);
    }, [dentalData.length] );
   
    

    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.title,
    });


    
    const [seqId, setSeqId] = useState("");
    const [dentalObj, setDentalObj] = useState({});

    // 모달
    const [openDentalAddModal, setOpenDentalModal] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleDentalModalOpen = () => {
        setOpenDentalModal(true);
    };
    const handleDentalModalClose = () => {
        setOpenDentalModal(false);
    };

    const dentalModalOpen = (e) => {
      setModalType("추가");
      handleDentalModalOpen();
    }

    const onUpdateButtonClicked = (dentalObj) => {
      setModalType("치과수정");
      setDentalObj(dentalObj);
      handleDentalModalOpen();
    };
  
    const onRemoveButtonClicked = (seqId) => {
      setModalType("삭제");
      setSeqId(seqId);
      handleDentalModalOpen();
    };

    const columns = ([
      {name: "vendor_name", header: "거래처명", align: "center" },
      {name: "ceo", header: "대표", align: "center" },
      {name: "tel", header: "전화번호", align: "center" },
      {name: "fax", header: "팩스번호", align: "center" },
      {name: "business_number", header: "사업자번호", align: "center" },
      {name: "business_type_name", header: "업태", align: "center" },
      {name: "business_sector_name", header: "업종", align: "center" },
      {name: "post_number", header: "우편번호", align: "center" }, 
      {name: "address", header: "주소", align: "center" }, 
      {name: "bank_name", header: "은행", align: "center" },
      {name: "bank_account", header: "계좌번호", align: "center" },
      {name: "description", header: "비고", align: "center" },
      {
        name: "update",
        header: "수정",
        align: "center",
        renderer: {
          type: UpdateButtonRenderer,
          options: {
            onUpdateButtonClicked
          }
        }
      },
      {
        name: 'remove',
        header: '삭제',
        align: "center",
        renderer: {
          type: RemoveButtonRenderer,
          options: {
            onRemoveButtonClicked
          }
        }
      }   
    ]);

    const auto1 = [ {title: "전체"}, {title: "Dental.A 치과기공소"}];
    const auto2 = [ {title: "전체"}, {title: "김남규"}];
    const auto3 = [ {title: "전체"}, {title: "070-4147-6452"}];

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
                                onClick={(e) => dentalModalOpen(e)}
                            >추가
                            </Button>
                        </CardHeader>
                        <CardBody>

                        <Grid item xs={12} className={classes.grid}>
                        <Autocomplete
                          id="filter-demo"
                          className={classes.grid}
                          options={auto1}
                          getOptionLabel={(option) => option.title}
                          filterOptions={filterOptions}
                          style={{float: "left", width: "200px", marginLeft: "20px"}}
                          renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                        />

                        <Autocomplete
                          id="filter-demo"
                          className={classes.grid}
                          options={auto2}
                          getOptionLabel={(option) => option.title}
                          filterOptions={filterOptions}
                          style={{float: "left", width: "200px"}}
                          renderInput={(params) => <TextField {...params} label="대표" variant="outlined" />}
                        />

                        <Autocomplete
                          id="filter-demo"
                          className={classes.grid}
                          options={auto3}
                          getOptionLabel={(option) => option.title}
                          filterOptions={filterOptions}
                          style={{float: "left", width: "200px"}}
                          renderInput={(params) => <TextField {...params} label="전화번호" variant="outlined" />}
                        />

                        <Button
                          type="submit"
                          color="primary" 
                          round
                          style={{float: "left", width: "100px"}}
                          //onClick={(e) => partModalOpen(e)}
                        >검색
                        </Button>
                      </Grid>    

                        <BasicGrid 
                            type={"dental"}
                            columns={columns}
                            data={dentalData}
                        />
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