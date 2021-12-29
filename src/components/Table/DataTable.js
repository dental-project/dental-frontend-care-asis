import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'customerName',
    headerName: '거래처명',
    width: 150,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: '전화번호',
    width: 150,
    editable: true,
  },
  {
    field: 'patientName',
    headerName: '환자명',
    type: 'number',
    width: 150,
    editable: true,
  },

  {
    field: 'receiptDate',
    headerName: '접수일자',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'completeDate',
    headerName: '완성일자',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'time',
    headerName: '시간',
    type: 'number',
    width: 150,
    editable: true,
  },









//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];

const rows = [
  { id: 1, customerName: '약수 연세치과', phoneNumber: '010-1111-2222', patientName: '최진실', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 2, customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '전윤화', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 3, customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '정보경', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 4, customerName: '연세 아이야기치과', phoneNumber: '010-1111-2222', patientName: '이유림', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 5, customerName: '연세유라인', phoneNumber: '010-1111-2222', patientName: '조유나', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 6, customerName: '연세유라인', phoneNumber: null, patientName: '박재민', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 7, customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 8, customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
  { id: 9, customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%', color: '#FFFFFF', background: '#FFFFFF' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(params, event) => {
          if (!event.ignore) {
            console.log("push -> /roles/" + params.row.id);
          }
        }}
      />
    </div>
  );
}