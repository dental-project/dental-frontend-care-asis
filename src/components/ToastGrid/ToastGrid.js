import React, { useCallback } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import RemoveButtonRenderer from "components/ToastGridRenderer/Renderer.js";

//import DataTable from "components/Table/DataTable.js";

export default function ToastGrid() {

  const data = [
    { customerName: '약수 연세치과', phoneNumber: '010-1111-2222', patientName: '최진실', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "86,000" },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '전윤화', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "50,000" },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '정보경', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "70,000" },
    { customerName: '연세 아이야기치과', phoneNumber: '010-1111-2222', patientName: '이유림', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "140,000" },
    { customerName: '연세유라인', phoneNumber: '010-1111-2222', patientName: '조유나', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "20,000" },
    { customerName: '연세유라인', phoneNumber: null, patientName: '박재민', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "40,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00', price: "55,000" }
  ];
  
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