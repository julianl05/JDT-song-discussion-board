import "./currentDate.css"
import { format } from 'date-fns'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect } from "react";

function currentDate( {date} ) {
    
    const formattedDate = format(date, 'MM/dd/yyyy');

    const arrowStyles = {
      fontSize: 50,
      cursor: 'pointer',
      color: '#333333',
      '&:hover': {
          color: 'gray'  
      }
    }

    return (
      <div id="dateContainer">
        <ArrowLeftIcon
          sx={arrowStyles}
        />
        <h1 id="date">{formattedDate}</h1>
        <ArrowRightIcon
          sx={arrowStyles}
        />
      </div>
      
    )
}

export default currentDate
