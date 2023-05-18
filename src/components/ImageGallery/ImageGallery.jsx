import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

function ImageGallery({ children }) {
  return <Gallery>{children}</Gallery>;
}

ImageGallery.propTypes = { children: PropTypes.element.isRequired };

export default ImageGallery;
