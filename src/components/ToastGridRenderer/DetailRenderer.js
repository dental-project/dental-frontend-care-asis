import React from "react";
import { render } from "react-dom";
import SearchIcon from '@material-ui/icons/Search';

class DetailButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onDetailButtonClicked } = props.columnInfo.renderer.options;
    const rowKey = props.rowKey;

    const obj = {
      seqId: props.grid.store.data.rawData[rowKey].seqId,
      receiptDate: props.grid.store.data.rawData[rowKey].receiptDate,
      completionDate: props.grid.store.data.rawData[rowKey].completionDate,
      deliveryDate: props.grid.store.data.rawData[rowKey].deliveryDate,
      vendorName: props.grid.store.data.rawData[rowKey].vendorName,
      chartNumber: props.grid.store.data.rawData[rowKey].chartNumber,
      upper: props.grid.store.data.rawData[rowKey].upper,
      lower: props.grid.store.data.rawData[rowKey].lower,
      bite: props.grid.store.data.rawData[rowKey].bite,
      appliance: props.grid.store.data.rawData[rowKey].appliance,
      patientName: props.grid.store.data.rawData[rowKey].patientName,
      requestForm: props.grid.store.data.rawData[rowKey].requestForm,
      description: props.grid.store.data.rawData[rowKey].description,
    };

    render(
      <SearchIcon size="small" onClick={() => onDetailButtonClicked(obj)} />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default DetailButtonRenderer;