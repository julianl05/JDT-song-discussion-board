import "./currentDate.css"
import { format } from 'date-fns'

function currentDate() {
    
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); 
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const year = currentDate.getFullYear();

    
    return (
      <h1 id="date">{format(currentDate,'MM/dd/yyyy')}</h1>
    )
}

export default Date
