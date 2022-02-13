import React, { useEffect, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { receptions } from 'modules/receptions';
import { render } from "react-dom";
import { createNoSubstitutionTemplateLiteral } from "typescript";

class RemoveButtonRenderer {
  element;

  constructor(props) {
    this.element = document.createElement("div");

    const { onRemoveButtonClicked } = props.columnInfo.renderer.options;
    const { rowKey } = props;
    const seq_id = props.grid.store.data.rawData[rowKey].seq_id;

    render(
      <Button variant="outlined" color="secondary" onClick={() => onRemoveButtonClicked(seq_id)}>삭제</Button>,
      this.element
    );
  }

  getElement() {
    return this.element;
  }
}

const ToastGrid = () => {

  const gridRef = React.createRef();
  
  const dispatch = useDispatch();
  const receptionData = useSelector(({ reception }) => reception.data);

  const [rowIndex, setRowIndex] = useState(0);
  console.log(rowIndex);

  useEffect(() => {
    console.log("렌더링");
  
  }, [] );

 

  
  console.log(receptionData);

  

  const partList = [];
 
  //const itemList = [];


  //const price = 0;
  for(let i=0; i<receptionData.length; i++) {
    
    partList.push({ text: receptionData[i].part_name, value: receptionData[i].part_name })
  
  }








  const onUpdateButtonClicked = () => {
    
  };

 
 
  const newArray = partList.filter(
    (arr, index, callback) => index === callback.findIndex(t => t.value === arr.value)
  )

  

  const deduplication = (name, val) => {
    typeof(Storage) !== 'undefined' && localStorage.setItem(name, JSON.stringify(val));
  }
  
  deduplication('name',newArray)

  console.log(newArray);


  var something = {};

  for(let i=0; i<newArray.length; i++) {
      something[newArray[i].value] = receptionData.filter( (data) => 
        data.part_name === partList[i].value 
      ).map( (data) => { return {text: data.item_name, value: data.item_name} } )
  }

  console.log(something);
  //console.log(something.fileter((data) => data.part_name === partList[key].value)

  

  // const twoDepthData = {
  //   'Removale App': [
  //     {text: "테스트 기공", value: "테스트 기공"},
  //     {text: "asdfsadfsdf", value: "asdfsadfsdf"}
  //   ],
  //   'Fixed App': [
  //     {text: "테스트 기공2", value: "테스트 기공2"},
  //     {text: "기공4", value: "기공4"}
  //   ]
  // }

  

  const columns = [
    {
      header: '파트명 (선택)',
      name: 'partName',
      editor: {
        type: 'select',
        options: {
          listItems: [
            ...new Set(partList.map(JSON.stringify))
          ].map(JSON.parse)
        }
      },
      validation: { required: true },
      relations: [
        {
          targetNames: ['itemName'],
          listItems({ value }) {
            return something[value];
          },
          disabled({ value }) {
            return !value;
          }
        }
      ]
    },
    {
      header: '장치명 (선택)',
      name: 'itemName',
      editor: {
        type: 'select',
        options: {
          listItems: []
        }
      },
      validation: { required: true }
    },
    {
      header: '단가',
      name: 'unitPrice',
      validation: { required: true }
    },
    {
      header: '수량 (입력)',
      name: 'amount',
      editor: 'text',
      validation: { required: true }
    },
    {
      header: '정상가',
      name: 'normalPrice',
      validation: { required: true }
    },
    {
      header: '할인금액 (입력)',
      name: 'discountPrice',
      editor: 'text',
      validation: { required: true }
    },
    {
      header: '최종금액',
      name: 'finalPrice',
      validation: { required: true }
    },
    {
      header: '할인율 ',
      name: 'discount',
      validation: { required: true }
    },
    {
      name: "update",
      header: "삭제",
      align: "center",
      renderer: {
        type: RemoveButtonRenderer,
        options: {
          onUpdateButtonClicked
        }
      }
    },
    
  ];
  
  const onChange = (e) => {
   
     const gridArr = gridRef.current.getInstance().getData();

     //const rowCount = gridRef.current.getInstance().getRowCount();
     //let i = rowCount-1;
     //console.log(rowIndex);

     let i = e.changes[0].rowKey;

    if(e.changes[0].columnName === "partName") {
      //reset();
      //let arr = receptionData.filter( (data) => data.part_name === gridArr[i].partName );
  
      //const list = arr.map( (data) =>{ return {text: data.item_name, value: data.item_name} } )
     
      
      //setItemList(aaa)
      //gridRef.current.getInstance().setValue(i,'itemName',aaa,false);

      // for(let j=0; j<arr.length; j++) {
      //   itemList.concat( { text: arr[j].item_name, value: arr[j].item_name}  )
      // }
      // setItemList(itemList);

      

    } else if(e.changes[0].columnName === "itemName") {
     
      resetColumn(i);

      let price = receptionData.filter( (data) => 
        data.part_name === gridArr[i].partName && data.item_name === gridArr[i].itemName 
      );
      gridRef.current.getInstance().setValue(i,'unitPrice',price[0].unit_price,false);
    
    } else if(e.changes[0].columnName === "amount") {
      
      gridRef.current.getInstance().setValue(i,'discountPrice',"",false);
      gridRef.current.getInstance().setValue(i,'finalPrice',"",false);
      gridRef.current.getInstance().setValue(i,'discount',"",false);

      gridRef.current.getInstance().setValue(i,'normalPrice', (gridArr[i].unitPrice * parseInt(gridArr[i].amount)) ,false);

    } else if(e.changes[0].columnName === "discountPrice") {
      
      if(parseInt(gridArr[i].discountPrice) > gridArr[i].normalPrice) return alert("할인금액이 정상가보다 금액이 큽니다.");

      gridRef.current.getInstance().setValue(i,'finalPrice', (gridArr[i].normalPrice - parseInt(gridArr[i].discountPrice)) ,false);
      gridRef.current.getInstance().setValue(i,'discount', (gridArr[i].discountPrice / gridArr[i].normalPrice * 100) + "%" ,false);
    }
    
  };

  

  const validationCheck = (value) => {

    var regNumber = /^[0-9]*$/;
    //var reg = /^\d+\.?\d*$/;

    // 숫자 체크
    if(regNumber.test(value) === false) return alert("숫자만 입력 가능합니다.");

    // 1~100 입력
    //if(value < 1 || value > 100) return alert("1 ~ 100 까지 입력 가능합니다.");

    //공백 : /^\s+|\s+$/g
    // 숫자 1~9 : ^[1-9]\d*$

  }


  const resetColumn = (i) => {
    gridRef.current.getInstance().setValue(i,'unitPrice',"",false);
    gridRef.current.getInstance().setValue(i,'amount',"",false);
    gridRef.current.getInstance().setValue(i,'normalPrice',"",false);

    gridRef.current.getInstance().setValue(i,'discountPrice',"",false);
    gridRef.current.getInstance().setValue(i,'finalPrice',"",false);
    gridRef.current.getInstance().setValue(i,'discount',"",false);
  }
  

  

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
  };

  const save = () => {
    //gridRef.current.getInstance().getData();
    //console.log(gridRef.current.getInstance().getData());

    //console.log(gridRef.current.getInstance().getElement());


    const gridArr = gridRef.current.getInstance().getData();
    
    for(let i=0; i<gridArr.length; i++) {
      if(gridArr[i].partName == null || gridArr[i].partName == "") {
        return alert((i+1) + "번째 행 파트명을 입력하세요.");
      } else if(gridArr[i].itemName == null || gridArr[i].itemName == "") {
        return alert((i+1) + "번째 행 장치명을 입력하세요.");
      } else if(gridArr[i].amount == null || gridArr[i].amount == "") {
        return alert((i+1) + "번째 행 수량을 입력하세요.");
      } else if(gridArr[i].discountPrice == null || gridArr[i].discountPrice == "") {
        return alert((i+1) + "번째 행 할인금액을 입력하세요.");
      }
   
      const contents = {
        price: 5000,
        item_seq_id: 9,
        vendor_seq_id: 3
      }
   
      console.log(gridArr);
      return;

      dispatch(receptions.addReceptionPriceMiddleware(contents));


    }
    
  }


  const onClick = (e) => {
    //setRowIndex(e.rowKey);
    //console.log(e);
  }
  


  return(
    <>
     <button onClick={handleAppendRow}>행추가</button>
     <button onClick={save}>저장</button>
      <Grid
        ref={gridRef}
        //data={gridData}
        columns={columns}
        rowHeight={20}
        bodyHeight={200}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}

        onClick={onClick}

        onAfterChange={onChange}
      />

     
    </>
  );
}

export default ToastGrid;