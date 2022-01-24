import React, { useState, useEffect, useRef } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from 'react-redux';

import { parts } from 'modules/parts';

// api
import axios from "axios";
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

const PartModalContainer = ({ modalType, open, close, seqId, partName }) => {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();
    const dispatch = useDispatch();
  


    const onSubmit = (data) => {

      if(modalType === "추가") {
        const content = {
          part_name: data.partName
        };
    
        dispatch(parts.addPartMiddleware(content));
      } else if(modalType === "수정") {

        const contents = {
          part_name: data.partName
        };
        
        dispatch(parts.updatePartMiddleware(seqId, contents))

      } else if(modalType === "삭제") {
        dispatch(parts.deletePartMiddleware(seqId));
      }
      
    }

    return (
      <Modal open={open} modalType={modalType}>
        <form onSubmit={handleSubmit(onSubmit)}>
        { 
          modalType === "삭제"
          ? null
          : (
              <>
                <Controller
                  name="partName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      className={classes.textField} 
                      label="파트명"
                      variant="outlined"
                      defaultValue={partName?partName:""}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ 
                    required: "파트명을 입력하세요."
                  }}
                />
                
              </>
            )
        }
          <Button
            type="submit"
            className={classes.button} 
            color="info" 
            round
          >
            {modalType}
          </Button> 
        </form>
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

// const mapStateToProps = ({part}) => {
//   return {
//     part: part.data
//   }
// }

// export default connect(mapStateToProps)(PartModalContainer)

export default PartModalContainer;
