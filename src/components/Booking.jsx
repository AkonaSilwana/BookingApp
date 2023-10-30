import React, {useState} from "react";
import { useParams } from 'react-router-dom';
let data = [
    {
      "date": "2016-05-18",
      "availability": [9, 10, 11, 12, 13, 14, 17]
    },
    {
      "date": "2016-05-19",
      "availability": [9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
      "date": "2016-05-20",
      "availability": [9, 10, 14, 15, 16, 17]
    },
    {
      "date": "2016-05-21",
      "availability": [9, 10, 11, 12, 13]
    },
    {
      "date": "2016-05-23",
      "availability": [13, 14, 15, 16]
    },
    {
      "date": "2016-05-24",
      "availability": [11, 12, 15, 16, 17]
    }
]

const Booking = () => {
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [sliderValue, setSliderValue] = useState(2);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleSliderChange = (event) => {
      const newValue = parseInt(event.target.value, 6);
      setSliderValue(newValue);
    };
    const { selectedDate } = useParams();
    const currentDate = new Date(selectedDate);

    const times = {
        days: [],
        timeSlots: []
    }

    for(let i = 0; i < 6; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        times.days.push(nextDate.toDateString());
    }
    const checkSlotAvailability = (timeSlot, jobLength, availability) => {
        const bufferHours = 1; 
        const slotStartTime = new Date(selectedDate + 'T' + timeSlot + ':00:00').getTime();
        const slotEndTime = slotStartTime + jobLength * 60 * 60 * 1000;

        for (const availableHour of availability) {
            const availableStartTime = new Date(selectedDate + 'T' + availableHour + ':00:00').getTime();
            const availableEndTime = availableStartTime + (jobLength + 2 * bufferHours) * 60 * 60 * 1000;

            if (slotStartTime >= availableStartTime && slotEndTime <= availableEndTime) {
                return 'available';
            }
        }

        return 'full';
    }
     const handleSlotClick = (date, slot) => {
    if (checkSlotAvailability(slot, sliderValue, date, data)) {
      if (!selectedSlots.includes(`${date}-${slot}`)) {
        setSelectedSlots([...selectedSlots, `${date}-${slot}`]);
        console.log(`Slot ${slot} on ${date} is available.`);
      } else {
        setSelectedSlots(selectedSlots.filter((selected) => selected !== `${date}-${slot}`));
        console.log(`Slot ${slot} on ${date} is unselected.`);
      }
    } else {
      console.log(`Slot ${slot} on ${date} is unavailable.`);
    }
  };
    
    const handleConfirmBooking = () => {
        setShowConfirmationPopup(true);
    };
    
    const handleConfirmSubmit = () => {
        const updatedData = data.map((item) => {
            return {
              ...item,
              availability: item.availability.filter((slot) => !selectedSlots.includes(`${item.date}-${slot}`)),
            };
          });
      
          data = updatedData;
          setSelectedSlots([]);
          setShowConfirmationPopup(false);
          setShowSuccessPopup(true);
    };

    const handleCancelBooking = () => {
        setShowConfirmationPopup(false);
        setSelectedSlots([]); 
      };
    
      const getAvailabilityForDate = (date) => {
        const dateData = data.find((item) => item.date === date);
        return dateData ? dateData.availability : [];
      };
      const isSlotFullyBooked = (date, slot) => {
        const dateData = data.find((item) => item.date === date);
        return dateData ? !dateData.availability.includes(slot) : false;
      };
    // const formatDate = (inputDate) => {
    //     const options = { weekday:'long', month:'long', day:'numeric'};
    //     const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    //     return formattedDate
    // }
    
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
            {[...Array(9).keys()].map((hour) => (
              <tr key={hour + 9}>
                <th>{hour + 9}:00 - {hour + 10}:00</th>
                {data.map((item) => {
                  const date = item.date;
                  const slot = hour + 9;
                  const isSelected = selectedSlots.includes(`${date}-${slot}`);
                  const isFullyBooked = isSlotFullyBooked(date, slot);

                  let cellClass = '';
                  if (isSelected) {
                    cellClass = 'selected';
                  } else if (isFullyBooked) {
                    cellClass = 'full';
                  } else if (getAvailabilityForDate(date).includes(slot)) {
                    cellClass = 'available';
                  } else {
                    cellClass = 'empty';
                  }

                  return (
                    <td
                      key={`${date}-${slot}`}
                      className={cellClass}
                      onClick={() => {
                        if (cellClass === 'available') {
                          handleSlotClick(date, slot);
                        }
                      }}
                      disabled
                    >
                      {isSelected ? 'Selected' : isFullyBooked ? 'Fully Booked' : (cellClass === 'available' ? 'Available' : '')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
            </div>
            {selectedSlots.length > 0 && (
                <button onClick={handleConfirmBooking} className="submit-selected shadow">Submit {selectedSlots.length} Selected Slots</button>
            )}
            {showConfirmationPopup && (
                <div className="popup-container">
                    <div className="popup confirmation shadow">
                        <h4>Are you sure you want to book these slots?</h4>
                        <p>You have selected the following slots:</p>
                        <ul>
                            {selectedSlots.map((slot) => (
                            <li key={slot}>{slot}</li>
                            ))}
                        </ul>
                        <div className="action-btns">
                            <button onClick={handleCancelBooking}>Cancel</button>
                            <button onClick={handleConfirmSubmit} className="main-btn">Yes, Book</button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div className="popup-container">
                    <div className="popup success-popup">
                        <h4>Successfully booked slots!</h4>
                        <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Booking;