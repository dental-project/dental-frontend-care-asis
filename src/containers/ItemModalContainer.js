import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from 'react-redux';

import { parts } from 'modules/parts';
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
    const itemData = useSelector(({item}) => item.data);
    const partData = useSelector(({part}) => part.data);
   
    const [autoSeqId, setAutoSeqId] = useState('');

    useEffect(() => {
      dispatch(items.getItemMiddleware());
      dispatch(parts.getPartMiddleware());

      console.log("렌더링");
    
    }, [itemData.length] );


    const auto = [];
    partData.map( (data) => auto.push({ part_name: data.part_name}) );

    const onSubmit = (data) => {

      console.log(autoSeqId);
      console.log(data);
       
      if(modalType === "추가") {
        const content = {
          part_seq_id: autoSeqId,
          item_name: data.itemName
        };
    
        dispatch(items.addItemMiddleware(content));
      } else if(modalType === "삭제") {
        dispatch(items.deleteItemMiddleware(seqId));
      }
    //   } else if(modalType === "수정") {

    //     const contents = {
    //       part_name: data.partName
    //     };
        
    //     dispatch(parts.updateItemMiddleware(seqId, contents))

      
      
    }



    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.part_name,
      });












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
                    options={auto}
                    getOptionLabel={(option) => option.part_name}
                    filterOptions={filterOptions}
                    onChange={(event, newValue) => {
                     
                        const index = partData.findIndex(obj => obj.part_name === newValue.part_name);
                        const partSeqId = partData[index].seq_id;

                        setAutoSeqId(partSeqId);

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
