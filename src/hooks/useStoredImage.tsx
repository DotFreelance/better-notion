import { useState, useEffect } from "react";

// Models.
import StoredImage from "models/StoredImageModel";
import ImageTypes from "models/ImageTypes";

// Constants.
const acceptedImageTypes = [
  ImageTypes.gif,
  ImageTypes.jpeg,
  ImageTypes.png,
  ImageTypes.webp
];
const notSupportedImageTypes = [ImageTypes.heic];

export const useStoredImage = (): [StoredImage | null, Function] => {
  const [image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<StoredImage | null>(null);

  useEffect(() => {
    if (image) {
      const { name, size, type } = image;

      if (acceptedImageTypes.find(acceptedType => acceptedType === type)) {
        let storedImage: StoredImage = {
          base64: "",
          name,
          size,
          type
        };

        const filereader = new FileReader();

        filereader.readAsDataURL(image);
        filereader.onload = () => {
          if (typeof filereader.result === "string") {
            storedImage.base64 = filereader.result;
            setImageData(storedImage);
          } else {
            console.log("FileReader returned incorrect type (not a string).");
          }
        };
      } else if (
        notSupportedImageTypes.find(
          notSupportedType => notSupportedType === type
        )
      ) {
        console.log(`Unsupported Image type.`);
      } else {
        console.log(`Unsupported type.`);
      }
    }
  }, [image]);

  return [imageData, setImage];
};
