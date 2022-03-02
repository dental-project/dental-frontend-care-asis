import React from "react";
import { render } from "react-dom";
import SearchIcon from '@material-ui/icons/Search';

class DetailButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onDetailButtonClicked } = props.columnInfo.renderer.options;
    //const { rowKey } = props;
    //const seqId = props.grid.store.data.rawData[rowKey].seq_id;
    //const partName = props.grid.store.data.rawData[rowKey].part_name;
 
    render(
      <SearchIcon size="small" onClick={() => onDetailButtonClicked()} />,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

export default DetailButtonRenderer;