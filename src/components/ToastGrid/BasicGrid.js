import React, { useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from 'tui-grid';

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

  TuiGrid.applyTheme('default', {
    
    scrollbar: {
      background: '#f5f5f5',
      thumb: '#339BD8'
    },
    row: {
      even: {
        background: '#272833'
      },
      hover: {
        background: '#339BD8'
      }
    },
    cell: {
      normal: {
        text: '#fff',
        background: '#272833',
        border: '#272833'
      },
      header: {
        text: '#339BD8',
        background: '#173C4F',
        border: '#173C4F'
      },
     
 
     
    
    }

    // cell: {
    //   normal: {
    //     text: '#ffffff',
    //     background: '#2E2F3A',
        
    //     showVerticalBorder: false,
    //     showHorizontalBorder: true
    //   },
    //   header: {
    //     background: '#fff',
    //     border: '#e0e0e0'
    //   },
    //   selectedHeader: {
    //     background: '#e0e0e0'
    //   }
    // }
  });
 
  return(
    <Grid
      data={data}
      columns={columns}
      rowHeight={20}
      bodyHeight={500}
      virtualScrolling={true}
      heightResizable={true}
      onClick={check}
    />
  );
};

export default BasicGrid;