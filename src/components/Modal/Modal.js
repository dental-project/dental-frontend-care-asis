import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({ modalType ,open, children, screen, maxWidth }) => {

  return (
    <Dialog fullScreen={screen} open={open} maxWidth={maxWidth} fullWidth={true}>
      <DialogTitle>{modalType}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;