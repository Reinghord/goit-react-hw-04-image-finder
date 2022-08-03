import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ photo, onCloseModal }) {
  const modalRef = useRef();

  //Adding focus on Overlay div when element mounts
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  //Function to close modal on clicking Overlay or pressing Escape
  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }

    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  return (
    <div
      className={s.Overlay}
      onClick={handleClose}
      onKeyDown={handleClose}
      ref={modalRef}
      tabIndex="-1"
    >
      <div className={s.Modal}>
        <img src={photo.largeImageURL} alt={photo.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
