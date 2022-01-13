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

// api
import axios from 'axios';

import Modal from "components/Modal/Modal.js"

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

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

export default function PriceRegister() {

    const classes = useStyles();

    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.title,
    });

    // 모달
    const [openPriceAddModal, setOpenPriceModal] = useState(false);
    const [registerType, setRegisterType] = useState("");
    const [rowSeqId, setRowSeqId] = useState("");
    const [rowItemName, setRowItemName] = useState("");

    const handlePriceModalOpen = () => {
        setOpenPriceModal(true);
    };
    const handlePriceModalClose = () => {
        setOpenPriceModal(false);
    };

    const priceModalOpen = (e) => {
        setRegisterType("추가");
        handlePriceModalOpen();
    }


    const onUpdateButtonClicked = (seqId,partName) => {
      //console.log(rowIndex);
    };
  
    const onRemoveButtonClicked = (rowIndex) => {
      console.log(rowIndex);
    };

    const [priceData, setPriceData] = useState([]);
    const columns = ([
        {name: "vendor_name", header: "거래처명", align: "center" },
        {name: "part_name", header: "파트명", align: "center" },
        {name: "item_name", header: "장치명", align: "center" },
        {name: "price", header: "단가", align: "center" },
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
    const auto2 = [ {title: "전체"}, {title: "Diagnostic Study Models"}, {title: "Removale App"}, {title: "Fixed App"},{title: "Functional App"}];
    const auto3 = [ {title: "전체"}, {title: "asdasdasd"}, {title: "테스트 기공"}, {title: "테스트 기공2"},{title: "테스트 기공3"}];

    useEffect( () => {
        axios
          .get("http://localhost:8000/api/sell/price/")
          .then((result) => {
              console.log(result);
            setPriceData(result.data);
          })
          .catch((error) => {
            throw new Error(error);
          });
    }, []);

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
                                onClick={(e) => priceModalOpen(e)}
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
                                renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                              />

                              <Autocomplete
                                id="filter-demo"
                                className={classes.grid}
                                options={auto3}
                                getOptionLabel={(option) => option.title}
                                filterOptions={filterOptions}
                                style={{float: "left", width: "200px"}}
                                renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
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
                              type={"price"}
                              columns={columns}
                              data={priceData}
                          />
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
            
            <Modal      
                type={"price"}         
                modalType={registerType}
                rowSeqId={rowSeqId}
                rowValue={rowItemName}
                open={openPriceAddModal}
                close={handlePriceModalClose}
            />
      </>
    );

}