import React, { useCallback } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import RemoveButtonRenderer from "components/ToastGrid/Renderer";

//import DataTable from "components/Table/DataTable.js";

export default function Tuigrid() {

  const data = [
    { customerName: '약수 연세치과', phoneNumber: '010-1111-2222', patientName: '최진실', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '전윤화', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '정보경', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '연세 아이야기치과', phoneNumber: '010-1111-2222', patientName: '이유림', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '연세유라인', phoneNumber: '010-1111-2222', patientName: '조유나', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '연세유라인', phoneNumber: null, patientName: '박재민', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '이바른치과', phoneNumber: '010-1111-2222', patientName: '안유라', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '서울시카고', phoneNumber: '010-1111-2222', patientName: '이혜빈', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' },
    { customerName: '마포한그루', phoneNumber: '010-1111-2222', patientName: '박진희', receiptDate: '2021-12-29',  completeDate: '2011-12-29', time: '12:00' }
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
  
  const check = (object) => {
    //console.log(object);
  }

  return(
    <div>
      <Grid
        data={data}
        columns={columns}
        rowHeight={25}
        bodyHeight={700}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}
        onClick={check}
      />
    </div>
  );

}