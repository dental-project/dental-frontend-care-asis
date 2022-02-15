import React, { useEffect, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { receptions } from 'modules/receptions';

import RowRemoveRenderer from "components/ToastGridRenderer/RowRemoveRenderer.js";

const ToastGrid = () => {

  const gridRef = React.createRef();
  
  const dispatch = useDispatch();
  const receptionData = useSelector(({ reception }) => reception.data);

  useEffect(() => {
    console.log("렌더링");
  
  }, [] );

 
  const newArray = receptionData.filter(
    (arr, index, callback) => index === callback.findIndex(t => t.part_name === arr.part_name)
  ).map( (data) => { return { text: data.part_name, value: data.part_name }} )

  const deduplication = (name, val) => {
    typeof(Storage) !== 'undefined' && localStorage.setItem(name, JSON.stringify(val));
  }
  
  deduplication('name',newArray)

  var something = {};

  for(let i=0; i<newArray.length; i++) {
    something[newArray[i].value] = receptionData.filter( (data) => 
      data.part_name === newArray[i].value 
    ).map( (data) => { return {text: data.item_name, value: data.item_name} } )
  }

  const onRemoveButtonClicked = (rowKey) => {
    gridRef.current.getInstance().removeRow({rowKey});
    console.log(rowKey);

    //gridRef.current.getInstance().appendRow({});

    //console.log(gridRef.current.getInstance());
  };


  const columns = [
    {
      header: '파트명 (선택)',
      name: 'partName',
      editor: {
        type: 'select',
        options: {
          listItems: newArray
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
        type: RowRemoveRenderer,
        options: {
          onRemoveButtonClicked
        }
      }
    },
    
  ];
  
  const onChange = (e) => {
   
    const gridArr = gridRef.current.getInstance().getData();

    let rowId = e.changes[0].rowKey;
    var regNumber = /^[0-9]*$/;

    if(e.changes[0].columnName === "partName") {
    
      resetColumn(rowId,"select");

    } else if(e.changes[0].columnName === "itemName") {
     
      let price = receptionData.filter( (data) => 
        data.part_name === gridArr[rowId].partName && data.item_name === gridArr[rowId].itemName 
      );

      resetColumn(rowId,"select");
      setColumnValue(rowId, "unitPrice", price[0].unit_price);

    } else if(e.changes[0].columnName === "amount") {
      
      if(regNumber.test(gridArr[rowId].amount) === false) return alert("정수만 입력 가능합니다.");

      resetColumn(rowId);
      setColumnValue(rowId, "normalPrice", (gridArr[rowId].unitPrice * parseInt(gridArr[rowId].amount)));
    
    } else if(e.changes[0].columnName === "discountPrice") {

      if(regNumber.test(gridArr[rowId].discountPrice) === false) {
        resetColumn(rowId);
        return alert("정수만 입력 가능합니다.");
      }
      if(parseInt(gridArr[rowId].discountPrice) > gridArr[rowId].normalPrice) {
        resetColumn(rowId);
        return alert("할인금액이 정상가보다 금액이 큽니다.");
      }
      setColumnValue(rowId, "finalPrice", (gridArr[rowId].normalPrice - parseInt(gridArr[rowId].discountPrice)));
      setColumnValue(rowId, "discount", (gridArr[rowId].discountPrice / gridArr[rowId].normalPrice * 100).toFixed(2) + "%");
     
    }
    
  };

  const setColumnValue = (rowId, columnName, value) => {
    gridRef.current.getInstance().setValue(rowId, columnName, value, false);
  }

  const resetColumn = (rowId, type) => {

    if(type === "select") {
      gridRef.current.getInstance().setValue(rowId,'unitPrice',"",false);
      gridRef.current.getInstance().setValue(rowId,'amount',"",false);
      gridRef.current.getInstance().setValue(rowId,'normalPrice',"",false);      
    } 

    gridRef.current.getInstance().setValue(rowId,'discountPrice',"",false);
    gridRef.current.getInstance().setValue(rowId,'finalPrice',"",false);
    gridRef.current.getInstance().setValue(rowId,'discount',"",false);

  }
  


  
  

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
  };

  const save = () => {
    
    const gridArr = gridRef.current.getInstance().getData();

    for(let i=0; i<gridArr.length; i++) {
      if(gridArr[i].partName == null || gridArr[i].partName == "") {
        return alert((i+1) + "번째 행 파트명을 선택하세요.");
      } else if(gridArr[i].itemName == null || gridArr[i].itemName == "") {
        return alert((i+1) + "번째 행 장치명을 선택하세요.");
      } else if(gridArr[i].amount == null || gridArr[i].amount == "") {
        return alert((i+1) + "번째 행 수량을 입력하세요.");
      } else if(gridArr[i].discountPrice == null || gridArr[i].discountPrice == "") {
        return alert((i+1) + "번째 행 할인금액을 입력하세요.");
      }
    }


    // const testArra = receptionData.map((data, index) => 
    //   data.item_name
    // )


    //const testArr = gridArr.filter((element) => )

    
    //console.log(testArr);


    // for(let i=0; i<gridArr.length; i++) {
    //   const a = receptionData.filter((data) => {
    //     data.item_name === gridArr[i].itemName
    //   }
        
    //   )
    //   console.log(a)
    // }


    // const map = gridArr.map((element) => 
    //   element.itemName
    // )
    const contents = [];
    for(let i=0; i<gridArr.length; i++) {
  
      let a = receptionData.filter((data) => 
        data.item_name === gridArr[i].itemName
      )
      console.log(a);
      contents.push({
        sell_master_id: 1,
        item_seq_id: a[0].item_seq_id,
        sell_count: parseInt(gridArr[i].amount),
        normar_price: gridArr[i].normalPrice,
        real_sell_price: parseInt(gridArr[i].discountPrice),
        discount: parseFloat(gridArr[i].discount),
      })
      
    }
    
    // const contents = gridArr.map((data, index) =>  
    //   ({
    //     sell_master_id: 1,
    //     item_seq_id: a[index].item_seq_id,
    //     sell_count: parseInt(data.amount),
    //     normar_price: data.normalPrice,
    //     real_sell_price: parseInt(data.discountPrice),
    //     discount: parseFloat(data.discount),
    //   })
    // );

    console.log(contents);
   
    dispatch(receptions.addReceptionPriceMiddleware(contents));

    
  }

  return(
    <div>
     <button onClick={handleAppendRow}>행추가</button>
     <button onClick={save}>저장</button>
      <Grid
        ref={gridRef}
        columns={columns}
        rowHeight={20}
        bodyHeight={200}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}
        onAfterChange={onChange}
      />

</div>
  );
}

export default ToastGrid;