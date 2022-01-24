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
      //rowHeaders={['rowNum']}
      rowHeight={20}
      bodyHeight={500}
      virtualScrolling={true}
      heightResizable={true}
      //onClick={check}
    />
  );
};

export default BasicGrid;