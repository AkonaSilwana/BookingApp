import React, { useState } from "react";
import { useParams } from "react-router-dom";
import availabilityData from "./availabilityData.json";
let data = availabilityData;

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
    timeSlots: [],
  };

  for (let i = 0; i < 6; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    times.days.push(nextDate.toDateString());
  }
  const checkSlotAvailability = (timeSlot, jobLength, availability) => {
    const bufferHours = 1;
    const slotStartTime = new Date(
      selectedDate + "T" + timeSlot + ":00:00"
    ).getTime();
    const slotEndTime = slotStartTime + jobLength * 60 * 60 * 1000;

    for (const availableHour of availability) {
      const availableStartTime = new Date(
        selectedDate + "T" + availableHour + ":00:00"
      ).getTime();
      const availableEndTime =
        availableStartTime + (jobLength + 2 * bufferHours) * 60 * 60 * 1000;

      if (
        slotStartTime >= availableStartTime &&
        slotEndTime <= availableEndTime
      ) {
        return "available";
      }
    }

    return "full";
  };
  const handleSlotClick = (date, slot) => {
    if (checkSlotAvailability(slot, sliderValue, date, data)) {
      const selectedSlotIndex = selectedSlots.findIndex((selected) =>
        selected.startsWith(date)
      );
      const selectedSlot = `${date}-${slot}`;
      const updatedSelectedSlots = [...selectedSlots];

      if (selectedSlotIndex !== -1) {
        updatedSelectedSlots.splice(selectedSlotIndex, 1);
        console.log(`Slot ${slot} on ${date} is unselected.`);
      } else {
        updatedSelectedSlots.push(selectedSlot);
        console.log(`Slot ${slot} on ${date} is available.`);

        const sliderHours = sliderValue - 1;
        for (let i = 1; i <= sliderHours; i++) {
          const nextSlot = slot + i;
          if (nextSlot >= 9 && nextSlot <= 17) {
            const nextSlotStr = `${date}-${nextSlot}`;
            if (!updatedSelectedSlots.includes(nextSlotStr)) {
              updatedSelectedSlots.push(nextSlotStr);
              console.log(`Slot ${nextSlot} on ${date} is available.`);
            }
          }
        }
      }

      setSelectedSlots(updatedSelectedSlots);
    } else {
      //TODO: remove log as soon as there is a better way to handle this on UI
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
        availability: item.availability.filter(
          (slot) => !selectedSlots.includes(`${item.date}-${slot}`)
        ),
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

  return (
    <div id="booking">
      <h1 className="title">Booking Calendar</h1>

      <div className="slider-container">
        <h4 className="sub-title">
          {" "}
          Use the slider to estimate how long your session will be
        </h4>
        <div className="row">
          <div className="col-sm-4">
            <div className="slider shadow-sm">
              <label for="customRange2" class="form-label">
                {sliderValue} Hours
              </label>
              <input
                type="range"
                class="form-range"
                min="1"
                max="5"
                id="customRange2"
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/*Table can be replace with a library such material-table, tanstack-table*/}
      <div className="table-container">
        <h4 className="sub-title"> Select the slots you want to book</h4>
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
                <th>
                  {hour + 9}:00 - {hour + 10}:00
                </th>
                {data.map((item) => {
                  const date = item.date;
                  const slot = hour + 9;
                  const isSelected = selectedSlots.includes(`${date}-${slot}`);
                  const cellClass = isSelected
                    ? "selected"
                    : item.availability.includes(slot)
                    ? "available"
                    : "full";
                  return (
                    <td
                      key={`${date}-${slot}`}
                      className={cellClass}
                      onClick={() => {
                        if (cellClass === "available") {
                          handleSlotClick(date, slot);
                        }
                      }}
                      disabled
                    >
                      {isSelected
                        ? "Selected"
                        : item.availability.includes(slot)
                        ? "Available"
                        : "Full"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSlots.length > 0 && (
        <button
          onClick={handleConfirmBooking}
          className="submit-selected shadow"
        >
          Submit {selectedSlots.length} Selected Slots
        </button>
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
              <button onClick={handleConfirmSubmit} className="main-btn">
                Yes, Book
              </button>
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
  );
};

export default Booking;
