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

export default function DentalRegister() {

    const classes = useStyles();

    // 모달
    const [openDentalAddModal, setOpenDentalModal] = useState(false);
    const [registerType, setRegisterType] = useState("");
    const [rowSeqId, setRowSeqId] = useState("");
    const [rowItemName, setRowItemName] = useState("");

    const handleDentalModalOpen = () => {
        setOpenDentalModal(true);
    };
    const handleDentalModalClose = () => {
        setOpenDentalModal(false);
    };

    const dentalModalOpen = (e) => {
        setRegisterType("추가");
        handleDentalModalOpen();
    }

    const [dentalData, setDentalData] = useState([]);
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
        {name: "description", header: "비고", align: "center" } 

        
    ]);

    useEffect( () => {
        axios
          .get("http://localhost:8000/api/vendor/")
          .then((result) => {
              console.log(result);
            setDentalData(result.data);
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
                                onClick={(e) => dentalModalOpen(e)}
                            >추가
                            </Button>
                        </CardHeader>
                        <CardBody>
                        <BasicGrid 
                            type={"dental"}
                            columns={columns}
                            data={dentalData}
                        />
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
            
            <Modal      
                type={"dental"}         
                modalType={registerType}
                rowSeqId={rowSeqId}
                rowValue={rowItemName}
                open={openDentalAddModal}
                close={handleDentalModalClose}
            />
      </>
    );

}