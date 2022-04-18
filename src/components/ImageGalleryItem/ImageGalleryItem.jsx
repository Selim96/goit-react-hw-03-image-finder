import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webImage, largeImage, tags, onClick, }) {
    return (
        <li className={s.ImageGalleryItem} onClick={() => onClick(largeImage)}>
            <img className={s.ImageGalleryItemImage} src={webImage} alt={tags} width={250} />
        </li>
    )
}