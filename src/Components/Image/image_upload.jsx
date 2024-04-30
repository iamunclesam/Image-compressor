/* eslint-disable react/prop-types */

const ImageUpload = ({
  originalImage,
  originalDimensions,
  compressedDimensions,
  compressedImage,
  originalSize,
  compressedSize,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 items-center mx-auto md:mt-16">
        {originalImage && (
          <div className="text-center mt-4">
            <h2 className="text-3xl text-gray-700 font-bold">Original Image</h2>
            <img
              src={originalImage}
              alt="Original"
              className="md:w-64 w-full my-2 shadow-lg rounded-xl mx-auto"
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
          <div className="mt-4 text-center">
            <h2 className="text-3xl text-gray-700 font-bold">
              Compressed Image
            </h2>
            <img
              src={compressedImage}
              alt="Compressed"
              className="md:w-64 w-full my-2 shadow-lg rounded-xl mx-auto"
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
    </>
  );
};

export default ImageUpload;
