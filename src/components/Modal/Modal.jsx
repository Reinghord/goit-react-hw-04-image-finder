import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

function Modal({ photo, onCloseModal }) {
  const modalRef = useRef();

  //Adding focus on Overlay div when element mounts
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  //Function to close modal on clicking Overlay or pressing Escape
  const handleClose = e => {
    if (
      (e.currentTarget === e.target && e.type === 'click') ||
      e.code === 'Escape'
    ) {
      onCloseModal();
    }
  };

  return (
    <Overlay
      onClick={handleClose}
      onKeyDown={handleClose}
      ref={modalRef}
      tabIndex="-1"
    >
      <ModalWindow>
        <img src={photo.largeImageURL} alt={photo.tags} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
