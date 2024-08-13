import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NewListing from './components/NewListing';

const App = () => {
  const [listings, setListings] = useState([]);

  const addListing = (listing) => {
    setListings([...listings, listing]);
  };

  return (
    <div>
      <Navbar />
        <NewListing addListing={addListing} />
        <div>
          <ul>
            {listings.map((listing, index) => (
              <li key={index}>
                <h3>{listing.title}</h3>
                <p>ID: {listing.id}</p>
                <p>{listing.description}</p>
                <p>Photos: {listing.photos.join(', ')}</p>
                <p>Price: ${listing.price}</p>
                <p>Availability: {listing.availability ? 'Yes' : 'No'}</p>
                <p>Min Duration: {listing.minduration} days</p>
                <p>Max Duration: {listing.maxduration} days</p>
                <p>Extras: {listing.extras}</p>
                <p>Created At: {listing.createdAt}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default App;