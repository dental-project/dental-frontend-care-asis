import React, { useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

const BasicGrid = ({
  data,
  columns,
  type,
  hoc
}) => {

  const [partNo, setPartNo] = useState("");
  const [part_name, setPartNameNo] = useState("");

  

  const check = (object) => {

    let rowKey = object.rowKey;
    
    let a = "";
    let b = "";

    if (type === "part") {

      a = object.instance.store.data.rawData[rowKey].part_no;
      b = object.instance.store.data.rawData[rowKey].part_name;

      let parmas = {
        partNo: a,
        partName: b
      }
      
      hoc(parmas);

      //setPartNo(a)

      //console.log(a);
      //console.log(b);
    }
    // if(type === "item") {
    //   console.log(object.instance.store.data.rawData[rowKey].item_no);
    //   console.log(object.instance.store.data.rawData[rowKey].item_name);
    // }
    // if(type === "dental") {
    //   console.log(object.instance.store.data.rawData[rowKey].vendor_id);
    //   console.log(object.instance.store.data.rawData[rowKey].vendor_name);
    // }

    
    
  }

  return(
    <Grid
      data={data}
      columns={columns}
      rowHeight={20}
      bodyHeight={500}
      virtualScrolling={true}
      heightResizable={true}
      rowHeaders={['rowNum']}
      onClick={check}
    />
  );
};

export default BasicGrid;