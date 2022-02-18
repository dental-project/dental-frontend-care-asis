import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 

// @material-ui/core
import { makeStyles } from "@material-ui/core";

// core components
// import Grid from '@material-ui/core/Grid';
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import Button from "components/CustomButtons/Button.js";



// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";









// Toast Grid
import BasicGrid from "components/ToastGrid/BasicGrid.js";

// Material
import TextField from "@material-ui/core/TextField";

import ReceptionModalContainer from "containers/ReceptionModalContainer";
//import PrintModal from "components/Modal/PrintModal.js"

import PrintModalContainer from "containers/PrintModalContainer";

import DetailButtonRenderer from "components/ToastGridRenderer/DetailRenderer.js";
import UpdateButtonRenderer from "components/ToastGridRenderer/UpdateRenderer.js";
import RemoveButtonRenderer from "components/ToastGridRenderer/RemoveRenderer.js";

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { receptions } from 'modules/receptions';
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
  },

  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

export default function ReceptionRegister() {

  const classes = useStyles();
  let history = useHistory();


  const dispatch = useDispatch();
  const reception = useSelector(({reception}) => reception);
  
  useEffect(() => {
    dispatch(receptions.getReceptionMiddleware());
    //setOpenItemModal(item.modal);
    console.log(reception.data);
  }, [] );

  const [seqId, setSeqId] = useState();
  const [receptionObj, setReceptionObj] = useState({});

  // 추가 모달
  const [openReceptionAddModal, setOpenReceptionAddModal] = React.useState(false);
  const [modalType, setModalType] = useState("");
  
  const handleReceptionModalOpen = () => {
    setOpenReceptionAddModal(true);
  };
  const handleReceptionModalClose = () => {
    setOpenReceptionAddModal(false);
  };
 




  // 출력 모달
  const [openPrint, setOpenPrint] = React.useState(false);
  const handleClickOpenPrint = () => {
    setOpenPrint(true);
  };
  const handleClosePrint = () => {
    setOpenPrint(false);
  };



  const onDetailButtonClicked = () => {
    history.push("/dental/receptionDetail");
  };

  const receptionModalOpen = (e) => {
    setModalType("추가");
    handleReceptionModalOpen();
  }

  const onUpdateButtonClicked = (receptionObj) => {
    setModalType("접수수정");
    setReceptionObj(receptionObj);
    handleReceptionModalOpen();
  };

  const onRemoveButtonClicked = (seqId) => {
    setModalType("삭제");
    setSeqId(seqId);
    handleReceptionModalOpen();
  };

  const columns = [
    { name: "seq_id", header: "codeNo", align: "center", hidden: true },
    { name: "receipt_date", header: "접수일자", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: { type: 'date', options: { format: 'yyyy.MM.dd' }} },
    { name: "completion_date", header: "완성일자", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: { type: 'date', options: { format: 'yyyy.MM.dd' }}},
    { name: "delivery_date", header: "배달일자", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: { type: 'date', options: { format: 'yyyy.MM.dd' }} },
    { name: "vendor_name", header: "거래처", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "chart_number", header: "차트번호", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "upper", header: "Upper", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "lower", header: "Lower", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "bite", header: "Bite", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "appliance", header: "장치", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "patient_name", header: "환자명", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    { name: "description", header: "비고", align: "center", whiteSpace: 'normal', resizable: true, sortable: true, filter: 'select' },
    {
      name: "detail",
      header: "상세보기",
      align: "center",
      renderer: {
        type: DetailButtonRenderer,
        options: {
          onDetailButtonClicked
        }
      }
    },
    {
      name: "update",
      header: "접수수정",
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
  ];


  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });


  const auto1 = [ { title: "전체" }, { title: "리더스탑치과" }, { title: "이바른치과" }, { title: "연세두리치과" }, { title: "서울스위트치과" }, { title: "연세바로치과" }, { title: "서울시카고" }];
  const auto2 = [ { title: "전체" }, { title: "최진실" }, { title: "전윤화" }, { title: "정보경" }, { title: "이유림" }, { title: "조유나" }]


    // const config = {
    //   withCredentials: true,
    // }   
    
    // axios
    //   .get("/api/sell/master/",config)
    //   .then((result) => {
    //       console.log(result);
    //       setDentalData(result.data);
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    // });
 
   

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    
    
    </>










    // <>
    //   <Grid container>
    //     <Grid item xs={12} className={classes.grid}>
    //       <Card>
    //         <CardHeader>
    //           <Button
    //             type="submit"
    //             className={classes.button} 
    //             color="info" 
    //             round
    //             onClick={(e) => receptionModalOpen(e)}
    //           >추가
    //           </Button>
    //         </CardHeader>
    //         <CardBody>

    //           <form className={classes.container} noValidate>
    //             <Grid item xs={4} className={classes.grid} style={{float: "left"}}>
    //               <TextField
    //                 id="date"
    //                 label="접수일자"
    //                 type="date"
    //                 defaultValue="2022-01-11"
    //                 className={classes.textField}
    //                 style={{width: "45%"}}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
                
    //               <TextField
    //                 id="date"
    //                 label="완성일자"
    //                 type="date"
    //                 defaultValue="2022-01-12"
    //                 className={classes.textField}
    //                 style={{width: "45%"}}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
               
    //             </Grid>

    //             <Grid item xs={6} className={classes.grid} style={{float: "left"}}>
    //               <Autocomplete
    //                 className={classes.grid}
    //                 options={auto1}
    //                 getOptionLabel={(option) => option.title}
    //                 filterOptions={filterOptions}
    //                 style={{float: "left", width: "200px", marginLeft: "20px"}}           
    //                 renderInput={(params) => <TextField {...params} label="거래처명" variant="outlined" />}
    //               />

    //               <Autocomplete
    //                 className={classes.grid}
    //                 options={auto2}
    //                 getOptionLabel={(option) => option.title}
    //                 filterOptions={filterOptions}
    //                 style={{float: "left", width: "200px"}}
    //                 renderInput={(params) => <TextField {...params} label="환자명" variant="outlined" />}
    //               />

    //               <Button
    //                 type="submit"
    //                 color="primary" 
    //                 round
    //                 style={{float: "left", width: "100px"}}
    //               >검색
    //               </Button>
    //             </Grid>   
                
    //             <Grid item xs={2} className={classes.grid} style={{float: "right"}}>
    //               <Button
    //                 color="danger" 
    //                 round
    //                 style={{width: "100%"}}
    //                 onClick={(e) => handleClickOpenPrint(e)}
    //               >출력
    //               </Button>
    //             </Grid>
    //           </form>
           
    //           <BasicGrid 
    //             type={"reception"}
    //             columns={columns}
    //             data={reception.data}
    //           />
    //         </CardBody>
    //       </Card>
    //     </Grid>
    //   </Grid>

    //   <ReceptionModalContainer      
    //     modalType={modalType}
    //     open={openReceptionAddModal}
    //     close={handleReceptionModalClose}
    //     seqId={seqId}
    //     receptionObj={receptionObj}
    //   />

    //   <PrintModalContainer
    //     open={openPrint}
    //     close={handleClosePrint}
    //   />

    // </>
  );
}
