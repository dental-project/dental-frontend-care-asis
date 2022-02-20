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
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import { parts } from 'modules/parts';

import { useDispatch, useSelector } from 'react-redux';

import PartModalContainer from "containers/PartModalContainer";


import "tui-grid/dist/tui-grid.css";
import ToastGrid from "@toast-ui/react-grid";

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
  const gridRef = React.createRef();
  //const { watch,  handleSubmit, control } = useForm();

  const dispatch = useDispatch();
  const part = useSelector(({part}) => part);

  console.log(part);

  useEffect(() => {
    dispatch(parts.getPartMiddleware());

    setOpenPartModal(part.modal);
    
  }, [part.data.length] );
 
  const auto1 = [ {part_name: "전체"} ];
  part.data.map( (data) => auto1.push({ part_name: data.part_name}) );

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.part_name,
  });

  
  const [modalType, setModalType] = useState("");
  const [seqId, setSeqId] = useState("");
  const [partObj, setPartObj] = useState({});
  //const [partName, setPartName] = useState("");
  
  // 모달
  const [openPartAddModal, setOpenPartModal] = useState(false);
  const handlePartModalOpen = () => {
    setOpenPartModal(true);
  };
  const handlePartModalClose = () => {
    setOpenPartModal(false);
  };

  const partModalOpen = (e) => {
    setModalType("추가");
    handlePartModalOpen();
  }

  const onUpdateButtonClicked = (partObj) => {
    setModalType("파트수정");
    setPartObj(partObj);
    handlePartModalOpen();
  };

  const onRemoveButtonClicked = (seqId) => {
    setModalType("삭제");
    setSeqId(seqId);
    handlePartModalOpen();
  };

  // Toast Grid options value
  const columns = ([
    { name: "seq_id", header: "CodeNo", align: "center", hidden: true },
    { name: "part_name", header: "파트명", align: "center", sortable: true, filter: 'select' },
    { name: "update", header: "파트수정", align: "center",
      renderer: {
        type: UpdateButtonRenderer,
        options: {
          onUpdateButtonClicked
        }
      }, 
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

        

  //const [value, setValue] = useState('');

  const onClickSearch = (e) => {
    console.log(gridRef.current.getInstance());
    gridRef.current.getInstance().filter('name', {part_name:"Removale App"});
  }

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
                  defaultValue={auto1[0]}
                  getOptionLabel={(option) => option.part_name}
                  filterOptions={filterOptions}
                  style={{float: "left", width: "300px"}}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  //   console.log(newValue);
                  // }}
                  getOptionSelected={(option, value) => {
                    return option?.id === value?.id || option?.name.toLowerCase() === value?.name.toLowerCase();
                  }}
                  renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                />
                <Button
                  type="submit"
                  color="primary" 
                  round
                  style={{float: "left", width: "100px"}}
                  onClick={(e) => onClickSearch(e)}
                >검색
                </Button>
              </Grid>                     

              <ToastGrid 
                ref={gridRef}
                columns={columns}
                data={part.data}
                
                //hoc={highFuc}
              />

            </CardBody>
          </Card>
        </Grid>
      </Grid>

      <PartModalContainer           
        modalType={modalType}
        open={openPartAddModal}
        close={handlePartModalClose}
        seqId={seqId}
        partObj={partObj}
      />

    </>
  );
}

export default PartRegister;