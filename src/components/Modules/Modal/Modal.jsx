import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ largeImageURL, onModalClose }) => {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    },
    [onModalClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={css.overlay} onClick={onOverlayClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
