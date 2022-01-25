import React, { useState } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import { useDispatch } from 'react-redux';

import { items } from 'modules/items';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

const ItemModalContainer = ({ modalType, open, close, seqId, partName, itemName }) => {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();
    const dispatch = useDispatch();
  
    const [autoPartName, setAutoPartName] = useState('');


    const onSubmit = (data) => {

        console.log(autoPartName);
        console.log(data);
       

      if(modalType === "추가") {
        const content = {
          part_seq_id: 1,
          item_name: data.itemName
        };
    
         dispatch(items.addItemMiddleware(content));
      }
    //   } else if(modalType === "수정") {

    //     const contents = {
    //       part_name: data.partName
    //     };
        
    //     dispatch(parts.updateItemMiddleware(seqId, contents))

    //   } else if(modalType === "삭제") {
    //     dispatch(parts.deleteItemMiddleware(seqId));
    //   }
      
    }






    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.partName,
      });



    const aaa = [
        { partName: "Removale App" },
        { partName: "Fixed App" },
        { partName: "Functional App" },
        { partName: "Splints" },
        { partName: "Diagnostic Study Models" },
        { partName: "Tooth Positioner" },
        { partName: "Indirect Bonding System" },
        { partName: "Distalizing" },
        { partName: "Sample" },
        { partName: "test" },
        { partName: "test1" },
        { partName: "ㄴㅇㅎㄴㅇㅎㄴㅇㅎ" }
    ];










    return (
      <Modal open={open} modalType={modalType}>
        <form onSubmit={handleSubmit(onSubmit)}>
        { 
          modalType === "삭제"
          ? null
          : (
            <>
                <Autocomplete
                    className={classes.textField}
                    name="partName"
                    control={control}
                    options={aaa}
                    getOptionLabel={(option) => option.partName}
                    filterOptions={filterOptions}
                    onChange={(event, newValue) => {
                        setAutoPartName(newValue);
                    }}
                    
                    getOptionSelected={(option, value) => {
                    return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                    }}
                    renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Controller
                    name="itemName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            className={classes.textField} 
                            label="장치명"
                            variant="outlined"
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ 
                        required: "장치명을 입력하세요."
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

export default ItemModalContainer;
