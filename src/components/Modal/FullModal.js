import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Grid from '@material-ui/core/Grid';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    float: "left",
    width: "23%",
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
  textField2: {
    float: "left",
    width: "47%",
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const { watch,  handleSubmit, control } = useForm();

  const [spacing, setSpacing] = React.useState(2);
  const [open, setOpen] = React.useState(false);

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
    <div>
      <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              접수 추가
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              저장
            </Button>
          </Toolbar>
        </AppBar>



            <Grid container justifyContent="center" spacing={spacing}>
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
                
                <Autocomplete
                    className={classes.textField}
                    id="filter-demo"
                    options={dash1}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    renderInput={(params) => <TextField {...params} label="치과" variant="outlined" />}
                />  

                <Controller
                    name="partName"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        className={classes.textField} 
                        label="이름"
                        variant="outlined"
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                    )}
                    rules={{ 
                    required: "이름을 입력하세요."
                    }}
                />
            </Grid>

            <Grid container justifyContent="center" spacing={spacing}>
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

            <Grid container justifyContent="center" spacing={spacing}>
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

            <Grid container justifyContent="center" spacing={spacing}>
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
                {/* <div style={{align: "center"}}>test.png</div> */}



                <Grid container justifyContent="center" spacing={spacing} style={{marginTop: "30px", fontSize: "30px"}}>
                    {"image.png"}
                </Grid>

            <Button className={classes.button} style={{marginTop: "30px"}} onClick={props.handleClose}>
              이미지 업로드
            </Button>






        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}