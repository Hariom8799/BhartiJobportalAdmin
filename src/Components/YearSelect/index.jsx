// import React from 'react'
// import YearPicker from "react-year-picker";

// const YearSelect = (props) => {

//     const handleChange=(date)=>{
//         props.onChange(date);
//     }

//     return (
//         <YearPicker onChange={handleChange} />
//     )
// }

// export default YearSelect

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearSelect = (props) => {
  const handleChange = (date) => {
    props.onChange(date);
  };

  return (
    <DatePicker
      selected={props.value || new Date()}
      onChange={handleChange}
      showYearPicker
      dateFormat="yyyy"
      className="w-full p-2 border rounded"
    />
  );
};

export default YearSelect;
