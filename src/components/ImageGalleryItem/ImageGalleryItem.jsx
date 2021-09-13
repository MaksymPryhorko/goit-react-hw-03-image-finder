import s from "./ImageGalleryItem.module.css";
export default function ImageGalleryItem({ smallImage, onClickImage }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClickImage}>
      <img
        src={smallImage}
        alt="Изображение не найдено."
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
}
