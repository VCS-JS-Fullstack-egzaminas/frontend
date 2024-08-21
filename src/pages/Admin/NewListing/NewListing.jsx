import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../../services/listingsService";
import { uploadImg } from "../../../services/uploadService";
import Button from "../../../components/ui/Button";

//TODO: create notification after creating a listing

const NewListing = () => {
  const [entryData, setEntryData] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
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
  const transmissionRef = useRef();
  const fuelTypeRef = useRef();

  const inputStyle = "mb-2 p-2 rounded-md border border-gray-300";

  const displayNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => navigate("/admin/listings"), 3000);
  };

  const handleImageInput = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));
    setImages((prev) => [...prev, ...newImages]);
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
        photos: uploadedImagesResponse.data.images,
      });
      console.log("bando ikelti", entryData);
      displayNotification("success", "Listing successfully created!");
      setLoading(false);
    } catch (error) {
      displayNotification("error", "Error creating listing!");
      console.log(error);
      setLoading(false);
    }

    console.log("returning");
  };

  const handleInputChange = () => {
    setEntryData({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      available: availableRef.current.value,
      min_duration: minDurationRef.current.value,
      max_duration: maxDurationRef.current.value,
      extras: extrasRef.current.value,
      year: yearRef.current.value,
      size: sizeRef.current.value,
      transmission: transmissionRef.current.value,
      fuelType: fuelTypeRef.current.value,
    });
  };

  return (
    <div className="p-4 border border-red-100 rounded-md max-w-md mx-auto mt-4">
      <h2 className="font-bold text-3xl mb-4">Add New Rental</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className={inputStyle}
          ref={titleRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          className={inputStyle}
          ref={yearRef}
          type="number"
          onChange={handleInputChange}
          placeholder="Year"
        />
        <label>Fuel type:</label>
        <select
          className={inputStyle}
          onChange={handleInputChange}
          ref={fuelTypeRef}
        >
          <option value="Diesel">Diesel</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Ethanol">Ethanol</option>
          <option value="Natural Gas">Natural gas</option>
          <option value="LPG">LPG</option>
        </select>
        <label>Size:</label>
        <select
          className={inputStyle}
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
        <label>Transmission:</label>
        <select
          className={inputStyle}
          onChange={handleInputChange}
          ref={transmissionRef}
        >
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <textarea
          className={inputStyle}
          ref={descriptionRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          className={inputStyle}
          ref={priceRef}
          type="number"
          onChange={handleInputChange}
          placeholder="Price"
        />
        <label>Available:</label>
        <select
          className={inputStyle}
          onChange={handleInputChange}
          ref={availableRef}
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <label>Photo:</label>
        <div>
          {images.map((image, index) => (
            <div key={index} className="mb-2 relative">
              <img
                src={image.preview}
                alt={`Thumbnail ${index}`}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div
                className="absolute top-4 left-4 h-6 w-6 pb-0.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-bg duration-150 flex items-center justify-center cursor-pointer border border-gray-300 text-2xl lh"
                onClick={() => handleImageDelete(image.id)}
              >
                ×
              </div>
            </div>
          ))}
          <div className={inputStyle}>
            <input
              id="file-input"
              name="file-input"
              type="file"
              onChange={handleImageInput}
              accept="image/*"
              ref={photosRef}
              className="text-zinc-400 text-xs max-w-48 file:rounded-full file:border-0 file:px-2 file:cursor-pointer file:bg-ecstasy-100 file:text-ecstasy-700 file:py-1 file:hover:bg-ecstasy-200"
            />
          </div>
        </div>
        <input
          placeholder="Min Rental Duration"
          className={inputStyle}
          ref={minDurationRef}
          type="number"
          onChange={handleInputChange}
          min={1}
        />
        <input
          placeholder="Max Rental Duration"
          className={inputStyle}
          ref={maxDurationRef}
          type="number"
          onChange={handleInputChange}
          min={1}
        />
        <input
          placeholder="Extras"
          className={inputStyle}
          ref={extrasRef}
          type="text"
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={loading}>
          Add Listing
        </Button>
      </form>
      {notification && (
        <div
          className={`mt-6 p-4 rounded ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default NewListing;
