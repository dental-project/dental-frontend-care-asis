import React, { useEffect, useState } from 'react';
//import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({ modalType ,open, children, screen }) => {

  return (
    <Dialog fullScreen={screen} open={open}>
      <DialogTitle id="form-dialog-title">{modalType}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;