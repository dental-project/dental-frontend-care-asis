import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";

// Soft UI Dashboard React example components
import Table from "components/Sui/SuiTable";

import axios from "axios";



export default function ReceptionDetail({location}) {

  const [detailData, setDetailData] = useState();

  useEffect(() => {

    if(location.seqId === undefined || location.seqId === null || location.seqId === "") return;

    const masterSeqId = location.seqId;
    
    axios
    .get(`http://localhost:8000/api/sell/master/${masterSeqId}/details/`)
      .then(result => {

        setDetailData(result.data);
        console.log(result);
      
    })
    .catch(error => {
      throw new Error(error);
    });
  }, []);
  
  //setSelectReceptionData(receptionObj);


  //const { columns, rows } = authorsTableData;
  //const { columns: prCols, rows: prRows } = projectsTableData;

  const columns = [
    {
      name: "partName",
      align: "left"
    },
    {
      name: "itemName",
      align: "left"
    },
    {
      name: "unitPrice",
      align: "left"
    },
    {
      name: "amount",
      align: "left"
    },
    {
      name: "normalPrice",
      align: "left"
    },
    {
      name: "discountPrice",
      align: "left"
    },
    {
      name: "realSellPrice",
      align: "left"
    },
    {
      name: "discount",
      align: "left"
    },
  ]





  const prRows = [
    {
     
      partName: (
        <SuiTypography variant="button" color="text" fontWeight="medium">
          $2,500
        </SuiTypography>
      ),
      itemName: (
        <SuiTypography variant="caption" color="text" fontWeight="medium">
          working
        </SuiTypography>
      ),
      
      
    }
  ];












  return (
    <SuiBox py={3}>
      
      <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SuiTypography variant="h6">Projects table</SuiTypography>
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
  );
}