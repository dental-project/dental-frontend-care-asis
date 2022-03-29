import React, { useState,useEffect } from "react";
// import moment from "moment";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import TextField from "@material-ui/core/TextField";

// export default class Main extends Component {
//   constructor(props, context) {
//     super(props, context);

//     state = {
//       rangePicker: {
//         startDate: moment(),
//         endDate: moment().add(7, "days")
//       },
//       isShowCalendar: false
//     };
//   }



//   render() {
//     const { rangePicker, isShowCalendar } = state;

//     const format = "DD/MMMM/YYYY";
//     console.log("rangePicker", rangePicker);

//     return (

//     );
//   }
// }
const dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    // hour = hour >= 10 ? hour : '0' + hour;
    // minute = minute >= 10 ? minute : '0' + minute;
    // second = second >= 10 ? second : '0' + second;

    // return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return date.getFullYear() + '-' + month + '-' + day;
}

function DateRangePicker({label}){
    const today = new Date();
    const [state, setState] = useState(
        [
            {
                startDate: today,
                endDate: today,
                key: 'selection'
            }
        ]
      );
    const [showCalendar,setShowCalendar] = useState(false);

    // const handleChange = (which, payload) => {
    //     setState({[which]: payload});
    // }

    const handleClickOpenCalendar = () => {
        setShowCalendar(true);
    };

    const handleClickCloseCalendar = () => {
        setShowCalendar(true);
    };

    console.log(state)
    
    return (
      <>
        {showCalendar && (
            // <DateRange
            //   format="YYYY-MM-DD"
            // //   startDate={rangePicker["startDate"]}
            // //   endDate={rangePicker["endDate"]}
            //   ranges={[state]}
            //   linkedCalendars={true}
            //   disableDaysBeforeToday={true}
            //   date={now => now}
            // //   onInit={handleChange.bind(this, "rangePicker")}
            // //   onChange={handleChange.bind(this, "rangePicker")}
            //   onChange={item => setState([item.selection])}
            //   theme={{
            //     DateRange: {
            //       background: "#ffffff"
            //     },
            //     Calendar: {
            //       background: "transparent",
            //       color: "#95a5a6",
            //       boxShadow: "0 0 1px #eee",
            //       width: "290px",
            //       padding: "0px"
            //     },
            //     MonthAndYear: {
            //       background: "#55B1E3",
            //       color: "#fff",
            //       padding: "20px 10px",
            //       height: "auto"
            //     },
            //     MonthButton: {
            //       background: "#fff"
            //     },
            //     MonthArrowPrev: {
            //       borderRightColor: "#55B1E3"
            //     },
            //     MonthArrowNext: {
            //       borderLeftColor: "#55B1E3"
            //     },
            //     Weekday: {
            //       background: "#3AA6DF",
            //       color: "#fff",
            //       padding: "10px",
            //       height: "auto",
            //       fontWeight: "normal"
            //     },
            //     Day: {
            //       // borderRadius: "100%",
            //       transition:
            //         "transform .1s ease, box-shadow .1s ease, background .1s ease"
            //     },
            //     DaySelected: {
            //       background: "#55B1E3"
            //     },
            //     DayActive: {
            //       background: "#55B1E3",
            //       boxShadow: "none"
            //     },
            //     DayInRange: {
            //       background: "#eee",
            //       color: "#55B1E3"
            //     },
            //     DayHover: {
            //       background: "#4f4f4f",
            //       color: "#fff"
            //     }
            //   }}
            // />
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                />
        )}
        <div>
          <TextField 
           type="date"
           label={label}
           variant="outlined"
        //    defaultValue={dateFormat(state[0]["startDate"])}
           onClick={handleClickOpenCalendar}
           InputLabelProps={{
             shrink: true,
           }}           
          />
          <TextField 
           type="date"
           label={label}
           variant="outlined"
        //    defaultValue={dateFormat(state[0]["endDate"])}
           onClick={handleClickOpenCalendar}
           InputLabelProps={{
             shrink: true,
           }}           
          />
        </div>
      </>

    );
}

export default DateRangePicker;

