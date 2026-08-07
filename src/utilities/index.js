// export const shortImageName = (imageName, length = 10) => {
//   if (!imageName || typeof imageName !== "string") {
//     return "Choose Image";
//   }

//   if (imageName.length <= 15) {
//     return imageName;
//   }

//   const extension = imageName.split(".").pop();

//   return `${imageName.substring(0, length)}....${extension}`;
// };


export const shortImageName = (image,length = 10) => {
  if(!image || typeof image != "string") {
    return "Choose Image";
  }
  if(image.length <= 15){
    return image;
  }

  const extension = image.split(".").pop();

  return `${image.substring(0,length)}...${extension}`;
}

//conditions 
//1. if the image exists or not check and the type is string or not

//2. check the length
//3. the main task of the function