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
    const [itemData, setItemData] = useState([]);
    const [columns, setColumns] = useState([
        {name: "part_no", header: "CodeNo", align: "center"},
        {name: "part_name", header: "기공명"},
        {name: "part_name", header: "Part"},
        {name: "part_name", header: "Price1"},
        {name: "part_name", header: "Price2"},
        {name: "part_name", header: "Price3"},
        {name: "part_name", header: "Price4"},
        {name: "part_name", header: "Price5"},
    ]);

    useEffect( () => {
        axios
          .get("http://localhost:8000/api/code//code/businessSector//")
          .then((result) => {
            setItemData(result.data);
            console.log(result);
          })
          .catch((error) => {
            throw new Error(error);
          });
    }, []);

    const onSubmit = (data) => {
        
    };

    return (
        <Container 
            fixed
            style={{maxWidth: "100%", background:"#E4E4E4"}}
            >
            <Grid container>
                <Grid item xs={3} className={classes.grid}>
                    <Card>
                        <CardHeader>
                            <Typography>추가,수정</Typography>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="codeNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            className={classes.textField} 
                                            label="번호"
                                            variant="outlined"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{ 
                                        required: '번호를 입력 해주세요.',
                                    }}
                                />
                                <Controller
                                    name="partName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            className={classes.textField} 
                                            label="파트명"
                                            variant="outlined"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                    rules={{ required: '파트명을 입력 해주세요.' }}
                                />  
                                <Button
                                    type="submit"
                                    className={classes.button} 
                                    color="info" 
                                    round
                                >
                                    저장
                                </Button>
                            </form>
                        
                        </CardBody>
                    </Card>
                </Grid>
                <Grid item xs={9} className={classes.grid}>
                    <Card>
                        <CardHeader>
                            <Typography>추가,수정</Typography>
                        </CardHeader>
                        <CardBody>
                            <BasicGrid 
                                data={itemData}
                                columns={columns}
                            />
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );

}