import styles from "../styles/deleteModal.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { alertInfo } from "../utilities/Alerts";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, idOperation }) => {
  const { setUpload } = useContext(UserContext);

  const handleDelete = async () => {
    const URI = `https://alkemyapp.herokuapp.com/operations/remove/${idOperation}`;
    await axios.delete(URI);
    setUpload(true);
    setShowDeleteModal(false);
    alertInfo("Operation has been successfully deleted");
  };

  return (
    <section
      className={
        showDeleteModal
          ? `${styles.section} ${styles["active"]}`
          : styles.section
      }
    >
      <div className={`${styles["popup-outer"]}`}>
        <div className={styles["popup-box"]}>
          <div className={styles["box-header"]}>
            <p>Delete</p>

            <FontAwesomeIcon
              icon={faRectangleXmark}
              className={styles.close}
              onClick={() => setShowDeleteModal(false)}
            />
          </div>

          <div className={styles["box-body"]}>
            <div className="text">
              <p>Are you sure you want to delete this item?</p>
            </div>
          </div>
          <div className={styles.button}>
            <button
              id="close"
              className={styles.cancel}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button className={styles.send} onClick={handleDelete}>
              Send
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DeleteModal;
