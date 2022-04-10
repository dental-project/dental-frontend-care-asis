import React from "react";
import { render } from "react-dom";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const rowKey = props.rowKey;
    const deleteType = props.columnInfo.header;
    let obj;

    if (props.grid.store.data.rawData[rowKey] !== undefined) {
      if (deleteType === "파트삭제") {
        obj = {
          partName: props.grid.store.data.rawData[rowKey].partName,
        };
      } else if (deleteType === "장치삭제") {
        obj = {
          itemName: props.grid.store.data.rawData[rowKey].itemName,
        };
      } else if (deleteType === "치과삭제") {
        obj = {
          vendorName: props.grid.store.data.rawData[rowKey].vendorName,
        };
      } else if (deleteType === "단가삭제") {
        obj = {
          vendorName: props.grid.store.data.rawData[rowKey].vendorName,
          itemName: props.grid.store.data.rawData[rowKey].itemName,
        };
      }
    }

    render(
      <HighlightOffRoundedIcon
        size="small"
        color="secondary"
        onClick={() => onRemoveButtonClicked(props.grid.store.data.rawData[rowKey].seqId, obj)}
      />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default RemoveButtonRenderer;
