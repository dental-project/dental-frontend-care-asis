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


import "tui-grid/dist/tui-grid.css";
import ToastGrid from "@toast-ui/react-grid";
import RowRemoveRenderer from "components/ToastGridRenderer/RowRemoveRenderer.js";


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
     marginTop: '20px',
   }
 }
));
 

const ReceptionModalContainer = ({ modalType, open, close, seqId, receptionObj }) => {
   
   const classes = useStyles();
   const gridRef = React.createRef();
   const { handleSubmit, control } = useForm();
   const dispatch = useDispatch();
   const dentalData = useSelector(({ dental }) => dental.data);
   const receptionData = useSelector(({ reception }) => reception.data);
   const [vendorId, setVendorId] = useState('');


   useEffect(() => {
     dispatch(dentals.getDentalMiddleware());
   }, [] );

   const handleAppendRow = () => {
     gridRef.current.getInstance().appendRow({});
   };

   const onRemoveButtonClicked = (rowKey) => {
     gridRef.current.getInstance().removeRow(rowKey);
   };

   const removeReceptionDetail = (index) => {
 
   }

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






   const newArray = receptionData.filter(
     (arr, index, callback) => index === callback.findIndex(t => t.part_name === arr.part_name)
   ).map( (data) => { return { text: data.part_name, value: data.part_name }} )
 
   const deduplication = (name, val) => {
     typeof(Storage) !== 'undefined' && localStorage.setItem(name, JSON.stringify(val));
   }
   
   deduplication('name',newArray)
 
   var something = {};
 
   for(let i=0; i<newArray.length; i++) {
     something[newArray[i].value] = receptionData.filter( (data) => 
       data.part_name === newArray[i].value 
     ).map( (data) => { return {text: data.item_name, value: data.item_name} } )
   }






   const columns = [
     {
       header: '파트명 (선택)',
       name: 'partName',
       editor: {
         type: 'select',
         options: {
           listItems: newArray
         }
       },
       validation: { required: true },
       relations: [
         {
           targetNames: ['itemName'],
           listItems({ value }) {
             return something[value];
           },
           disabled({ value }) {
             return !value;
           }
         }
       ]
     },
     {
       header: '장치명 (선택)',
       name: 'itemName',
       editor: {
         type: 'select',
         options: {
           listItems: []
         }
       },
       validation: { required: true }
     },
     {
       header: '단가',
       name: 'unitPrice',
       validation: { required: true }
     },
     {
       header: '수량 (입력)',
       name: 'amount',
       editor: 'text',
       validation: { required: true }
     },
     {
       header: '정상가',
       name: 'normalPrice',
       validation: { required: true }
     },
     {
       header: '할인금액 (입력)',
       name: 'discountPrice',
       editor: 'text',
       validation: { required: true }
     },
     {
       header: '최종금액',
       name: 'finalPrice',
       validation: { required: true }
     },
     {
       header: '할인율 ',
       name: 'discount',
       validation: { required: true }
     },
     {
       name: "update",
       header: "삭제",
       align: "center",
       renderer: {
         type: RowRemoveRenderer,
         options: {
           onRemoveButtonClicked
         }
       }
     },
   ];

   const onSubmit = (data) => {

     if(modalType === "추가") {

      if(vendorId === "") return alert("거래처명을 선택하세요"); 

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
   
       console.log(contents);

       const gridArr = gridRef.current.getInstance().getData();
 
       for(let i=0; i<gridArr.length; i++) {
         if(gridArr[i].partName == null || gridArr[i].partName == "") {
           return alert((i+1) + "번째 행 파트명을 선택하세요.");
         } else if(gridArr[i].itemName == null || gridArr[i].itemName == "") {
           return alert((i+1) + "번째 행 장치명을 선택하세요.");
         } else if(gridArr[i].amount == null || gridArr[i].amount == "") {
           return alert((i+1) + "번째 행 수량을 입력하세요.");
         } else if(gridArr[i].discountPrice == null || gridArr[i].discountPrice == "") {
           return alert((i+1) + "번째 행 할인금액을 입력하세요.");
         }
       }
   
       const priceContents = [];
       for(let i=0; i<gridArr.length; i++) {
     
         let a = receptionData.filter((data) => 
           data.item_name === gridArr[i].itemName
         )
   
         priceContents.push({
           sell_master_id: 1,
           item_seq_id: a[0].item_seq_id,
           sell_count: parseInt(gridArr[i].amount),
           normar_price: gridArr[i].normalPrice,
           real_sell_price: parseInt(gridArr[i].discountPrice),
           discount: parseFloat(gridArr[i].discount),
         })
         
       }

       dispatch(receptions.addReceptionMiddleware(contents));
       dispatch(receptions.addReceptionPriceMiddleware(priceContents));

     } else if(modalType === "접수수정") {
        if(vendorId === "") return alert("거래처명을 선택하세요"); 
     } else if(modalType === "삭제") {
       dispatch(receptions.deleteReceptionMiddleware(seqId));
     }

   }

   const onChange = (e) => {
  
     const gridArr = gridRef.current.getInstance().getData();
 
     let rowId = e.changes[0].rowKey;
     var regNumber = /^[0-9]*$/;
 
     if(e.changes[0].columnName === "partName") {
     
       resetColumn(rowId,"gridSelect");
 
     } else if(e.changes[0].columnName === "itemName") {
      
       let price = receptionData.filter( (data) => 
         data.part_name === gridArr[rowId].partName && data.item_name === gridArr[rowId].itemName 
       );
 
       resetColumn(rowId,"gridSelect");
       setColumnValue(rowId, "unitPrice", price[0].unit_price);
 
     } else if(e.changes[0].columnName === "amount") {
       
       if(regNumber.test(gridArr[rowId].amount) === false) return alert("정수만 입력 가능합니다.");
 
       resetColumn(rowId);
       setColumnValue(rowId, "normalPrice", (gridArr[rowId].unitPrice * parseInt(gridArr[rowId].amount)));
     
     } else if(e.changes[0].columnName === "discountPrice") {
 
       if(regNumber.test(gridArr[rowId].discountPrice) === false) {
         resetColumn(rowId);
         return alert("정수만 입력 가능합니다.");
       }
       if(parseInt(gridArr[rowId].discountPrice) > gridArr[rowId].normalPrice) {
         resetColumn(rowId);
         return alert("할인금액이 정상가보다 금액이 큽니다.");
       }
       setColumnValue(rowId, "finalPrice", (gridArr[rowId].normalPrice - parseInt(gridArr[rowId].discountPrice)));
       setColumnValue(rowId, "discount", (gridArr[rowId].discountPrice / gridArr[rowId].normalPrice * 100).toFixed(2) + "%");
      
     }
     
   };
 
   const setColumnValue = (rowId, columnName, value) => {
     gridRef.current.getInstance().setValue(rowId, columnName, value, false);
   }
 
   const resetColumn = (rowId, type) => {
 
     if(type === "vendorSelect") {
       gridRef.current.getInstance().setValue(rowId,'partName',"",false);
       gridRef.current.getInstance().setValue(rowId,'itemName',"",false);
     }
     if(type === "gridSelect") {
       gridRef.current.getInstance().setValue(rowId,'unitPrice',"",false);
       gridRef.current.getInstance().setValue(rowId,'amount',"",false);
       gridRef.current.getInstance().setValue(rowId,'normalPrice',"",false);      
     } 
 
     gridRef.current.getInstance().setValue(rowId,'discountPrice',"",false);
     gridRef.current.getInstance().setValue(rowId,'finalPrice',"",false);
     gridRef.current.getInstance().setValue(rowId,'discount',"",false);
 
   }


   return (
     <Modal open={open} modalType={modalType} screen={true}>
       <form onSubmit={handleSubmit(onSubmit)}>
       { 
         modalType === "삭제"
         ? null
         : (
           <>
             <Grid container>
               <Grid item xs={4}>
                 <Controller
                   name="receiptDate"
                   control={control}
                   render={({ field: { onChange, value }, fieldState: { error } }) => (
                     <TextField
                       className={classes.textField} 
                       label="접수일자"
                       type="date"
                       defaultValue={receptionObj.receiptDate?receptionObj.receiptDate:""}
                       onChange={onChange}
                       error={!!error}
                       helperText={error ? error.message : null}
                       InputLabelProps={{ shrink: true, }}
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
                       defaultValue={receptionObj.completionDate?receptionObj.completionDate:""}
                       onChange={onChange}
                       error={!!error}
                       helperText={error ? error.message : null}
                       InputLabelProps={{ shrink: true, }}
                     />
                   )}
                   rules={{ 
                     required: "완성일자를 선택하세요."
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
                       onChange={onChange}
                       InputLabelProps={{ shrink: true, }}
                     />
                   )}
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
                   getOptionSelected={(option, value) => {
                     return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                   }}
                   onChange={(event, newValue) => {
                    if(newValue === null) {
                      setVendorId("");
                    }
                    if(newValue !== null) {
                         const index = dentalData.findIndex(obj => obj.vendor_name === newValue.vendor_name) 
                         const vendorSeqId = dentalData[index].seq_id
                         resetColumn("vendorSelect");
                         dispatch(receptions.getVendorPartMiddleware(vendorSeqId));
                         setVendorId(vendorSeqId);
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

             </Grid>

             <Grid container justifyContent="center" style={{marginTop: "30px", fontSize: "30px"}}>
                 {"image.png"}
             </Grid>

             <Button className={classes.button}  color="info" round >
               이미지 업로드
             </Button>
          </>
         )
       }


       <Grid item xs={12}>
         
         <Button className={classes.button}  color="info" round  onClick={handleAppendRow}>그리드 행추가</Button>
         {/* <Button className={classes.button}  color="info" round  onClick={save}>저장</Button> */}
         <ToastGrid
           ref={gridRef}
           columns={columns}
           rowHeight={20}
           bodyHeight={200}
           virtualScrolling={true}
           heightResizable={true}
           rowHeaders={['rowNum']}
           onAfterChange={onChange}
         />
         
       </Grid>

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

export default ReceptionModalContainer;