import React, { useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

const BasicGrid = ({
  data,
  columns
}) => {

  const [partNo, setPartNo] = useState();
  const [part_name, setPartNameNo] = useState();

  

  const check = (object) => {

    let rowKey = object.rowKey;

    console.log(object.instance.store.data.rawData[rowKey].part_no);
    console.log(object.instance.store.data.rawData[rowKey].part_name);
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