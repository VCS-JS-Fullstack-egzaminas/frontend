import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../../data/mockdata.json';
import './ReservationPage.css'

const ReservationPage = () => {
    const { id } = useParams();
  const car = cars.find((car) => car.id === parseInt(id));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  if (!car) {
    return <div>Car not found</div>;
  }
  
  const calculateTotalCost = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const cost = daysDiff * car.price;
    setTotalCost(cost);
  };

    return (
     <div>
      <div className="car-detail-container">
        <img src={car.imgSrc} alt={car.name} className="car-detail-img" />
        <div className="car-detail-info">
          <h2><strong>{car.title}</strong></h2>
          <p><strong>Size:</strong> {car.size}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> {car.price} <strong>€</strong></p>
          <p><strong>info:</strong> {car.info}</p>
        </div>
      </div>
      <div className="reservationForm">
      <h2 className='text-center text-xl font-semibold'>Choose the duration of your rental:</h2>
     <label className='font-medium'>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label >
        <label className='font-medium'>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={calculateTotalCost}>Calculate Cost</button>
        {totalCost > 0 && (
          <p id="costId"><strong>Total Cost:</strong> {totalCost}<strong> € </strong></p>
        )}
      </div>
    </div>
    );
  };
export default ReservationPage
