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

    if (props.grid.store.data.rawData[rowKey] !== undefined) {
      if (updateType === "접수수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seq_id,
          receiptDate: props.grid.store.data.rawData[rowKey].receipt_date,
          completionDate: props.grid.store.data.rawData[rowKey].completion_date,
          deliveryDate: props.grid.store.data.rawData[rowKey].delivery_date,
          vendorName: props.grid.store.data.rawData[rowKey].vendor_name,
          chartNumber: props.grid.store.data.rawData[rowKey].chart_number,
          upper: props.grid.store.data.rawData[rowKey].upper,
          lower: props.grid.store.data.rawData[rowKey].lower,
          bite: props.grid.store.data.rawData[rowKey].bite,
          appliance: props.grid.store.data.rawData[rowKey].appliance,
          patientName: props.grid.store.data.rawData[rowKey].patient_name,
          requestForm: props.grid.store.data.rawData[rowKey].request_form,
          desciption: props.grid.store.data.rawData[rowKey].desciption,
        };
      } else if (updateType === "파트수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seq_id,
          partName: props.grid.store.data.rawData[rowKey].part_name,
        };
      } else if (updateType === "장치수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seq_id,
          partName: props.grid.store.data.rawData[rowKey].part_name,
          itemName: props.grid.store.data.rawData[rowKey].item_name,
        };
      } else if (updateType === "치과수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seq_id,
          vendorName: props.grid.store.data.rawData[rowKey].vendor_name,
          ceo: props.grid.store.data.rawData[rowKey].ceo,
          tel: props.grid.store.data.rawData[rowKey].tel,
          mobile: props.grid.store.data.rawData[rowKey].mobile,
          fax: props.grid.store.data.rawData[rowKey].fax,
          businessNumber: props.grid.store.data.rawData[rowKey].business_number,
          businessTypeName:
            props.grid.store.data.rawData[rowKey].business_type_name,
          businessSectorName:
            props.grid.store.data.rawData[rowKey].business_sector_name,
          postNumber: props.grid.store.data.rawData[rowKey].post_number,
          address: props.grid.store.data.rawData[rowKey].address,
          bankName: props.grid.store.data.rawData[rowKey].bank_name,
          bankAccount: props.grid.store.data.rawData[rowKey].bank_account,
          description: props.grid.store.data.rawData[rowKey].description,
        };
      } else if (updateType === "단가수정") {
        obj = {
          seqId: props.grid.store.data.rawData[rowKey].seq_id,
          vendorName: props.grid.store.data.rawData[rowKey].vendor_name,
          itemName: props.grid.store.data.rawData[rowKey].item_name,
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
