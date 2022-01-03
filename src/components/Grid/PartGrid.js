import React, { useEffect, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

// api
import axios from 'axios';
//import DataTable from "components/Table/DataTable.js";


// api
import dbAxios from "modules/apiAxios.js";


export default function PartGrid() {

  let [partData, setPartDate] = useState(0);

  const columns = [ 
    { name: "part_no", header: "CodeNo", align: "center" },
    { name: "part_name", header: "파트명" }
  ];
  
  useEffect( () => {


    // const url = "/code/part/";
  
    // const result = dbAxios(url);

    // console.log(result);



    axios
      .get("http://localhost:8000/api/code/part/")
      .then((result) => {
        console.log(result.data);
        setPartDate(result.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return(
    <div>
      <Grid
        data={partData}
        columns={columns}
        rowHeight={20}
        bodyHeight={500}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}
      />
    </div>
  );
}