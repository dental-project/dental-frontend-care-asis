import React from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from 'tui-grid';

const BasicGrid = ({
  data,
  columns,
}) => {

  TuiGrid.applyTheme('clean', {
    
    scrollbar: {
      background: "#f5f5f5",
      thumb: "#EAEAEA"
    },
    row: {
      even: {
        background: "#F6F6F6"
      },
      hover: {
        background: "#EAEAEA"
      }
    },
    cell: {
      header: {
        text: "#000",
        
        background: "#EAEAEA",
 
      },
      normal: {
        text: "#000",
        border: "#CCD5CC",
        background: "#fff",
        
      }
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
      rowHeight={'auto'}
      bodyHeight={500}
      virtualScrolling={true}
      heightResizable={true}
      hidden
    />
  );
};

export default BasicGrid;