

function getImageDetails() {
    try {
        const savedImage = localStorage.getItem('imageState');
        if (savedImage) {
            console.log(savedImage);
          return JSON.parse(savedImage);
        } else {
          return []; // Return an empty array if no products are found in local storage
        }
      } catch (error) {
        console.error('Error fetching images from local storage:', error);
        return []; // Return an empty array in case of any errors
      }
  }
  
  export default getImageDetails