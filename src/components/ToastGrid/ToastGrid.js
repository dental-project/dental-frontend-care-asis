import React, { useCallback } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

import { render } from "react-dom";

export default function ToastGrid() {

  const gridRef = React.createRef();

  const data = [
    
  ]





  class RemoveButtonRenderer {
    element;
  
    constructor(props) {
      this.element = document.createElement("div");
  
      const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
      const { rowKey } = props;
      const seq_id = props.grid.store.data.rawData[rowKey].seq_id;
  
      render(
        <button type="button" onClick={() => onRemoveButtonClicked(seq_id)}>삭제</button>,
        this.element
      );
    }
  
    getElement() {
      return this.element;
    }
  }



  const onUpdateButtonClicked = () => {
    
  };







  const columns = [
    {
      header: '파트명 (선택)',
      name: 'partName',
      editor: {
        type: 'select',
        options: {
          listItems: [
            { text: 'Deluxe', value: '1' },
            { text: 'EP', value: '2' },
            { text: 'Single', value: '3' }
          ]
        }
      }
    },
    {
      header: '장치명 (선택)',
      name: 'itemName',
      formatter: 'listItemText',
      editor: {
        type: 'select',
        options: {
          listItems: [
            { text: 'Deluxe', value: '1' },
            { text: 'EP', value: '2' },
            { text: 'Single', value: '3' }
          ]
        }
      }
    },
    {
      header: '단가 (입력)',
      name: 'price',
      editor: 'text',
    },
    {
      header: 'tnfid (입력)',
      name: 'amount',
      editor: 'text'
    },
    {
      header: '할인율 (입력)',
      name: 'discount',
      editor: 'text'
    },
    {
      name: "update",
      header: "삭제",
      align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onUpdateButtonClicked
        }
      }
    },
  ];
  

  const onChange = (e) => {
    console.log(e);
  };

 


  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
    console.log(gridRef.current.props.data);
  };

  const aaa = () => {
    gridRef.current.getInstance().getData();
    console.log(gridRef.current.getInstance().getData());
  }

  return(
    <>
     <button onClick={handleAppendRow}>행추가</button>
     <button onClick={aaa}>저장</button>
      <Grid
        ref={gridRef}
        data={data}
        columns={columns}
        rowHeight={20}
        bodyHeight={200}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}
        onAfterChange={onChange}
      />

     
    </>
  );
}