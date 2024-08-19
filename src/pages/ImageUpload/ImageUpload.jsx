import { useState } from "react";
import Card from "../../components/ui/Card";
import { uploadImg } from "../../services/uploadService";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

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
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append(`images`, image.file);
    });

    try {
      const response = await uploadImg(formData);
      if (response.status === 200) {
        console.log(response.data);
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card>
        {/* <form className="grid gap-4" onSubmit={handleSubmit}> */}
          <div  >
            {images.map((image, index) => (
              <div
                key={index}
             
              >
                <img
                  src={image.preview}
                  alt={`Thumbnail ${index}`}
         
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.id)}
                 
                >
                  x
                </button>
              </div>
            ))}
            <div className="input-field" >
              <label
                htmlFor="file-input"
                
              >
                <span className="mt-2 text-sm text-gray-500">Add image</span>
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleImageInput}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <button className="bg-red-500 text-white" onClick={handleSubmit}>
            UploadImg
          </button>
      </Card>
    </div>
  );
};

export default ImageUpload;
