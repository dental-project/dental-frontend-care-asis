import React from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

const BasicGrid = ({
  data,
  columns
}) => {

  return(
    <Grid
      data={data}
      columns={columns}
      rowHeight={20}
      bodyHeight={500}
      virtualScrolling={true}
      heightResizable={true}
      rowHeaders={['rowNum']}
    />
  );
};

export default BasicGrid;