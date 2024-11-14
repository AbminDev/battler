// utils/preloadImages.js
export const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  export const preloadImages = (srcArray: any[]) => {
    // console.log('imagePaths' , srcArray)
    return Promise.all(srcArray.map(src => preloadImage(src)));
  };
