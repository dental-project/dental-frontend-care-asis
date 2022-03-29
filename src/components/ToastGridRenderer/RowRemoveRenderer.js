import React from "react";
import { render } from "react-dom";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const rowKey = props.rowKey;
    const seqId = props.grid.store.data.rawData[rowKey].seqId;

    render(
      <HighlightOffRoundedIcon size="small" color="secondary" onClick={() => onRemoveButtonClicked(seqId)} />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;