 import React from 'react'
 import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
 import FullModal from 'components/Modal/FullModal'
 import ListItemText from '@material-ui/core/ListItemText';
 import ListItem from '@material-ui/core/ListItem';
 import List from '@material-ui/core/List';
 import Divider from '@material-ui/core/Divider';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 import Checkbox from '@material-ui/core/Checkbox';
 import Grid from '@material-ui/core/Grid';
 import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
 import TextField from "@material-ui/core/TextField";
 import { useForm, Controller } from "react-hook-form";

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
    }
  }));
  

 const ReceptionModalContainer = ({ modalType, open, close, seqId, receptionObj }) => {
    
    const classes = useStyles();
    const { watch,  handleSubmit, control } = useForm();
    const [spacing, setSpacing] = React.useState(2);
   
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });
    
    
    
    
    const dash1 = [ { title: "마포한그루" }, { title: "연세유라인" }, { title: "미소유" }, { title: "연세미엘치과" }, { title: "연세키즈사랑" }, { title: "연세윤치과" }, 
                    { title: "군포 에미담치과" }, { title: "연세키즈투틴치과" }, { title: "중구강약안면외과" }, { title: "라임프로" }, { title: "연세후" }, 
                    { title: "스노우화이트" }, { title: "과천 연세스위트" }, { title: "연세두리치과" }, { title: "서울늘편한" }, { title: "이바른치과" }, { title: "약수 연세치과" }, ];
    
    const dash2 = [ { title: "파트명1" }, { title: "파트명2" }, { title: "파트명3" }, { title: "파트명4" }, { title: "파트명5" }, { title: "파트명6" }, { title: "파트명7" } ];
    const dash3 = [ { title: "CRS" }, { title: "장치명1" }, { title: "장치명2" }, { title: "장치명3" }, { title: "장치명4" }, { title: "장치명5" } ];
      

    return (
        <FullModal open={open} >
        
            <Grid container spacing={1} >
                <Grid item xs={4}>
                  <TextField
                    id="date"
                    label="접수일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="date"
                    label="완성일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="date"
                    label="배달일자"
                    type="date"
                    defaultValue="2022-01-11"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    className={classes.textField}
                    id="filter-demo"
                    options={dash1}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
                  />  
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className={classes.textField} 
                        label="차트번호"
                        variant="outlined"
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="환자명"
                        variant="outlined"
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
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            checked={true}
                            onChange={onChange}
                            name="upper"
                            color="primary"
                          />
                        }
                        label="Upper"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            checked={true}
                            onChange={onChange}
                            name="lower"
                            color="primary"
                          />
                        }
                        label="Lower"
                      />
                    )}
                  />
                 </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField} 
                            checked={true}
                            onChange={onChange}
                            name="bite"
                            color="primary"
                          />
                        }
                        label="Bite"
                      />
                    )}
                  />
                 </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={classes.textField}
                            checked={true}
                            onChange={onChange}
                            name="appliance"
                            color="primary"
                          />
                        }                 
                        label="장치"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={2}></Grid>  

                <Grid item xs={2}>
                  <Autocomplete
                      className={classes.textField}
                      id="filter-demo"
                      options={dash2}
                      getOptionLabel={(option) => option.title}
                      filterOptions={filterOptions}
                      renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                  /> 
                </Grid>    
                <Grid item xs={2}>
                  <Autocomplete
                      className={classes.textField}
                      id="filter-demo"
                      options={dash3}
                      getOptionLabel={(option) => option.title}
                      filterOptions={filterOptions}
                      renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
                  />                  
                </Grid>  

                <Grid item xs={2}>
                  <Controller
                    name="partName"
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
                </Grid> 

                <Grid item xs={2}>
                  <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="수량"
                        variant="outlined"
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
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        className={classes.textField} 
                        label="할인율 (%)"
                        variant="outlined"
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
                  <Button variant="outlined" color="secondary" style={{width: "100%",height: "74%", marginTop: "8px"}}>
                    삭제
                  </Button>
                </Grid> 

                <Grid item xs={1}>
                  <Button variant="outlined" color="primary" style={{width: "100%",height: "74%", marginTop: "8px"}}>
                    +
                  </Button>
                </Grid>

              </Grid>

                <Grid container justifyContent="center" spacing={spacing} style={{marginTop: "30px", fontSize: "30px"}}>
                    {"image.png"}
                </Grid>

            <Button className={classes.button} style={{marginTop: "30px"}} >
              이미지 업로드
            </Button>
        
       
        </FullModal>
    )
 }

 export default ReceptionModalContainer;