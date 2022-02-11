 import React, { useState, useEffect } from 'react'
 import { makeStyles } from '@material-ui/core/styles';
 import Button from "components/CustomButtons/Button.js";
 import Modal from 'components/Modal/Modal'
 import ListItemText from '@material-ui/core/ListItemText';
 import ListItem from '@material-ui/core/ListItem';
 import List from '@material-ui/core/List';
 import Divider from '@material-ui/core/Divider';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 import Checkbox from '@material-ui/core/Checkbox';
 import Grid from '@material-ui/core/Grid';

 import TextField from "@material-ui/core/TextField";
 import { useForm, Controller } from "react-hook-form";

 import { useDispatch, useSelector } from 'react-redux';

 import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

 import { receptions } from 'modules/receptions';
 import { dentals } from 'modules/dentals';
 import { parts } from 'modules/parts';
 import { items } from 'modules/items'
 import ToastGrid from 'components/ToastGrid/ToastGrid';


 const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    textField: {
      width: "97%",
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
    textField2: {
      float: "left",
      //width: "47%",
      marginTop: "20px",
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
      width: "100%",
      background: '#26c6da',
      marginTop: '20px',
    }
  }));
  

 const ReceptionModalContainer = ({ modalType, open, close, seqId, receptionObj }) => {
    
    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();
    
    const [spacing, setSpacing] = React.useState(2);
   
    const dispatch = useDispatch();
    const receptionData = useSelector(({ reception }) => reception.data);
    const dentalData = useSelector(({ dental }) => dental.data);
    //const partData = useSelector(({ part }) => part.data);
    

    useEffect(() => {
      //dispatch(receptions.getReceptionMiddleware());
      
    }, [] );

    useEffect(() => {
      dispatch(dentals.getDentalMiddleware());
      //dispatch(parts.getPartMiddleware());
    }, [] );

    //console.log(receptionData);
   

    const filterVendorName = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.vendor_name,
    });

    const filterPartName = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.part_name,
    });

    const vendorNameAuto = [];
    dentalData.map( (data) => vendorNameAuto.push({ vendor_name: data.vendor_name }));

    //const partNameAuto = [];
    //partData.map( (data) => partNameAuto.push({ part_name: data.part_name }))

    

    const onSubmit = (data) => {

      if(modalType === "추가") {

        let upper = false;
        let lower = false;
        let bite = false;
        let appliance = false;

        if(data.upper === true) upper = true;
        if(data.lower === true) lower = true;
        if(data.bite === true) bite = true;
        if(data.appliance === true) appliance = true;

        const contents = {
          receipt_date: data.receiptDate,
          completion_date: data.completionDate,
          delivery_date: data.deliveryDate,
          chart_number: parseInt(data.chartNumber),
          upper: upper,
          lower: lower,
          bite: bite,
          appliance: appliance,
          patient_name: data.patientName,
          request_form: "/test/test.png",
          description: "비고",
          vendor_seq_id: 1
        }
    
        dispatch(receptions.addReceptionMiddleware(contents));

      } else if(modalType === "접수수정") {
       
      } else if(modalType === "삭제") {
        dispatch(receptions.deleteReceptionMiddleware(seqId));
      }

    }


  


    
    
    // const [receptionDetailData, setReceptionDetailData] = useState([0]);

    // const addReceptionDetail = () => {
    //   setReceptionDetailData([...receptionDetailData, 0])
    // }

    const removeReceptionDetail = (index) => {
      //console.log(index);
      //setReceptionDetailData([receptionDetailData.filter => receptionDetailData.length])
    }


    return (
      <Modal open={open} modalType={modalType}>
        <form onSubmit={handleSubmit(onSubmit)}>
        { 
          modalType === "삭제"
          ? null
          : (
            <>
              <Grid container spacing={1} >
                <Grid item xs={4}>
                  <Controller
                    name="receiptDate"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="접수일자"
                        type="date"
                        defaultValue="2022-01-11"
                        defaultValue={receptionObj.receiptDate?receptionObj.receiptDate:""}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        //InputLabelProps={{ shrink: true, }}
                      />
                    )}
                    rules={{ 
                      required: "접수일자를 선택하세요."
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="completionDate"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="완성일자"
                        type="date"
                        defaultValue="2022-01-11"
                        defaultValue={receptionObj.completionDate?receptionObj.completionDate:""}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        //InputLabelProps={{ shrink: true, }}
                      />
                    )}
                    rules={{ 
                      required: "접수일자를 선택하세요."
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className={classes.textField} 
                        label="배달일자"
                        type="date"
                        defaultValue="2022-01-11"
                        defaultValue={receptionObj.deliveryDate?receptionObj.deliveryDate:""}
                        onChange={onChange}
                      />
                    )}
                    rules={{ 
                      required: "접수일자를 선택하세요."
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    freeSolo
                    className={classes.textField}
                    name="vendorName"
                    control={control}
                    options={vendorNameAuto}
                    getOptionLabel={(option) => option.vendor_name}
                    filterOptions={filterVendorName}
                    onChange={(event, newValue) => {
                      if(newValue !== null) {
                          const index = dentalData.findIndex(obj => obj.vendor_name === newValue.vendor_name) 
                          const vendorSeqId = dentalData[index].seq_id
                          console.log(vendorSeqId);
                         
                          dispatch(receptions.getVendorPartMiddleware(vendorSeqId));
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                  />  
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="chartNumber"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className={classes.textField} 
                        label="차트번호"
                        defaultValue={receptionObj.chartNumber?receptionObj.chartNumber:""}
                        variant="outlined"
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="patientName"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="환자명"
                        variant="outlined"
                        defaultValue={receptionObj.patientName?receptionObj.patientName:""}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                    rules={{ 
                      required: "환자명을 입력하세요."
                    }}
                  />
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={2}>
                  <Controller
                    name="upper"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            onChange={onChange}
                            color="primary"
                            //onChange={upperChange}
                            defaultChecked={receptionObj.upper?receptionObj.upper:false}
                          />
                        }
                        label="Upper"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="lower"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            onChange={onChange}
                            color="primary"
                            defaultChecked={receptionObj.lower?receptionObj.lower:false}
                          />
                        }
                        label="Lower"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="bite"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            onChange={onChange}
                            color="primary"
                            defaultChecked={receptionObj.bite?receptionObj.bite:false}
                          />
                        }
                        label="Bite"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="appliance"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField}
                            onChange={onChange}
                            color="primary"
                            defaultChecked={receptionObj.appliance?receptionObj.appliance:false}
                          />
                        }                 
                        label="장치"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={2}></Grid>  

                {/* { 
                  receptionDetailData.map( (data, index) => {
                    return (
                      <Grid container spacing={1} key={index}>
                        <Grid item xs={2}>
                          <Autocomplete
                            className={classes.textField}
                            name="partName"
                            control={control}
                            options={partNameAuto}
                            getOptionLabel={(option) => option.part_name}
                            filterOptions={filterPartName}
                            onChange={(event, newValue) => { 
                              const partNameArr = newValue.part_name.split('/');

                              if(newValue === null) {
                                //setAutoVendorSeqId("");
                              } else {
                                  const index = partData.findIndex(obj => obj.part_name === partNameArr[0]);
                                  const partSeqId = partData[index].seq_id;

                                  console.log(partSeqId);
                                  dispatch(receptionDetails.getSelectItemMiddleware(partSeqId));
                                  //dispatch(receptionDetails.getSelectItemMiddleware(partSeqId));
                                  
                              }
                            }}
                            renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                          /> 
                        </Grid>    
                        <Grid item xs={2}>
                          <Autocomplete
                            className={classes.textField}
                            name="itemName"
                            control={control}
                            options={vendorNameAuto}
                            getOptionLabel={(option) => option.vendor_name}
                            filterOptions={filterPartName}
                            renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
                          />                  
                        </Grid>  

                        <Grid item xs={2}>
                          <Controller
                            name="price"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                className={classes.textField} 
                                label="단가"
                                variant="outlined"
                                //defaultValue={itemObj.itemName?itemObj.itemName:""}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                              />
                            )}
                            rules={{ 
                              required: "단가를 입력하세요."
                            }}
                        />
                        </Grid> 

                        <Grid item xs={2}>
                          <Controller
                            name="amount"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                className={classes.textField} 
                                label="수량"
                                variant="outlined"
                                //defaultValue={itemObj.itemName?itemObj.itemName:""}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                              />
                            )}
                            rules={{ 
                              required: "수량을 입력하세요."
                          }}
                        />
                        </Grid>    

                        <Grid item xs={2}>
                          <Controller
                            name="discount"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                className={classes.textField} 
                                label="할인율 (%)"
                                variant="outlined"
                                //defaultValue={itemObj.itemName?itemObj.itemName:""}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                              />
                            )}
                            rules={{ 
                              required: "할인율을 입력하세요."
                          }}
                        />
                        </Grid>

                        

                        <Grid item xs={1}>
                          <Button variant="outlined" color="primary" onClick={removeReceptionDetail()} >
                            삭제
                          </Button>
                        </Grid> 
                      
                      </Grid>
                    );
                  })
                } */}
                
              </Grid>

              {/* <Grid item xs={12}>
                  <Button variant="outlined" color="primary" onClick={addReceptionDetail} style={{width: "100%"}}>
                    +
                  </Button>
                </Grid> */}

              <Grid container justifyContent="center" spacing={spacing} style={{marginTop: "30px", fontSize: "30px"}}>
                  {"image.png"}
              </Grid>

              <Button className={classes.button}  color="info" round >
                이미지 업로드
              </Button>
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

        <Grid item xs={12}>
          <ToastGrid
            //partData={partData}
          >
          </ToastGrid>
        </Grid>

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

 export default ReceptionModalContainer;