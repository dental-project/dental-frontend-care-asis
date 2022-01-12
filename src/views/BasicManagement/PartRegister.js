import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

// Form 양식
import { useForm, Controller } from "react-hook-form";

// api
import axios from "axios";

//
import apiAxios from "modules/apiAxios.js";

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

export default function PartRegister() {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();

    // 모달
    const [openPartAddModal, setOpenPartModal] = useState(false);
    const [registerType, setRegisterType] = useState("");
    const [rowSeqId, setRowSeqId] = useState("");
    const [rowPartName, setRowPartName] = useState("");

    const handlePartModalOpen = () => {
      setOpenPartModal(true);
    };
    const handlePartModalClose = () => {
      setOpenPartModal(false);
    };

    const partModalOpen = (e) => {
      setRegisterType("추가");
      handlePartModalOpen();
    }

    const onUpdateButtonClicked = (seqId,partName) => {
      setRegisterType("수정");
      setRowSeqId(seqId);
      setRowPartName(partName);
      handlePartModalOpen();
    };

    const onRemoveButtonClicked = (seqId) => {
      setRegisterType("삭제");
      setRowSeqId(seqId);
      handlePartModalOpen();
    };

    // Toast Grid options value
    const [partData, setPartData] = useState([]);
    const columns = ([
        // {name: "seq_id", header: "CodeNo", align: "center"},
        {name: "part_name", header: "파트명", align: "center"},
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
          name: "remove",
          header: "삭제",
          align: "center",
          renderer: {
            type: RemoveButtonRenderer,
            options: {
              onRemoveButtonClicked
            }
          }
        }
    ]);

    useEffect( () => {
        axios
          .get("http://localhost:8000/api/code/part/")
          .then((result) => {
             setPartData(result.data);
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
                        <Typography>추가</Typography>
                        <Button
                          type="submit"
                          className={classes.button} 
                          color="info" 
                          round
                          onClick={(e) => partModalOpen(e)}
                        >추가
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <BasicGrid 
                          type={"part"}
                          columns={columns}
                          data={partData}
                          //hoc={highFuc}
                        />
                    </CardBody>
                </Card>
            </Grid>
        </Grid>

        <Modal      
          type={"part"}         
          modalType={registerType}
          rowSeqId={rowSeqId}
          rowValue={rowPartName}
          open={openPartAddModal}
          close={handlePartModalClose}
        />

      </>
    );
}