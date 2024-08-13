import React, { useState } from 'react';
import './NewListing.css';

const NewListing = ({ addListing }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(false);
  const [minduration, setMinDuration] = useState('');
  const [maxduration, setMaxDuration] = useState('');
  const [extras, setExtras] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const photosArray = photos.split(',').map(photo => photo.trim());
    addListing({
      id,
      title,
      description,
      photos: photosArray,
      price,
      availability,
      minduration,
      maxduration,
      extras,
      createdAt
    });
    setId('');
    setTitle('');
    setDescription('');
    setPhotos('');
    setPrice('');
    setAvailability(false);
    setMinDuration('');
    setMaxDuration('');
    setExtras('');
    setCreatedAt('');
  };

  return (
    <div className="new-listing-container">
      <h2>Add New Rental</h2>
      <form onSubmit={handleSubmit} className="new-listing-form">
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Photos (comma separated URLs)"
          value={photos}
          onChange={(e) => setPhotos(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Min Duration"
          value={minduration}
          onChange={(e) => setMinDuration(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Max Duration"
          value={maxduration}
          onChange={(e) => setMaxDuration(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Created At"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button">Add Listing</button>
      </form>
    </div>
  );
};

export default NewListing;