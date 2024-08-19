import { useState } from "react";
import Card from "../../components/ui/Card";
import {uploadImg} from "../../services/uploadService"


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
      console.log(formData)
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-32 rounded-sm overflow-hidden flex justify-center items-center border"
              >
                <img
                  src={image.preview}
                  alt={`Thumbnail ${index}`}
                  className="max-w-full max-h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.id)}
                  className="text-red-500 absolute right-1 top-1"
                >
                  x
                </button>
              </div>
            ))}
            <div className="p-2 flex items-center justify-center h-32 w-32 border rounded-sm border-dashed cursor-pointer hover:bg-gray-50">
              <label
                htmlFor="file-input"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
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
          <button className="bg-red-500 text-white" type="submit">
            submit
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ImageUpload;
