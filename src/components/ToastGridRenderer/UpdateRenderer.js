import React from "react";
import { render } from "react-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

class UpdateRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onUpdateButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    const updateType = props.columnInfo.header;
    let obj;


    console.log(props);
    console.log(rowKey);

    if (props.grid.store.data.rawData[rowKey] !== undefined) {
      if (updateType === "접수수정") {
        obj = {
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
      } else if (updateType === "파트수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seqId,
          partName: props.grid.store.data.rawData[rowKey].partName,
        };
        //console.log(props);
        
      } else if (updateType === "장치수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seqId,
          partName: props.grid.store.data.rawData[rowKey].partName,
          itemName: props.grid.store.data.rawData[rowKey].itemName,
        };
      } else if (updateType === "치과수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seqId,
          vendorName: props.grid.store.data.rawData[rowKey].vendorName,
          ceo: props.grid.store.data.rawData[rowKey].ceo,
          tel: props.grid.store.data.rawData[rowKey].tel,
          mobile: props.grid.store.data.rawData[rowKey].mobile,
          fax: props.grid.store.data.rawData[rowKey].fax,
          businessNumber: props.grid.store.data.rawData[rowKey].businessNumber,
          businessTypeName: props.grid.store.data.rawData[rowKey].businessTypeName,
          businessSectorName: props.grid.store.data.rawData[rowKey].businessSectorName,
          postNumber: props.grid.store.data.rawData[rowKey].postNumber,
          address: props.grid.store.data.rawData[rowKey].address,
          bankName: props.grid.store.data.rawData[rowKey].bankName,
          bankAccount: props.grid.store.data.rawData[rowKey].bankAccount,
          description: props.grid.store.data.rawData[rowKey].description,
        };
      } else if (updateType === "단가수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seqId,
          vendorName: props.grid.store.data.rawData[rowKey].vendorName,
          itemName: props.grid.store.data.rawData[rowKey].itemName,
          price: props.grid.store.data.rawData[rowKey].price,
        };
      }
    }
    
    render(
      <EditOutlinedIcon
        size="small"
        color="primary"
        onClick={() => onUpdateButtonClicked(obj)}
      />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default UpdateRenderer;
