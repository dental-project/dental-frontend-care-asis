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

export default function ItemRegister() {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();

    // 모달
    const [openItemAddModal, setOpenItemModal] = useState(false);
    const [registerType, setRegisterType] = useState("");
    const [rowSeqId, setRowSeqId] = useState("");
    const [rowItemName, setRowItemName] = useState("");

    const handleItemModalOpen = () => {
        setOpenItemModal(true);
    };
    const handleItemModalClose = () => {
        setOpenItemModal(false);
    };

    const itemModalOpen = (e) => {
        setRegisterType("추가");
        handleItemModalOpen();
    }

    const [itemData, setItemData] = useState([]);
    const columns = ([
        // {name: "seq_id", header: "CodeNo", align: "center"},
        {name: "part_name", header: "파트명", align: "center"},
        {name: "item_name", header: "장치명", align: "center"}
    ]);

    useEffect( () => {
        axios
          .get("http://localhost:8000/api/code/item/")
          .then((result) => {
            console.log(result);
            setItemData(result.data);
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
                    onClick={(e) => itemModalOpen(e)}
                  >추가
                  </Button>
                </CardHeader>
                <CardBody>
                  <BasicGrid 
                    type={"item"}
                    columns={columns}
                    data={itemData}
                  />
                </CardBody>
              </Card>
            </Grid>
          </Grid>
  
          <Modal      
            type={"item"}         
            modalType={registerType}
            rowSeqId={rowSeqId}
            rowValue={rowItemName}
            open={openItemAddModal}
            close={handleItemModalClose}
          />
      </>
    );
}