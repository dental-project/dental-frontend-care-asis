import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// import Grid from '@material-ui/core/Grid';

// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import TextField from "@material-ui/core/TextField";

// import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({

  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 const FullModal = ({  open, close, children }) => {
   const classes = useStyles();
//   const { watch,  handleSubmit, control } = useForm();

//   const [spacing, setSpacing] = React.useState(2);
   //const [open, setOpen] = React.useState(false);

//   const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option) => option.title,
//   });




//   const dash1 = [ { title: "마포한그루" }, { title: "연세유라인" }, { title: "미소유" }, { title: "연세미엘치과" }, { title: "연세키즈사랑" }, { title: "연세윤치과" }, 
//                   { title: "군포 에미담치과" }, { title: "연세키즈투틴치과" }, { title: "중구강약안면외과" }, { title: "라임프로" }, { title: "연세후" }, 
//                   { title: "스노우화이트" }, { title: "과천 연세스위트" }, { title: "연세두리치과" }, { title: "서울늘편한" }, { title: "이바른치과" }, { title: "약수 연세치과" }, ];

//   const dash2 = [ { title: "파트명1" }, { title: "파트명2" }, { title: "파트명3" }, { title: "파트명4" }, { title: "파트명5" }, { title: "파트명6" }, { title: "파트명7" } ];
//   const dash3 = [ { title: "CRS" }, { title: "장치명1" }, { title: "장치명2" }, { title: "장치명3" }, { title: "장치명4" }, { title: "장치명5" } ];

  console.log(children);

  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={open}>
        Open full-screen dialog
      </Button> */}
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              접수 추가
            </Typography>
            <Button autoFocus color="inherit" onClick={close}>
              저장
            </Button>
          </Toolbar>
        </AppBar>

          {children}






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
    </>
  );
}

export default FullModal;