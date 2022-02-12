import React, { useEffect, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { receptions } from 'modules/receptions';
import { items } from 'modules/items';
import { render } from "react-dom";

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
  const itemData = useSelector(({item}) => item.data);
  
 
  useEffect(() => {
    console.log("렌더링");
    dispatch(items.getItemMiddleware());
  }, [] );

 

  
  console.log(receptionData);

  

  
  // receptionData.map( (data,index) => {
  //   partList.push({ text: data.part_name, value: data.part_seq_id })
  //   itemList.push({ text: data.item_name, value: data.item_seq_id})
  //   //price = data.normal_price;
  //   console.log(data.normal_price);
  // });
  const partList = [ { text: "Select", value: ''}];
  const itemList = [];


  //const price = 0;
  for(let i=0; i<receptionData.length; i++) {
    
    partList.push({ text: receptionData[i].part_name, value: receptionData[i].part_seq_id })
    //let a = partList.concat({ text: receptionData[i].part_name, value: receptionData[i].part_seq_id })
    //console.log(a);
    //itemList.push({ text: receptionData[i].item_name, value: receptionData[i].item_seq_id})
    
  }



  const twoDepthData = {
    '01': [
      { text: 'Select', value: '' },
      { text: 'Balad/Dance/Pop', value: '01_01' },
      { text: 'Hiphop/R&B', value: '01_02' },
      { text: 'Indie', value: '01_03' }
    ],
    '02': [
      { text: 'Select', value: '' },
      { text: 'Pop', value: '02_01' },
      { text: 'Hiphop', value: '02_02' },
      { text: 'R&B', value: '02_03' }
    ],
    '03': [
      { text: 'Select', value: '' },
      { text: 'OST', value: '03_01' },
      { text: 'Classic', value: '03_02' },
      { text: 'New Age', value: '03_03' }
    ]
  };
















  const onUpdateButtonClicked = () => {
    
  };



  const columns = [
    {
      header: '파트명 (선택)',
      name: 'partName',
      editor: {
        type: 'select',
        options: {
          listItems: [...new Set(partList.map(JSON.stringify))].map(JSON.parse)
        }
      },
      
    },
    {
      header: '장치명 (선택)',
      name: 'itemName',
      editor: {
        type: 'select',
        options: {
          listItems: itemList
           

            //itemData.filter( (data) => data.part_seq_id === 10 )
        }
      },
    },
    {
      header: '단가',
      name: 'unitPrice'
    },
    {
      header: '수량 (입력)',
      name: 'amount',
      editor: 'text'
    },
    {
      header: '정상가',
      name: 'normalPrice'
    },
    {
      header: '할인금액 (입력)',
      name: 'discountPrice',
      editor: 'text'
    },
    {
      header: '최종금액',
      name: 'finalPrice'
    },
    {
      header: '할인율 ',
      name: 'discount',
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
     console.log(e);
     const gridArr = gridRef.current.getInstance().getData();
     console.log(gridArr);


    if(e.changes[0].columnName === "partName") {
      const arr = itemData.filter( (data) => data.part_seq_id === parseInt(gridArr[0].partName) );
    
      gridRef.current.getInstance().setColumnValues('itemName',"선택",false);
      for(let i=0; i<arr.length; i++) {
        
        itemList.push( { text: arr[i].item_name, value: arr[i].seq_id} )
        //gridRef.current.getInstance().setColumnValues('itemName',arr[i].item_name,false)
      }
      
    } else if(e.changes[0].columnName === "itemName") {
      
      const a = receptionData.filter( (data) => data.part_seq_id === 1 && data.item_seq_id === 4 );
      //console.log(a);
      gridRef.current.getInstance().setColumnValues('unitPrice',a[0].unit_price,false);
    
    } else if(e.changes[0].columnName === "amount") {

      gridRef.current.getInstance().setColumnValues('normalPrice', (gridArr[0].unitPrice * parseInt(gridArr[0].amount)) ,false);
    } else if(e.changes[0].columnName === "discountPrice") {
      
      gridRef.current.getInstance().setColumnValues('finalPrice', (gridArr[0].normalPrice - parseInt(gridArr[0].discountPrice)) ,false);
      gridRef.current.getInstance().setColumnValues('discount', (gridArr[0].discountPrice / gridArr[0].normalPrice * 100) + "%" ,false);
    } 

   

  };

  
  

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
    console.log(gridRef.current.props.data);
  };

  const aaa = () => {
    gridRef.current.getInstance().getData();
    //console.log(gridRef.current.getInstance().getData());

    const gridArr = gridRef.current.getInstance().getData();
    
    for(let i=0; i<gridArr.length; i++) {
      if(gridArr[i].partName == null || gridArr[i].partName == "") {
        return alert((i+1) + "번째 행 파트명을 입력하세요.");
      } else if(gridArr[i].itemName == null || gridArr[i].itemName == "") {
        return alert((i+1) + "번째 행 장치명을 입력하세요.");
      } else if(gridArr[i].price == null || gridArr[i].price == "") {
        return alert((i+1) + "번째 행 단가를 입력하세요.");
      } else if(gridArr[i].amount == null || gridArr[i].amount == "") {
        return alert((i+1) + "번째 행 수량을 입력하세요.");
      } else if(gridArr[i].discount == null || gridArr[i].discount == "") {
        return alert((i+1) + "번째 행 할인율(%)을 입력하세요.");
      }
      console.log("완료");

      
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






  return(
    <>
     <button onClick={handleAppendRow}>행추가</button>
     <button onClick={aaa}>저장</button>
      <Grid
        ref={gridRef}
        //data={gridData}
        columns={columns}
        rowHeight={20}
        bodyHeight={200}
        virtualScrolling={true}
        heightResizable={true}
        rowHeaders={['rowNum']}
        onAfterChange={onChange}
      />

     
    </>
  );
}

export default ToastGrid;