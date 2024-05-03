import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import heroOne from "../../assets/img/heroOne.png";


function ImageCompressor() {

  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
    compressImage(file);
  };

  const compressImage = (file) => {
   new Compressor(file, {
      quality: 0.6,
      success(result) {
        const compressedImageURL = URL.createObjectURL(result);
        setCompressedImage(compressedImageURL);
        saveStateToLocalStorage({
          originalImage: URL.createObjectURL(file), // Use file directly here
          compressedImage: compressedImageURL,
        });
        navigate("/upload");
      },
      error(err) {
        console.error(err.message);
      },
    });
  };

  const saveStateToLocalStorage = (imageState) => {
    localStorage.setItem("imageState", JSON.stringify(imageState));
  };

  useEffect(() => {
    // Save state to local storage when state variables change
    saveStateToLocalStorage({
      originalImage,
      compressedImage,
    });
  }, [originalImage, compressedImage]);

  return (
    <div>
      <div className="md:px-28 md:p-16 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  items-center">
          <div className="col hidden md:block shadow-xl rounded-xl order-2 md:order-1">
            <div className="flex justify-center h-64 items-center ">
              <button
                onClick={handleButtonClick}
                className="bg-blue-600 px-4 py-2.5 text-white rounded-full"
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="col p-6 order-1 md:order-2">
            <img
              src={heroOne}
              alt=""
              className="flex justify-center shadow-lg bg-gray-100 rounded-lg"
            />

            <h1 className="md:text-7xl text-5xl text-center md:text-right text-gray-700 font-extrabold pt-8 pb-4">
              Compress your Images
            </h1>
            <p className="text-gray-500 text-center md:text-right text-lg pb-4">
              Fully automated and at no cost. 100%{" "}
              <mark className="px-4 py-1">free</mark>
            </p>
            <div className="flex md:hidden justify-center items-center ">
              <button
                onClick={handleButtonClick}
                className="bg-blue-600 px-6 py-2.5 text-lg text-white rounded-full"
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCompressor;
