import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  getListingById,
  updateListingById,
  deleteListingById,
} from "../../../services/listingsService";
import { uploadImg } from "../../../services/uploadService";


const ListingDetails = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getListingById(id);
        setEntry(response.data);
      } catch (error) {
        console.error("Error Fetching Entry", error);
      }
    };
    getEntries();
  }, [id, entry]); //isveda visa info

  const displayNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => navigate("/admin/listings"), 3000);
  }; 

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteListingById(id);
      displayNotification("success", "Listing successfully deleted!");
    } catch (error) {
      displayNotification("error", "Error deleting listing!");
      console.error(error);
    }
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



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const imagesFormData = new FormData();
      if (images.length >= 1 ) {
      images.forEach((image) => {
        imagesFormData.append("images", image.file)
      }) 
   
      const uploadedImagesResponse = await uploadImg(imagesFormData)
      await updateListingById(id, {...editData
        ,photos: uploadedImagesResponse.data.images,
      });}
      else {
        await updateListingById(id, {...editData
          ,photos: entry.photos,
        });}
      displayNotification("success", "Listing successfully updated!");
      setShowEdit(false);
    } catch (error) {
      displayNotification("error", "Error updating listing!");
      console.error(error);
    }

  };


  const handleInputChange = () => {
    const title = titleRef.current.value.trim() || entry.title;
    const description =
      descriptionRef.current.value.trim() || entry.description;
    const price = priceRef.current.value.trim() || entry.price;
    const available = availableRef.current.value || entry.available;
    const min_duration =
      minDurationRef.current.value.trim() || entry.min_duration;
    const max_duration =
      maxDurationRef.current.value.trim() || entry.max_duration;
    const extras = extrasRef.current.value.trim() || entry.extras;
    const year = yearRef.current.value.trim() || entry.year;
    const size = sizeRef.current.value.trim() || entry.size
   

    setEditData({
      title,
      description,
      price,
      available,
      min_duration,
      max_duration,
      extras,
      year,
      size
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Listing Details</h2>
        <div className="mb-6">
          <p>
            <strong>Title:</strong> {entry.title}
          </p>
          <p>
            <strong>Year:</strong> {entry.year}
          </p>
          <p>
            <strong>Size:</strong> {entry.size}
          </p>
          <p>
            <strong>Description:</strong> {entry.description}
          </p>
        
          <p>
            <strong>Photos:</strong> <img src={entry.photos}></img>
          </p>
          <p>
            <strong>Price:</strong> {entry.price} €
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {entry.available ? "Currently available" : "Unavailable"}
          </p>
          <p>
            <strong>Min Duration:</strong> {entry.min_duration} days
          </p>
          <p>
            <strong>Max Duration:</strong> {entry.max_duration} days
          </p>
          <p>
            <strong>Extras Included:</strong> {entry.extras}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(entry.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(entry.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => navigate("/admin/listings")}>
            Back to Listings
          </Button>
        </div>

        {showEdit && (
          <form className="space-y-4" onSubmit={handleUpdate}>
            <h3 className="text-lg font-semibold mb-4">Edit Information</h3>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                ref={titleRef}
                type="text"
                onChange={handleInputChange}
                placeholder={entry.title}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
            <label className="block mb-2">Year</label>
            <input
          className="input-field"
          ref={yearRef}
          type="number"
          onChange={handleInputChange}
          placeholder="Year"
        />
        </div>
        <div>
        <label className="block mb-2">Size</label>
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
        </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                ref={descriptionRef}
                onChange={handleInputChange}
                placeholder={entry.description}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Photos</label>
             
            </div>
            <div>
            <div className="mb-4">
            {images.map((image, index) => (
              <div key={index}>
                     <div
                className="relative  left-3 h-6 w-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-bg duration-150 flex items-center justify-center cursor-pointer"
                onClick={() => handleImageDelete(image.id)}
              >
                ×
              </div>
                <img src={image.preview} alt={`Thumbnail ${index}`} />
           
            </div>
            ))}
            <div className="input-field">
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
          </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                ref={priceRef}
                type="number"
                onChange={handleInputChange}
                placeholder={entry.price}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Availability</label>
              <select
                ref={availableRef}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Min Duration (days)</label>
              <input
                ref={minDurationRef}
                type="number"
                onChange={handleInputChange}
                placeholder={entry.min_duration}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Max Duration (days)</label>
              <input
                ref={maxDurationRef}
                type="number"
                onChange={handleInputChange}
                placeholder={entry.max_duration}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Extras</label>
              <input
                ref={extrasRef}
                type="text"
                onChange={handleInputChange}
                placeholder={entry.extras}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" color={"create"}>
                Save
              </Button>
              <Button color="danger" onClick={() => setShowEdit(false)}>
                Close
              </Button>
            </div>
          </form>
        )}

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
    </div>
  );
};

export default ListingDetails;
