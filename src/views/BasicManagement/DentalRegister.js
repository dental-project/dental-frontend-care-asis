import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

// Material
import TextField from "@material-ui/core/TextField";

// Form 양식
import { useForm, Controller } from "react-hook-form";

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
    const { watch,  handleSubmit, control } = useForm();

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
        {name: "vendor_name", header: "거래처명"},
        {name: "ceo", header: "대표자"},
        {name: "part_name", header: "*"},
        {name: "part_name", header: "등급"},
        {name: "tel", header: "전화번호"},
        {name: "business_number", header: "사업자등록번호"}
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

    const onSubmit = (data) => {
        
    };

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