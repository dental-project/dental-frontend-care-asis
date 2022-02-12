import React, { useEffect, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { receptions } from 'modules/receptions';
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

  

  useEffect(() => {
    console.log("렌더링");
  
  }, [] );

 

  
  console.log(receptionData);

  

  
  // receptionData.map( (data,index) => {
  //   partList.push({ text: data.part_name, value: data.part_seq_id })
  //   itemList.push({ text: data.item_name, value: data.item_seq_id})
  //   //price = data.normal_price;
  //   console.log(data.normal_price);
  // });
  const partList = [];
  //const itemList = [];


  //const price = 0;
  for(let i=0; i<receptionData.length; i++) {
    
    partList.push({ text: receptionData[i].part_name, value: receptionData[i].part_name })
    //let a = partList.concat({ text: receptionData[i].part_name, value: receptionData[i].part_seq_id })
    //console.log(a);
    //itemList.push({ text: receptionData[i].item_name, value: receptionData[i].item_seq_id})
    
  }




  const[itemList, setItemList] = useState([]);








  const onUpdateButtonClicked = () => {
    
  };



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
   
     const gridArr = gridRef.current.getInstance().getData();
     console.log(gridArr);

     const rowCount = gridRef.current.getInstance().getRowCount();
     let i = rowCount-1;
   
      if(e.changes[0].columnName === "partName") {

        let arr = receptionData.filter( (data) => data.part_name === gridArr[i].partName );
   
        for(let j=0; j<arr.length; j++) {
          itemList.push( { text: arr[j].item_name, value: arr[j].item_name} )
        }
        setItemList(itemList);

      } else if(e.changes[0].columnName === "itemName") {
        
        let price = receptionData.filter( (data) => 
          data.part_name === gridArr[i].partName && data.item_name === gridArr[i].itemName 
        );
        gridRef.current.getInstance().setValue(i,'unitPrice',price[0].unit_price,false);
      
      } else if(e.changes[0].columnName === "amount") {
  
        gridRef.current.getInstance().setValue(i,'normalPrice', (gridArr[i].unitPrice * parseInt(gridArr[i].amount)) ,false);
  
      } else if(e.changes[0].columnName === "discountPrice") {
        
        gridRef.current.getInstance().setValue(i,'finalPrice', (gridArr[i].normalPrice - parseInt(gridArr[i].discountPrice)) ,false);
        gridRef.current.getInstance().setValue(i,'discount', (gridArr[i].discountPrice / gridArr[i].normalPrice * 100) + "%" ,false);
      } 
   
  };

  
  

  

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({});
    setItemList([]);
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
      } 
      // else if(gridArr[i].price == null || gridArr[i].price == "") {
      //   return alert((i+1) + "번째 행 단가를 입력하세요.");
      // } 
      
      else if(gridArr[i].amount == null || gridArr[i].amount == "") {
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
        onAfterChange={onChange}
      />

     
    </>
  );
}

export default ToastGrid;