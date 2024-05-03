const getOriginalImageInfo = (file, callbackSize, callbackDimensions) => {
  const reader = new FileReader();

  reader.onload = function () {
    const image = new Image();
    image.src = reader.result;

    image.onload = function () {
      const dimensions = {
        width: this.width,
        height: this.height,
      };

      const size = file.size;

      // Invoke the callback functions with the obtained size and dimensions
      callbackSize(size);
      callbackDimensions(dimensions);
    };
  };

  reader.readAsDataURL(file);

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
  };
};


const getCompressedImageInfo = (file, callbackSize, callbackDimensions) => {
  const reader = new FileReader();

  reader.onload = function () {
    const image = new Image();
    image.src = reader.result;

    image.onload = function () {
      const dimensions = {
        width: this.width,
        height: this.height,
      };

      const size = file.size;

      // Invoke the callback functions with the obtained size and dimensions
      callbackSize(size);
      callbackDimensions(dimensions);
    };
  };

  reader.readAsDataURL(file);

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
  };
};


export { getOriginalImageInfo, getCompressedImageInfo };
