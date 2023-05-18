import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ photos, onHandleClick }) {
  //Lifting state up
  const handleClick = e => {
    onHandleClick(e.target.alt);
  };

  return photos.map(photo => {
    return (
      <Item key={photo.id} onClick={handleClick}>
        <Image src={photo.webformatURL} alt={photo.tags} />
      </Item>
    );
  });
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.array.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
