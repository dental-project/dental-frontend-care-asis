import React, { useCallback } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

//import DataTable from "components/Table/DataTable.js";

export default function ToastGrid() {

  
  
  const onRemoveButtonClicked = (rowIndex) => {
    console.log(rowIndex);
  };


  const data = [
    {
      name: "aaa",
      typeCode: "Deluxe",
    },
    {
      name: "bbb",
    },
    {
      name: "ccc",
    },
    {
      name: "ddd",
    },
    {
      name: "eee",
    },
    {
      name: "fff",
    }
  ]

  const columns = [
    {
      header: 'Name',
      name: 'name',
      editor: 'text'
    },
    {
      header: 'Type',
      name: 'typeCode',
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
    }
  ];
  

  const onChange = (e) => {
    console.log(e);
  };


  return(
    <Grid
      data={data}
      columns={columns}
      rowHeight={20}
      bodyHeight={700}
      virtualScrolling={true}
      heightResizable={true}
      rowHeaders={['rowNum']}
      //onClick={onChange}
      onAfterChange={onChange}
    />
  );
}