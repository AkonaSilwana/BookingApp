import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Welcome = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [result, setResult] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const checkDate = () => {
        const currentDate = new Date();
        const inputDate = new Date(selectedDate);

        if (inputDate >= currentDate) {
        setResult('It is the current day or a future date.');
        } else {
        setResult('It is not the current day or a future date.');
        }
    };

    const today = new Date().toISOString().split('T')[0];
    
  return (
    <div id='welcomePage'>
        <h1>WELCOME TO OUR BOOKING SYSTEM</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi harum tempora adipisci veritatis hic, reprehenderit ullam ea necessitatibus earum quibusdam fugiat, minima rerum soluta inventore laboriosam tempore veniam, obcaecati vitae?</p>
        <div className='date-picker'>
            <input type="date" value={selectedDate}   pattern="\d{4}-\d{2}-\d{2}" onChange={handleDateChange} min={today}/> <Link to="/booking" className='main-btn'>Start Booking</Link>
        </div>
    </div>
  )
}

export default Welcome;