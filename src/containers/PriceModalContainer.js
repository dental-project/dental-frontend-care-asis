import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useDispatch, useSelector } from 'react-redux';

import { prices } from 'modules/prices';
import { dentals } from 'modules/dentals';
import { items } from 'modules/items';
import checkboxAdnRadioStyle from 'assets/jss/material-dashboard-react/checkboxAdnRadioStyle';

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


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  

const PriceModalContainer = ({ modalType, open, close, seqId, partName }) => {

    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();
    
    const [autoVendorSeqId, setAutoVendorSeqId] = useState('');
    const [autoItemSeqId, setAutoItemSeqId] = useState('');


    const dispatch = useDispatch();
    //const priceData = useSelector(({price}) => price.data);
    const dentalData = useSelector(({dental}) => dental.data);
    const itemData = useSelector(({item}) => item.data);
   

    useEffect(() => {
      
      dispatch(dentals.getDentalMiddleware());
      dispatch(items.getItemMiddleware());
  
    
    }, [] );



    //console.log(priceData);
    console.log(itemData);



    const auto1 = [];
    dentalData.map( (data) => auto1.push({ vendor_name: data.vendor_name + "/" + data.ceo}) );

    const auto2 = [];
    itemData.map( (data) => auto2.push({ item_name: data.item_name }) );




  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.vendor_name,
  });
  const filterOptions2 = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.item_name,
  });

    const onSubmit = (data) => {

      if(modalType === "추가") {
        const content = {
          vendor_seq_id: autoVendorSeqId,
          item_seq_id: autoItemSeqId,
          price: data.price
        };
        dispatch(prices.addPriceMiddleware(content));
      } else if(modalType === "삭제") {
        dispatch(prices.deletePriceMiddleware(seqId));
      }
    
    //     
    //   } else if(modalType === "수정") {

    //     const contents = {
    //       part_name: data.partName
    //     };
        
    //     dispatch(parts.updatePartMiddleware(seqId, contents))

    //   } else if(modalType === "삭제") {
    //     dispatch(parts.deletePartMiddleware(seqId));
    //   }
      
    }

    return (
      <Modal open={open} modalType={modalType}>
        <form onSubmit={handleSubmit(onSubmit)}>
        { 
          modalType === "삭제"
          ? null
          : (
            <>
              <Autocomplete
                options={auto1}
                getOptionLabel={(option) => option.vendor_name}
                filterOptions={filterOptions}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="거래처명" placeholder="Favorites" />
                )}
                getOptionSelected={(option, value) => {
                  return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                }}
                onChange={(event, newValue) => {

                  const vendorNameArr = newValue.vendor_name.split('/');

                  if(newValue === null) {
                    setAutoVendorSeqId("");
                  } else {
                      const index = dentalData.findIndex(obj => obj.vendor_name === vendorNameArr[0]);
                      const vendorSeqId = dentalData[index].seq_id;
                      setAutoVendorSeqId(vendorSeqId);
                  }
                }}
              />
              <Autocomplete
                options={auto2}
                getOptionLabel={(option) => option.item_name}
                filterOptions={filterOptions2}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="장치명" placeholder="Favorites"  />
                )}
                getOptionSelected={(option, value) => {
                  return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                }}
                onChange={(event, newValue) => {
                  if(newValue === null) {
                    setAutoItemSeqId("");
                  } else {
                    const index = itemData.findIndex(obj => obj.item_name === newValue.item_name);
                    const itemSeqId = itemData[index].seq_id;
                    setAutoItemSeqId(itemSeqId);
                  }
                }}

              />
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    className={classes.textField} 
                    label="단가"
                    variant="outlined"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ 
                  required: "단가를 입력하세요."
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

export default PriceModalContainer;
