import React from "react";
import { render } from "react-dom";

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    const seq_id = props.grid.store.data.rawData[rowKey].seq_id;

    render(
      <button type="button" onClick={() => onRemoveButtonClicked(seq_id)}>삭제</button>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;