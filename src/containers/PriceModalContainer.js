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

import { dentals } from 'modules/dentals';

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
    
  

    const dispatch = useDispatch();
    const priceData = useSelector(({price}) => price.data);
    const dentalData = useSelector(({dental}) => dental.data);
    //const businessSectorData = useSelector(({businessSector}) => businessSector.data);
    //const bankData = useSelector(({bank}) => bank.data);

    const [typeNo, setTypeNo] = useState('');
    const [sectorNo, setSectorNo] = useState('');
    const [bankNo, setBankNo] = useState('');


    useEffect(() => {
      
      dispatch(dentals.getDentalMiddleware());
      //dispatch(businessSectors.getBusinessSectorMiddleware());
      //dispatch(banks.getBankMiddleware());
    
    }, [] );



    console.log(priceData);
    console.log(dentalData);



    const auto1 = [];
    dentalData.map( (data) => auto1.push({ vendor_name: data.vendor_name + " / " + data.ceo}) );




    const dash1 = [ { title: "마포한그루" }, { title: "연세유라인" }, { title: "미소유" }, { title: "연세미엘치과" }, { title: "연세키즈사랑" }, { title: "연세윤치과" }, 
                    { title: "군포 에미담치과" }, { title: "연세키즈투틴치과" }, { title: "중구강약안면외과" }, { title: "라임프로" }, { title: "연세후" }, 
                    { title: "스노우화이트" }, { title: "과천 연세스위트" }, { title: "연세두리치과" }, { title: "서울늘편한" }, { title: "이바른치과" }, { title: "약수 연세치과" }, ];

    const dash2 = [ { title: "파트명1" }, { title: "파트명2" }, { title: "파트명3" }, { title: "파트명4" }, { title: "파트명5" }, { title: "파트명6" }, { title: "파트명7" } ];
    const dash3 = [ { title: "CRS" }, { title: "장치명1" }, { title: "장치명2" }, { title: "장치명3" }, { title: "장치명4" }, { title: "장치명5" } ];
    




  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.vendor_name,
  });


    const onSubmit = (data) => {

    //   if(modalType === "추가") {
    //     const content = {
    //       part_name: data.partName
    //     };
    
    //     dispatch(parts.addPartMiddleware(content));
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
                multiple
                id="checkboxes-tags-demo"
                options={auto1}
                disableCloseOnSelect
                getOptionLabel={(option) => option.vendor_name}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.vendor_name}
                  </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
                )}
              />

                {/* <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={auto1}
                  getOptionLabel={(option) => option.vendor_name}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                /> */}
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash2}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Autocomplete
                  className={classes.textField}
                  id="filter-demo"
                  options={dash3}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
                />  
                <Controller
                  name="itemName"
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
