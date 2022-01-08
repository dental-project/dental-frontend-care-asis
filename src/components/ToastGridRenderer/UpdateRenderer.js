import React from "react";
import { render } from "react-dom";

class UpdateButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onUpdateButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    const seqId = props.grid.store.data.rawData[rowKey].seq_id;
    const partName = props.grid.store.data.rawData[rowKey].part_name;

    render(
      <button type="button" onClick={() => onUpdateButtonClicked(seqId,partName)}>수정</button>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default UpdateButtonRenderer;