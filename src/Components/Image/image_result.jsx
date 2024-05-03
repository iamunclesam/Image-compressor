/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import getImageDetails from "../../helpers/fetchImageDetails";
// import {getOriginalImageInfo, getCompressedImageInfo }from "../../helpers/getImageInfo";


const ImageUpload = () => {
  const [imageDetails, setImageDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(true);
  const [showImage, setShowImage] = useState(false);
  // const [originalDimensions, setOriginalDimensions] = useState(null);
  // const [originalSize, setOriginalSize] = useState(null);
  // const [compressedDimensions, setCompressedDimensions] = useState(null);
  // const [compressedSize, setCompressedSize] = useState(null);
  useEffect(() => {
    // Fetch products from local storage
    const savedImages = getImageDetails();
    setImageDetails(savedImages);
    console.log("Images:", savedImages);
  }, []);

  useEffect(() => {
    const countdownTimeout = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        setShowCountdown(false);
        setShowImage(true);
      }
    }, 1000); // Countdown every second

    return () => clearTimeout(countdownTimeout);
  }, [countdown]);

  useEffect(() => {
    if (showImage) {
      const fadeInTimeout = setTimeout(() => {
        // Optionally, you can perform fadeIn animation here
      }, 1500); // Adjust this timing to control the fade-in speed

      return () => clearTimeout(fadeInTimeout);
    }
  }, [showImage]);



  return (
    <>
      <div className="grid md:grid-cols-2 items-center mx-auto md:mt-0 md:pt-10 p-3">
        {imageDetails && (
          <>
            <div className="text-center mt-4 md:border-r border-gray-200">
              <h2 className="text-3xl text-gray-700 font-bold">
                Original Image
              </h2>
              <img
                src={imageDetails.originalImage}
                alt="Original"
                className="md:w-96  h-64 object-cover w-full my-2 shadow-lg rounded-xl mx-auto"
              />
              {imageDetails.originalDimensions && (
                <div className="my-4">
                  <p>
                    Dimensions: {imageDetails.originalDimensions.width} x{" "}
                    {imageDetails.originalDimensions.height}
                  </p>
                  <p>Size: {Math.round(imageDetails.originalSize / 1024)} KB</p>
                </div>
              )}
              <button className="bg-blue-600 text-sm px-4 py-2 my-2 text-white rounded-full">
                Download
              </button>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-3xl text-gray-700 font-bold">
                Compressed Image
              </h2>

           <div className="md:w-96 md:h-96 object-cover flex justify-center items-center mx-auto">
           {showCountdown && <div className="countdown text-8xl text-gray-700 font-extrabold">{countdown}</div>}
              {showImage && (
                <img
                  src={imageDetails.compressedImage}
                  alt="Compressed"
                  className={`md:w-96 h-64 object-cover w-full my-2 shadow-lg rounded-xl mx-auto ${
                    showImage ? "fade-in" : ""
                  }`}
                />
              )}
           </div>

               {imageDetails.compressedDimensions && (
                <div className="my-4">
                  <p>
                    Dimensions: {imageDetails.compressedDimensions.width} x{" "}
                    {imageDetails.compressedDimensions.height}
                  </p>
                  <p>Size: {Math.round(imageDetails.compressedSize / 1024)} KB</p>
                </div>
              )} 
              <button className="bg-blue-600 text-sm my-2 px-4 py-2 text-white rounded-full">
                Download
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
