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
            {/* <Button autoFocus color="inherit" onClick={close}>
              저장
            </Button> */}
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