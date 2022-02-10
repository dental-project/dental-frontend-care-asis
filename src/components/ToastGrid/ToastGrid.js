import React, { useEffect } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { items } from 'modules/items'
import { receptions } from 'modules/receptions';
import { render } from "react-dom";

const ToastGrid = ({partData}) => {

  const gridRef = React.createRef();
  
  const dispatch = useDispatch();
  const selectItemData = useSelector(({ item }) => item.data);

  useEffect(() => {
    //dispatch(dentals.getDentalMiddleware());
    //dispatch(parts.getPartMiddleware());
    dispatch(items.getSelectItemMiddleware(8));
  }, [] );

  //console.log(selectItemData);

  const partList = [];
  partData.map( (data,index) => {
    partList.push({ text: data.part_name, value: data.seq_id })
  });





  

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

  const onUpdateButtonClicked = () => {
    
  };




  // const data = [
  //   {
  //     partName: 'Deluxe',
  //     itemName: 'EP',
  //     price: 'asd',
  //     amount: '1000',
  //     discount: '10'
  //   }
  // ]


  const columns = [
    {
      header: '파트명 (선택)',
      name: 'partName',
      editor: {
        type: 'select',
        options: {
          listItems: 
            partList
            

            // { text: 'Deluxe', value: '1' },
            // { text: 'EP', value: '2' },
            // { text: 'Single', value: '3' }
          
        }
      }
    },
    {
      header: '장치명 (선택)',
      name: 'itemName',
      formatter: 'listItemText',
      editor: {
        type: 'select',
        options: {
          listItems: [
            { text: 'Deluxe', value: '1' },
            { text: 'EP', value: '2' },
            { text: 'Single', value: '3' }
          ]
        }
      }
    },
    {
      header: '단가 (입력)',
      name: 'price',
      editor: 'text',
    },
    {
      header: '수량 (입력)',
      name: 'amount',
      editor: 'text'
    },
    {
      header: '할인율 (입력)',
      name: 'discount',
      editor: 'text'
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

    if(e.changes[0].columnName === "partName")




    if(e.changes[0].columnName === "partName") {



      console.log("파트명 선택");
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



      dispatch(receptions.addReceptionPriceMiddleware(contents));


    }
    
  }






  return(
    <>
     <button onClick={handleAppendRow}>행추가</button>
     <button onClick={aaa}>저장</button>
      <Grid
        ref={gridRef}
        //data={data}
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