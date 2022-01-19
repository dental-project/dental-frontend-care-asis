import React from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    textField: {
      width: "95%",
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
    inputs: {
      '& label.Mui-focused': {
        color: '#26c6da',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#26c6da',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#26c6da',
        },
      },
    },
    button: {
      width: "100%"
    }
  }));

const PartModalContainer = ({ modalType, open, close }) => {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();

    const onSubmit = (data) => {
  
    }

    return (
        <Modal open={open}>
           
            
                { 
                modalType === "삭제"
                ? null
                : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="partName"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                className={classes.textField} 
                                label="파트명"
                                variant="outlined"
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                            )}
                            rules={{ 
                            required: "파트명을 입력하세요."
                            }}
                        />
                    </form>
                 
                )
                }
                <Button
                type="submit"
                className={classes.button} 
                color="info" 
                round
                >{modalType}
                </Button> 
          
         
            <Button
            className={classes.button} 
            color="danger" 
            round
            onClick={close}
            >취소
            </Button>
        </Modal>
    )
}

export default PartModalContainer
