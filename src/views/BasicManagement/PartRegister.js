import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

// Form 양식
import { useForm, Controller } from "react-hook-form";


import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import { parts } from 'modules/parts';

import { useDispatch, useSelector } from 'react-redux';



import PartModalContainer from "containers/PartModalContainer";

const useStyles = makeStyles((theme) => ({
    grid: {
      padding: theme.spacing(1)
    },
    textFieldDate: {
      width: "100%"
    },
    textField: {
      width: "100%",
      margin: theme.spacing(1),
      '& label.Mui-focused': {
          color: '#00acc1',
      },
      '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
              borderColor: '#00acc1',
          },
      },
    },
    customText: {
      color: "#26c6da",
      fontWeight: "bold",
      cursor:"pointer",
      "&:hover": {
        color: "#1993A8"
      }
    },
    button: {
      width: "100%"
    }
  }));

function PartRegister() {

  const classes = useStyles();
  //const { watch,  handleSubmit, control } = useForm();

  const dispatch = useDispatch();
  const partData = useSelector(({part}) => part.data);

  useEffect(() => {
    dispatch(parts.getPartMiddleware());
    console.log("렌더링");
  }, [partData.length] );
 
  const auto1 = [ {title: "전체"}, {title: "Diagnostic Study Models"}, {title: "Removale App"}, {title: "Fixed App"},{title: "Functional App"} ];

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });

  
  const [registerType, setRegisterType] = useState("");
  const [seqId, setSeqId] = useState("");
  const [partName, setPartName] = useState("");

  // 모달
  const [openPartAddModal, setOpenPartModal] = useState(false);
  const handlePartModalOpen = () => {
    setOpenPartModal(true);
  };
  const handlePartModalClose = () => {
    setOpenPartModal(false);
  };

  const partModalOpen = (e) => {
    setRegisterType("추가");
    handlePartModalOpen();
  }

  const onUpdateButtonClicked = (seqId,partName) => {
    setRegisterType("수정");
    setSeqId(seqId);
    setPartName(partName);
    handlePartModalOpen();
  };

  const onRemoveButtonClicked = (seqId) => {
    setRegisterType("삭제");
    setSeqId(seqId);
    handlePartModalOpen();
  };

  // Toast Grid options value
  const columns = ([
    {name: "seq_id", header: "CodeNo", align: "center"},
    {name: "part_name", header: "파트명", align: "center"},
    { name: "update", header: "수정", align: "center",
      renderer: {
        type: UpdateButtonRenderer,
        options: {
          onUpdateButtonClicked
        }
      }
    },
    { name: "remove", header: "삭제", align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onRemoveButtonClicked
        }
      }
    }
  ]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Card>
            <CardHeader>
              <Button
                type="submit"
                className={classes.button} 
                color="info" 
                round
                onClick={(e) => partModalOpen(e)}
              >추가
              </Button>
            </CardHeader>
            <CardBody>
              <Grid item xs={6} className={classes.grid}>
                <Autocomplete
                  id="filter-demo"
                  className={classes.grid}
                  options={auto1}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  style={{float: "left", width: "300px"}}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Button
                  type="submit"
                  color="primary" 
                  round
                  style={{float: "left", width: "100px"}}
                  //onClick={(e) => partModalOpen(e)}
                >검색
                </Button>
              </Grid>                     

              <BasicGrid 
                type={"part"}
                columns={columns}
                data={partData}
                //hoc={highFuc}
              />

            </CardBody>
          </Card>
        </Grid>
      </Grid>

      <PartModalContainer      
        //type={"part"}         
        modalType={registerType}
        seqId={seqId}
        partName={partName}
        open={openPartAddModal}
        close={handlePartModalClose}
      />

    </>
  );
}

export default PartRegister;

// const mapStateToProps = ({part}) => {
//   return {
//     part: part
//   }
// }

// export default connect(mapStateToProps)(PartRegister)

