/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import getImageDetails from "../../helpers/fetchImageDetails";
// import getOriginalImageInfo from "../../helpers/getOriginalImageInfo";
// import getCompressedImageInfo from "../../helpers/getCompressedImageInfo";

const ImageUpload = () => {
  const [imageDetails, setImageDetails] = useState(null);
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

  return (
    <>
      <div className="grid md:grid-cols-2 items-center mx-auto md:mt-16 p-3">
        {imageDetails && (
          <>
            <div className="text-center mt-4">
              <h2 className="text-3xl text-gray-700 font-bold">
                Original Image
              </h2>
              <img
                src={imageDetails.originalImage}
                alt="Original"
                className="md:w-64 w-full my-2 shadow-lg rounded-xl mx-auto"
              />
              {/* {imageDetails.originalDimensions && (
                <div>
                  <p>
                    Dimensions: {originalDimensions.width} x{" "}
                    {originalDimensions.height}
                  </p>
                  <p>Size: {Math.round(originalSize / 1024)} KB</p>
                </div>
              )} */}
              <button className="bg-blue-600 text-sm px-4 py-2 my-2 text-white rounded-full">
                Download
              </button>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-3xl text-gray-700 font-bold">
                Compressed Image
              </h2>

              <img
                src={imageDetails.compressedImage}
                alt="Compressed"
                className="md:w-64 w-full my-2 shadow-lg rounded-xl mx-auto"
              />

              {/* {imageDetails.compressedDimensions && (
                <div>
                  <p>
                    Dimensions: {compressedDimensions.width} x{" "}
                    {compressedDimensions.height}
                  </p>
                  <p>Size: {Math.round(compressedSize / 1024)} KB</p>
                </div>
              )} */}
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
