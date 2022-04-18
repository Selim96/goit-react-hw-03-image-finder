export default function ImageGalleryItem({id, webImage, tags,}) {
    return (
        <li key={id} class="gallery-item">
            <img src={webImage} alt={tags} width={250} />
        </li>
    )
}