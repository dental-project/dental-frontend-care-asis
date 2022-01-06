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
import axios from "axios";

//
import apiAxios from "modules/apiAxios.js";

import DashModal from "components/Modal/DashModal.js"
import { SettingsInputComponent } from "@material-ui/icons";

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

    // input insert
    const [inputs, setInputs] = useState({
        partNo: "",
        partName: "",
    });

    // const handleChange = (e) => {
    // const { value, name } = e.target;
    //     setInputs({
    //         ...inputs,
    //         [name]: value,
    //      });
    // };

    // input update
    //const [partNo, setPartNo] = useState("");
    //const [partName, setPartName] = useState("");

    const [partData, setPartData] = useState([]);
    const [columns, setColumns] = useState([
        {name: "part_name", header: "파트명", align: "center"}
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


    // const save = () => {

    //     // 추가
    //     // axios
    //     //     .post("http://localhost:8000/api/code/part/", {
    //     //         part_no: inputs.partNo,
    //     //         part_name: inputs.partName
    //     //     })
    //     //     .then((result) => {
            
               
    //     //     console.log(result);
        
    //     // })
    //     //     .catch((error) => {
    //     //     throw new Error(error);
    //     // });

    //     // 수정
    //     let parmas = {
    //         part_no: inputs.partNo,
    //         part_name: inputs.partName
    //     }

    //     axios
    //     .patch("http://localhost:8000/api/code/part/11", 
    //         {
    //             // headers: {
    //             //     'Content-Type': 'application/json'
    //             //     }
    //             //headers: {"Access-Control-Allow-Origin": "*"},
    //             header: {"Content-Type": "application/json"},
    //             header: {"Accept": "application/json"},
    //             // headers: {"Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type"},
    //             // headers: {"Access-Control-Max-Age": "86400"},
    //         },
    //         {
    //             id: 11,
    //             part_no: inputs.partNo,
    //             part_name: inputs.partName    
    //         }
       
    //     )
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         throw new Error(error);
    //     });


    //     console.log("adsasdasd");
    // }



    // const [inputs, setInputs] = useState({
    //     userid: "",
    //     passwd: "",
    //   });
    
    //   const handleChange = (e) => {
    //     const { value, name } = e.target;
    //     setInputs({
    //       ...inputs,
    //       [name]: value,
    //     });
    //   };

    // const highFuc = (params) => {
    //     setPartNo(params.partNo);
    //     setPartName(params.partName);
    // }

    // 모달
    const [openPartAddModal, setOpenPartModal] = useState(false);
    const [partModalType, setPartModalType] = useState();
    const handlePartModalOpen = () => {
      setOpenPartModal(true);
    };
    const handlePartAddModalClose = () => {
      setOpenPartModal(false);
    };

    const partModalOpen = (e) => {
        if(e.target.innerText === "추가") {
            setPartModalType(e.target.innerText);
            handlePartModalOpen();
          }
    }

    return (
      <>
        <Grid container>
            <Grid item xs={12} className={classes.grid}>
                <Card>
                    <CardHeader>
                        <Typography>추가,수정</Typography>
                        <Button
                            type="submit"
                            className={classes.button} 
                            color="info" 
                            round
                            onClick={(e) => partModalOpen(e)}
                        >
                            추가
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <BasicGrid 
                            data={partData}
                            columns={columns}
                            type={"part"}
                            //hoc={highFuc}
                        />
                    </CardBody>
                </Card>
            </Grid>

            

        </Grid>

<DashModal               
partModalType={partModalType}
open={openPartAddModal}
close={handlePartAddModalClose}
/>
</>
    );

}