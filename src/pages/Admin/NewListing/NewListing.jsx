import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../../services/listingsService";
import { uploadImg } from "../../../services/uploadService";
import Button from "../../../components/ui/Button";

const NewListing = () => {
  const [entryData, setEntryData] = useState("");
  const [images, setImages] = useState([]);
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
  const transmissionRef = useRef();
  const fuelTypeRef = useRef()

  const inputStyle = "mb-2 p-2 rounded-md border border-gray-300";

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
      alert("Record succesfully added");
      setLoading(false);
      navigate("/admin/listings");
    } catch (error) {
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
      transmission:transmissionRef.current.value,
      fuelType: fuelTypeRef.current.value
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
                className="absolute top-2 right-2 h-6 w-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-bg duration-150 flex items-center justify-center cursor-pointer"
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
              multiple
              onChange={handleImageInput}
              accept="image/*"
              ref={photosRef}
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
    </div>
  );
};

export default NewListing;
