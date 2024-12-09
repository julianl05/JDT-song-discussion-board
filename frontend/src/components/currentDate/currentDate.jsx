import "./currentDate.css"
import { format } from 'date-fns'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function currentDate() {
    
    const currentDate = new Date();

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
        <h1 id="date">{format(currentDate,'MM/dd/yyyy')}</h1>
        <ArrowRightIcon
          sx={arrowStyles}
        />
      </div>
      
    )
}

export default currentDate
