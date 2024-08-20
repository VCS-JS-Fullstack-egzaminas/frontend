import "./NewListing.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../../services/listingsService";
import { uploadImg } from "../../../services/uploadService";

const NewListing = () => {
  const [entryData, setEntryData] = useState("");
  const [images, setImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const availableRef = useRef();
  const maxDurationRef = useRef();
  const minDurationRef = useRef();
  const extrasRef = useRef();
  const photosRef = useRef();
  const yearRef = useRef();
  const sizeRef = useRef();

  const handleImageInput = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));
    setImages((prev) => [...prev, ...newImages]);
    console.log(newImages);
  };

  const handleImageDelete = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    setLoading(true);

    try {
      const imagesFormData = new FormData();
      images.forEach((image) => {
        imagesFormData.append("images", image.file);
      });

      const uploadedImagesResponse = await uploadImg(imagesFormData);

      console.log(uploadedImagesResponse);

      await createListing({
        ...entryData,
        photos: uploadedImagesResponse.data.urls,
      });
      console.log("bando ikelti", entryData);
      alert("Record succesfully added");
      setLoading(false);
      navigate("/admin/listings");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    console.log("returning");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let laikinasTitle = titleRef.current.value;
    let laikinasDescription = descriptionRef.current.value;
    let laikinasPrice = priceRef.current.value;
    let laikinasAvailable = availableRef.current.value;
    let laikinasMaxDur = maxDurationRef.current.value;
    let laikinasMinDur = minDurationRef.current.value;
    let laikinasExtras = extrasRef.current.value;
    let laikinasYear = yearRef.current.value;
    let laikinasSize = sizeRef.current.value;

    let size = laikinasSize;
    let year = laikinasYear;
    let title = laikinasTitle;
    let description = laikinasDescription;
    let price = laikinasPrice;
    let available = laikinasAvailable;
    let min_duration = laikinasMinDur;
    let max_duration = laikinasMaxDur;
    let extras = laikinasExtras;
    setEntryData({
      ...entryData,
      title,
      description,
      price,
      available,
      min_duration,
      max_duration,
      extras,
      photos,
      year,
      size,
    });
  };

  return (
    <div className="new-listing-container card">
      <h2 className="font-bold text-3xl mb-4">Add New Rental</h2>
      <form onSubmit={handleSubmit} className="new-listing-form gap-1">
        <input
          className="input-field"
          ref={titleRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          className="input-field"
          ref={yearRef}
          type="number"
          onChange={handleInputChange}
          placeholder="Year"
        />
        <select
          className="input-field"
          onChange={handleInputChange}
          ref={sizeRef}
        >
          <option value="Mini">Mini</option>
          <option value="Economic">Economic</option>
          <option value="Compact">Compact</option>
          <option value="Medium">Medium</option>
          <option value="Standard">Standard</option>
          <option value="SUV">SUV</option>
        </select>
        <textarea
          className="input-field"
          ref={descriptionRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          className="input-field"
          ref={priceRef}
          type="number"
          onChange={handleInputChange}
          placeholder="Price"
        />
        <select
          className="input-field"
          onChange={handleInputChange}
          ref={availableRef}
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        {/* <input  placeholder="Photo URLs" className="input-field" ref={photosRef} type="text" onChange={handleInputChange} /> */}
        <div>
          {/* <form className="grid gap-4" onSubmit={handleSubmit}> */}
          <div>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image.preview} alt={`Thumbnail ${index}`} />
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.id)}
                >
                  x
                </button>
              </div>
            ))}
            <div className="input-field">
              <label htmlFor="file-input">
                <span className="mt-2 text-sm text-gray-500">Add image</span>
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleImageInput}
                className="hidden"
                accept="image/*"
                ref={photosRef}
              />
            </div>
          </div>
        </div>
        <input
          placeholder="Min Rental Duration"
          className="input-field"
          ref={minDurationRef}
          type="number"
          onChange={handleInputChange}
        />
        <input
          placeholder="Max Rental Duration"
          className="input-field"
          ref={maxDurationRef}
          type="number"
          onChange={handleInputChange}
        />
        <input
          placeholder="Extras"
          className="input-field"
          ref={extrasRef}
          type="text"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary w-full disabled:bg-ecstasy-800"
          disabled={loading}
        >
          {loading ? "Adding listing..." : "Add listing"}
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default NewListing;
