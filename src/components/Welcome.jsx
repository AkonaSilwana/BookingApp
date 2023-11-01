import React, {useState} from 'react'
import { Link } from 'react-router-dom';


const Welcome = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const today = new Date().toISOString().split('T')[0];
    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
  return (
    <div id='welcomePage'>
        <h1>WELCOME TO OUR BOOKING SYSTEM</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi harum tempora adipisci veritatis hic, reprehenderit ullam ea necessitatibus earum quibusdam fugiat, minima rerum soluta inventore laboriosam tempore veniam, obcaecati vitae?</p>
        <div className='date-picker'>
            <input type="date" value={formatDate(selectedDate)} onChange={handleDateChange} /> <Link to={`/booking/${selectedDate}`} className='main-btn'>Start Booking</Link>
        </div>
    </div>
  )
}

export default Welcome;