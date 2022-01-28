import React from "react";
import { render } from "react-dom";

class UpdateRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");
    
    const { onUpdateButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    const updateType = props.columnInfo.header;
    const seqId = props.grid.store.data.rawData[rowKey].seq_id;
    let partName = "";
    let itemName = "";
    // let price = "";
    // let vendor_name = "";
    // let ceo = "";
    // let tel = "";
    // let mobile = "";
    // let fax = "";
    // let business_number = "";
    // let business_type_name = "";
    // let business_sector_name = "";
    // let post_number = "";
    // let address = "";
    // let bank_name = "";
    // let bank_account = "";
    // let description = "";
    
    let obj;
    //let itemObj;
    //let dentalObj;
    //let priceObj;

    if(updateType === "파트수정") {
      obj = {
        seqId: seqId,
        partName: partName = props.grid.store.data.rawData[rowKey].part_name
      }
    } else if(updateType === "장치수정") {
      obj = {
        seqId: seqId,
        partName: partName = props.grid.store.data.rawData[rowKey].part_name,
        itemName: itemName = props.grid.store.data.rawData[rowKey].item_name
      };
    } else if(updateType === "치과수정") {
      obj = {
        seqId: seqId,
        vendor_name: props.grid.store.data.rawData[rowKey].vendor_name,
        ceo: props.grid.store.data.rawData[rowKey].ceo,
        tel: props.grid.store.data.rawData[rowKey].tel,
        mobile: props.grid.store.data.rawData[rowKey].mobile,
        fax: props.grid.store.data.rawData[rowKey].fax,
        businessNumber: props.grid.store.data.rawData[rowKey].business_number,
        businessTypeName: props.grid.store.data.rawData[rowKey].business_type_name,
        businessSectorName: props.grid.store.data.rawData[rowKey].business_sector_name,
        postNumber: props.grid.store.data.rawData[rowKey].post_number,
        address: props.grid.store.data.rawData[rowKey].address,
        bankName: props.grid.store.data.rawData[rowKey].bank_name,
        bankAccount: props.grid.store.data.rawData[rowKey].bank_account,
        description: props.grid.store.data.rawData[rowKey].description
      }
    } else if(updateType === "단가수정") {
      obj = {
        seqId: seqId,
        vendorName: props.grid.store.data.rawData[rowKey].vendor_name,
        itemName: props.grid.store.data.rawData[rowKey].item_name,
        price: props.grid.store.data.rawData[rowKey].price
      }
    }

    render(
      <button type="button" onClick={() => onUpdateButtonClicked(obj)}>수정</button>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default UpdateRenderer;