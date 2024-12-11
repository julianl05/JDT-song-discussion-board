import "./currentDate.css"
import { format } from 'date-fns'

function currentDate( {date} ) {
    
    const formattedDate = format(date, 'MM/dd/yyyy');


    return (
      <div id="dateContainer">
        <h1 id="date">{formattedDate}</h1>
      </div>
      
    )
}

export default currentDate
