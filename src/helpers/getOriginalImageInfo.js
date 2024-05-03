const getCompressedImageInfo = (file, callback) => {
  if (!(file instanceof Blob)) {
    console.error("Error: Input is not a Blob object.");
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function () {
    const image = new Image();
    image.src = reader.result;
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
};

export default getCompressedImageInfo;
