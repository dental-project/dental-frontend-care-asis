import React from "react";
import { render } from "react-dom";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;

    render(
      <HighlightOffRoundedIcon
        size="small"
        color="secondary"
        onClick={() => onRemoveButtonClicked(props.grid.store.data.rawData[rowKey].seqId)}
      />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;
