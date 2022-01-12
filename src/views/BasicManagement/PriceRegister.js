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

    const [priceData, setPriceData] = useState([]);
    const columns = ([
        {name: "vendor_name", header: "파트명", align: "center" },
        {name: "part_name", header: "파트명", align: "center" },
        {name: "item_name", header: "장치명", align: "center" },
        {name: "price", header: "단가", align: "center" }
    ]);

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