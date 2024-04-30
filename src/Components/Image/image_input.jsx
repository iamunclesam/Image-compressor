import { useState, useRef } from "react";
import Compressor from "compressorjs";
import heroOne from "../../assets/img/heroOne.png";

function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [compressedDimensions, setCompressedDimensions] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
    getOriginalImageInfo(file);
    compressImage(file);
  };

  const getOriginalImageInfo = (file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        setOriginalDimensions({
          width: this.width,
          height: this.height,
        });
      };
    };
    reader.readAsDataURL(file);
    setOriginalSize(file.size);
  };

  const compressImage = (file) => {
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const compressedImageURL = URL.createObjectURL(result);
        setCompressedImage(compressedImageURL);
        getCompressedImageInfo(result);
      },
      error(err) {
        console.error(err.message);
      },
    });
  };

  const getCompressedImageInfo = (file) => {
    setCompressedSize(file.size);
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
      setCompressedDimensions({
        width: this.width,
        height: this.height,
      });
    };
  };

  return (
    <div>
      {/* <h1>Image Compressor</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div>
        {originalImage && (
          <div>
            <h2>Original Image</h2>
            <img src={originalImage} alt="Original" />
          </div>
        )}
        {compressedImage && (
          <div>
            <h2>Compressed Image</h2>
            <img src={compressedImage} alt="Compressed" />
          </div>
        )}
      </div> */}

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
            <img src={heroOne} alt="" className="flex justify-center shadow-lg bg-gray-100 rounded-lg" />

            <h1 className="md:text-7xl text-5xl text-center md:text-right text-gray-700 font-extrabold pt-8 pb-4">
              Compress your Images
            </h1>
            <p className="text-gray-500 text-center md:text-right text-lg pb-4">
              Fully automated and at no cost. 100% <mark className="px-4 py-1">free</mark>
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

        <div className="grid grid-cols-2 items-center mx-auto md:mt-16">
          {originalImage && (
            <div className="text-center">
              <h2 className="text-3xl text-gray-700 font-bold">
                Original Image
              </h2>
              <img
                src={originalImage}
                alt="Original"
                className="w-64 my-2 shadow-lg rounded-xl mx-auto"
              />
              {originalDimensions && (
                <div>
                  <p>
                    Dimensions: {originalDimensions.width} x{" "}
                    {originalDimensions.height}
                  </p>
                  <p>Size: {Math.round(originalSize / 1024)} KB</p>
                </div>
              )}
              <button className="bg-blue-600 text-sm px-4 py-2 my-2 text-white rounded-full">
                Download
              </button>
            </div>
          )}
          {compressedImage && (
            <div className=" text-center">
              <h2 className="text-3xl text-gray-700 font-bold">
                Compressed Image
              </h2>
              <img
                src={compressedImage}
                alt="Compressed"
                className="w-64 my-2 shadow-lg rounded-xl mx-auto"
              />
              {compressedDimensions && (
                <div>
                  <p>
                    Dimensions: {compressedDimensions.width} x{" "}
                    {compressedDimensions.height}
                  </p>
                  <p>Size: {Math.round(compressedSize / 1024)} KB</p>
                </div>
              )}
              <button className="bg-blue-600 text-sm my-2 px-4 py-2 text-white rounded-full">
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageCompressor;
