import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

// Material
import TextField from "@material-ui/core/TextField";

// Form 양식
import { useForm, Controller } from "react-hook-form";

import ItemModalContainer from "containers/ItemModalContainer";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import { items } from 'modules/items';
import { useDispatch, useSelector } from 'react-redux';

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

export default function ItemRegister() {

    const classes = useStyles();
 
    const dispatch = useDispatch();
    const item = useSelector(({item}) => item);
    
    useEffect(() => {
      dispatch(items.getItemMiddleware());
      setOpenItemModal(item.modal);
    }, [item.data.length] );
    
    const [seqId, setSeqId] = useState();
    const [itemObj, setItemObj] = useState({});


    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option.title,
    });

    
    // 모달
    const [openItemAddModal, setOpenItemModal] = useState(false);
    const [modalType, setModalType] = useState("");
    
    const handleItemModalOpen = () => {
      setOpenItemModal(true);
    };
    const handleItemModalClose = () => {
      setOpenItemModal(false);
    };

    const itemModalOpen = (e) => {
      setModalType("추가");
      handleItemModalOpen();
    }

    const onUpdateButtonClicked = (itemObj) => {
      setModalType("수정");
      setItemObj(itemObj);
      handleItemModalOpen();
    };
  
    const onRemoveButtonClicked = (seqId) => {
      setModalType("삭제");
      setSeqId(seqId);
      handleItemModalOpen();
    };

    const columns = ([
        { name: "part_name", header: "파트명", align: "center", sortable: true, filter: 'select' },
        { name: "item_name", header: "장치명", align: "center", sortable: true, filter: 'select' },
        {
          name: "update",
          header: "장치수정",
          align: "center",
          renderer: {
            type: UpdateButtonRenderer,
            options: {
              onUpdateButtonClicked
            }
          }
        },
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
    ]);

    const auto1 = [ {title: "전체"}, {title: "Diagnostic Study Models"}, {title: "Removale App"}, {title: "Fixed App"},{title: "Functional App"}];
    const auto2 = [ {title: "전체"}, {title: "asdasdasd"}, {title: "테스트 기공"}, {title: "테스트 기공2"},{title: "테스트 기공3"}];

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
                    onClick={(e) => itemModalOpen(e)}
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
                      style={{float: "left", width: "300px", marginLeft: "20px"}}
                      renderInput={(params) => <TextField {...params} label="파트명" variant="outlined" />}
                    />
                    <Autocomplete
                      id="filter-demo"
                      className={classes.grid}
                      options={auto2}
                      getOptionLabel={(option) => option.title}
                      filterOptions={filterOptions}
                      style={{float: "left", width: "300px"}}
                      renderInput={(params) => <TextField {...params} label="장치명" variant="outlined" />}
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
                    type={"item"}
                    columns={columns}
                    data={item.data}
                  />
                </CardBody>
              </Card>
            </Grid>
          </Grid>
  
          <ItemModalContainer    
            modalType={modalType}
            open={openItemAddModal}
            close={handleItemModalClose}
            seqId={seqId}
            itemObj={itemObj}
          />
      </>
    );
}