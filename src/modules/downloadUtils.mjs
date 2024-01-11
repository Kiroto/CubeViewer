export const downloadAndConvertToBase64 = async (url) => {
    try {
      // Step 1: Download the image using fetch
      const response = await fetch(url);
      const blob = await response.blob();
  
      // Step 2: Read the contents of the image as base64
      const base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
  
      // Step 3: Use the base64 representation of the image
      return base64String
      // You can now use the base64String as needed, for example, display it in an <img> tag.
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  