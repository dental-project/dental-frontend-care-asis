import React from "react";
import { render } from "react-dom";
import IconButton from '@material-ui/core/IconButton';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    
    render(
      <IconButton size="small" color="secondary" onClick={() => onRemoveButtonClicked(rowKey)}>
        <HighlightOffRoundedIcon/>
      </IconButton>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;