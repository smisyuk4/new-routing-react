import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export const Modal = ({ children, setIsShowModal }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    //navigate('..');

    setIsShowModal((prev) => !prev);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={handleCloseModal} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  setIsShowModal: PropTypes.func.isRequired,
};
