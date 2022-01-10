import React, { useCallback } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

//import DataTable from "components/Table/DataTable.js";

export default function ToastGrid() {

  
  
  const onRemoveButtonClicked = (rowIndex) => {
    console.log(rowIndex);
  };

  const columns = [
    { name: 'customerName', header: '거래처명' },
    { name: 'phoneNumber', header: '전화번호' },
    { name: 'patientName', header: '환자명' },
    { name: 'receiptDate', header: '접수일자' },
    { name: 'completeDate', header: '완성일자' },
    { name: 'time', header: '시간'},
    { name: 'ModU', header: 'ModU'},
    { name: 'ModL', header: 'ModL'},
    { name: 'Bite', header: 'Bite'},
    { name: 'App', header: 'App'},
    { name: 'price', header: '기공금액(원)', align: 'center'},
    { name: 'classification', header: '구분'},
    {
      name: 'remove',
      header: '삭제',
      align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onRemoveButtonClicked
        }
      }
    }
  ];
  
  return(
    <Grid
      data={data}
      columns={columns}
      rowHeight={20}
      bodyHeight={700}
      virtualScrolling={true}
      heightResizable={true}
      rowHeaders={['rowNum']}
    />
  );
}