import React, {useState} from "react";
import { useParams } from 'react-router-dom';

const Booking = () => {

    const [sliderValue, setSliderValue] = useState(1);
    const [isChecked, setIsChecked] = useState(false);

    const handleSliderChange = (event) => {
      const newValue = parseInt(event.target.value, 6);
      setSliderValue(newValue);
    };

    const handleInputChange = (e) => {
        setIsChecked(e.target.checked);
    };
    const { selectedDate } = useParams();
    const currentDate = new Date(selectedDate);

    const times = {
        days: [],
        timeSlots: []
    }

    for(let i = 9; i <= 16; i++) {
        times.timeSlots.push(`${i}:00-${i+1}:00`)
    }
    
    for(let i = 0; i < 6; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        times.days.push(nextDate.toDateString());
    }

    return(
        <div id="booking">
            <h1 className="title">Booking Calendar</h1>

            <div className="slider-container">
                <h4 className="sub-title">Step 1: Use the slider to estimate how long your session will be</h4>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="slider shadow-sm">
                            <label for="customRange2" class="form-label">{sliderValue} Hours</label>
                            <input type="range" class="form-range" min="1" max="5" id="customRange2" value={sliderValue} onChange={handleSliderChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <h4 className="sub-title">Step 2: Select slots you that work</h4>
                <table className="list-table table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            {times.days.map((day, index) => (
                                <th key={index}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {times.timeSlots.map((slot, index) => (
                            <tr key={index}>
                                <td className="time-slot">{slot}</td>
                                <td>
                                    <label htmlFor="pickedDay" className="full">Full</label>
                                    <input type="checkbox" name="pickedDay" id="pickedDay" className="full" />
                                </td>
                                <td>
                                    <label htmlFor="pickedDay2" className={isChecked ? 'checked' : ''} >Available</label>
                                    <input type="checkbox" name="pickedDay2" id="pickedDay2" checked={isChecked} onChange={handleInputChange}/>
                                </td>
                                <td>
                                    <label htmlFor="pickedDay">Available</label>
                                    <input type="checkbox" name="pick_time" id="pickedDay" />
                                </td>
                                <td>
                                    <label htmlFor="pickedDay">Available</label>
                                    <input type="checkbox" name="pick_time" id="pickedDay" />
                                </td>
                                <td>
                                    <label htmlFor="pickedDay">Available</label>
                                    <input type="checkbox" name="pick_time" id="pickedDay" />
                                </td>
                                <td>
                                    <label htmlFor="pickedDay">Available</label>
                                    <input type="checkbox" name="pick_time" id="pickedDay" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Booking;