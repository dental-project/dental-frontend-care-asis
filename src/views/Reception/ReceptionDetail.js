import React, { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiBadge from "components/Sui/SuiBadge";

// Soft UI Dashboard React example components
import Table from "components/Sui/SuiTable";


import toothImg from "assets/img/toothImg.svg";

import axios from "axios";





// @mui material components
import Grid from "@mui/material/Grid";




import ImageCard from "components/ImageCard";
import ImageModalContainer from "containers/ImageModalContainer";








export default function ReceptionDetail({location}) {

  const [detailData, setDetailData] = useState([]);
  console.log(location);

  useEffect(() => {

    if(location.seqId === undefined || location.seqId === null || location.seqId === "") return;

    const masterSeqId = location.seqId;
    
    axios
    .get(`http://localhost:8000/api/sell/master/${masterSeqId}/details/`)
      .then(result => {

        //console.log(result);
        setDetailData(result.data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }, []);
  
 
  // 추가 모달
  const [openReceptionDetailModal, setOpenReceptionDetailModal] = useState(false);

  const handleReceptionDetailModalOpen = () => {
    setOpenReceptionDetailModal(true);
  };
  const handleReceptionDetailModalClose = () => {
    setOpenReceptionDetailModal(false);
  };


  const masterColumns = [
    {
      name: " ",
      align: "left"
    },
    {
      name: "접수일자",
      align: "center"
    },
    {
      name: "완성일자",
      align: "center"
    },
    {
      name: "배달일자",
      align: "center"
    },
    {
      name: "거래처",
      align: "center"
    },
    {
      name: "차트번호",
      align: "center"
    },
    {
      name: "Upper",
      align: "center"
    },
    {
      name: "Lower",
      align: "center"
    },
    {
      name: "Bite",
      align: "center"
    },
    {
      name: "Appliance",
      align: "center"
    },
    {
      name: "환자명",
      align: "center"
    },
    {
      name: "비고",
      align: "center"
    }
  ];







  const columns = [
    {
      name: " ",
      align: "left"
    },
    {
      name: "파트명",
      align: "center"
    },
    {
      name: "장치명",
      align: "center"
    },
    {
      name: "단가",
      align: "center"
    },
    {
      name: "수량",
      align: "center"
    },
    {
      name: "정상가",
      align: "center"
    },
    {
      name: "할인금액",
      align: "center"
    },
    {
      name: "할인율",
      align: "center"
    },
    {
      name: "최종금액",
      align: "center"
    },
  ]








  const masterRows = [];
  const prRows = [];

  location.data.map((data,key) => {
    masterRows.push({
      //" ": [toothImg],
      접수일자: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.receiptDate}
        </SuiTypography>
      ),
      완성일자: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.completionDate}
        </SuiTypography>
      ),
      배달일자: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.deliveryDate}
        </SuiTypography>
      ),
      거래처: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.vendorName}
        </SuiTypography>
      ),
      차트번호: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.chartNumber}
        </SuiTypography>
      ),
      Upper: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.upper.toString()}
        </SuiTypography>
      ),
      Lower: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.lower.toString()}
        </SuiTypography>
      ),
      Bite: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.bite.toString()}
        </SuiTypography>
      ),
      Appliance: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.appliance.toString()}
        </SuiTypography>
      ),
      환자명: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.patientName}
        </SuiTypography>
      ),
      비고: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.description}
        </SuiTypography>
      )
    })
  });

  

  detailData.map((data,key) => {
    prRows.push({
      //" ": [toothImg],
      파트명: (
        <SuiBadge variant="gradient" badgeContent={data.partName} color="success" size="lg" container />
      ),
      장치명: (
        <SuiBadge variant="gradient" badgeContent={data.itemName} color="info" size="lg" container />
      ),
      단가: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.unitPrice} 원
        </SuiTypography>
      ),
      수량: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.amount} 개
        </SuiTypography>
      ),
      정상가: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.normalPrice} 원
        </SuiTypography>
      ),
      할인금액: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.discountPrice} 원
        </SuiTypography>
      ),
      할인율: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          {data.discount} %
        </SuiTypography>
      ),
      최종금액: (
        <SuiTypography variant="caption" color="info" fontWeight="medium">
          {data.realSellPrice} 원
        </SuiTypography>
      )
    })
  });

  return (
    <SuiBox py={3}>
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">접수리스트</SuiTypography>
          </SuiBox>
          <SuiBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={masterColumns} rows={masterRows} />
          </SuiBox>
        </Card>
      </SuiBox>
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">접수리스트 상세</SuiTypography>
          </SuiBox>
          <SuiBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={prRows} />
          </SuiBox>
        </Card>
      </SuiBox>
      <SuiBox mb={3}>
        <Card>
          <SuiBox pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Projects
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <ImageCard
                  image={location.data[0].requestForm}
                  label={"이미지1"}
                  title="이미지1"
                  description="기계장비 설명"
                  action={{}}

                  //onClick={handleReceptionModalOpen()}


                />
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>


      <ImageModalContainer
        open={openReceptionDetailModal}
        close={handleReceptionDetailModalClose}
        
      />








    </SuiBox>
  );
}