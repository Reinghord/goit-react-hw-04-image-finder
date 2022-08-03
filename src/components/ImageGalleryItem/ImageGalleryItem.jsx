import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ photos, onHandleClick }) {
  //Lifting state up
  const handleClick = e => {
    onHandleClick(e.target.alt);
  };

  return photos.map(photo => {
    return (
      <li key={photo.id} className={s.ImageGalleryItem} onClick={handleClick}>
        <img
          src={photo.webformatURL}
          alt={photo.tags}
          className={s.ImageGalleryItemImage}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.array.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
