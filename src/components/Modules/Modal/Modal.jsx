import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ largeImageURL, onModalClose }) => {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 27) {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []); // Empty dependency array to mimic componentDidMount and componentWillUnmount

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
