import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ images, onClickImage }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          smallImage={image.webformatURL}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
}
