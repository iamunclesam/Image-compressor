import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import heroOne from "../../assets/img/heroOne.png";

function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [compressedDimensions, setCompressedDimensions] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
    getOriginalImageInfo(file);
    compressImage(file);
  };

  const compressImage = (file) => {
    new Compressor(file, {
      quality: 0.1,
      success(result) {
        const compressedImageURL = URL.createObjectURL(result);
        setCompressedImage(compressedImageURL);
        getCompressedImageInfo(result);
        setTimeout(() => {
          navigate("/upload");
        }, 2000);
      },
      error(err) {
        console.error(err.message);
      },
    });
  };

  const getOriginalImageInfo = (file) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
      setOriginalDimensions({
        width: this.width,
        height: this.height,
      });
      setOriginalSize(file.size);
    };
  };

  const getCompressedImageInfo = (file) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
      setCompressedDimensions({
        width: this.width,
        height: this.height,
      });
      setCompressedSize(file.size);
    };
  };

  useEffect(() => {
    // Save state to local storage when state variables change
    localStorage.setItem(
      "imageState",
      JSON.stringify({
        originalImage,
        compressedImage,
        originalDimensions,
        compressedDimensions,
        originalSize,
        compressedSize,
      })
    );
  }, [
    originalImage,
    compressedImage,
    originalDimensions,
    compressedDimensions,
    originalSize,
    compressedSize,
  ]);

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
