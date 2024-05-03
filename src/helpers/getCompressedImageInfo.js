const getCompressedImageInfo = (file, callback) => {
  const reader = new FileReader();
  const image = new Image();
  reader.onload = function () {
    image.src = URL.createObjectURL(file);
    image.onload = function () {
      const details = {
        width: this.width,
        height: this.height,
      };
      callback(details);
    };
  };
  reader.readAsDataURL(file);
  reader.onerror = function(error) {
    console.error('Error reading file:', error);
  };
  image.onerror = function(error) {
    console.error('Error loading image:', error);
  };
};

export default getCompressedImageInfo;
